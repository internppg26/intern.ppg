const express = require('express');
const { Schedule, User, Program, Enrollment } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get all schedules (Public access)
router.get('/public', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      where: {
        type: ['Corporate', 'Government', 'Educational', 'Pub Training & In-House', 'Certification', 'Entrepreneurial']
      },
      order: [['date', 'ASC'], ['startTime', 'ASC']]
    });
    res.json(schedules);
  } catch (error) {
    console.error('Fetch public schedules error:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Get all schedules (filtered by role)
router.get('/', authenticate, async (req, res) => {
  try {
    let schedules = [];
    if (req.user.role === 'instructor') {
      schedules = await Schedule.findAll({
        where: { instructorId: req.user.id },
        include: [
          { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'participants', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
        ],
        order: [['date', 'ASC'], ['startTime', 'ASC']]
      });
    } else if (req.user.role === 'student') {
      const user = await User.findByPk(req.user.id, {
        include: [{
          model: Schedule,
          as: 'schedules',
          include: [
            { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
            { model: User, as: 'participants', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
          ]
        }]
      });
      schedules = user ? user.schedules : [];
      // sort
      schedules.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.startTime.localeCompare(b.startTime);
      });
    } else {
      // admin or other
      schedules = await Schedule.findAll({
        include: [
          { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'participants', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
        ],
        order: [['date', 'ASC'], ['startTime', 'ASC']]
      });
    }

    res.json(schedules);
  } catch (error) {
    console.error('Fetch schedules error:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Helper to resolve participants from 'by course' or direct ids
const resolveParticipantIds = async (participantIds, courseId) => {
  let finalIds = new Set();
  
  if (participantIds && Array.isArray(participantIds)) {
    participantIds.forEach(id => finalIds.add(id));
  }
  
  if (courseId) {
    const enrollments = await Enrollment.findAll({ where: { programId: courseId } });
    enrollments.forEach(e => finalIds.add(e.studentId));
  }
  
  return Array.from(finalIds);
};

// Create schedule (Instructor only)
router.post('/', authenticate, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { title, type, date, startTime, endTime, link, notes, participantIds, courseId } = req.body;
    if (!title || !date || !startTime) {
      return res.status(400).json({ error: 'Title, date, and startTime are required' });
    }
    
    let instructorId = req.user.id;
    if (req.user.role === 'admin' && req.body.instructorId) {
      instructorId = req.body.instructorId;
    }

    const schedule = await Schedule.create({
      title, type, date, startTime, endTime, link, notes, instructorId
    });
    
    const finalIds = await resolveParticipantIds(participantIds, courseId);
    if (finalIds.length > 0) {
      await schedule.setParticipants(finalIds);
    }
    
    const created = await Schedule.findByPk(schedule.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'participants', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
      ]
    });
    
    res.status(201).json(created);
  } catch (error) {
    console.error('Create schedule error:', error);
    res.status(500).json({ error: 'Failed to create schedule: ' + error.message });
  }
});

// Update schedule
router.put('/:id', authenticate, authorize('instructor', 'coach', 'admin'), async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    if ((req.user.role === 'instructor' || req.user.role === 'coach') && schedule.instructorId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own schedules' });
    }
    
    const { title, type, date, startTime, endTime, link, notes, participantIds, courseId } = req.body;
    await schedule.update({ title, type, date, startTime, endTime, link, notes });
    
    const finalIds = await resolveParticipantIds(participantIds, courseId);
    await schedule.setParticipants(finalIds);
    
    const updated = await Schedule.findByPk(schedule.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'participants', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
      ]
    });
    
    res.json(updated);
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ error: 'Failed to update schedule: ' + error.message });
  }
});

// Delete schedule
router.delete('/:id', authenticate, authorize('instructor', 'coach', 'admin'), async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    if ((req.user.role === 'instructor' || req.user.role === 'coach') && schedule.instructorId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own schedules' });
    }
    
    await schedule.destroy();
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ error: 'Failed to delete schedule: ' + error.message });
  }
});

module.exports = router;
