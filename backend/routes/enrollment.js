const express = require('express');
const { Enrollment, Program, User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get enrollments (student or admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'student') where.studentId = req.user.id;
    else if (req.user.role === 'instructor') {
      // instructor sees enrollments for their programs
      const programs = await Program.findAll({ where: { instructorId: req.user.id } });
      where.programId = programs.map(p => p.id);
    }
    const enrollments = await Enrollment.findAll({
      where,
      include: [
        { model: User, as: 'student', attributes: ['id', 'name', 'email'] },
        { model: Program, include: [{ model: User, as: 'instructor' }] }
      ],
      order: [['enrolledAt', 'DESC']]
    });
    res.json(enrollments);
  } catch (error) {
    console.error('Fetch enrollments error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Enroll in program (student)
router.post('/', authenticate, authorize('student'), async (req, res) => {
  try {
    const { programId, paymentProof } = req.body;
    if (!programId) {
      return res.status(400).json({ error: 'programId required' });
    }
    const program = await Program.findByPk(programId);
    if (!program || !program.isPublished) {
      return res.status(404).json({ error: 'Program not available' });
    }
    let enrollment = await Enrollment.findOne({ where: { studentId: req.user.id, programId } });
    
    if (enrollment) {
      if (enrollment.paymentStatus === 'verified') {
        return res.status(409).json({ error: 'Already enrolled and verified' });
      }
      // Update existing
      await enrollment.update({
        paymentStatus: 'pending',
        paymentProof: paymentProof || null
      });
    } else {
      enrollment = await Enrollment.create({
        studentId: req.user.id,
        programId,
        status: 'active',
        paymentStatus: 'pending',
        paymentProof: paymentProof || null
      });
    }
    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

// Update enrollment progress (student/instructor)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    const isOwner = enrollment.studentId === req.user.id;
    const isInstructor = req.user.role === 'instructor';
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isInstructor && !isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { progress, status, feedback, isCompleted, completedAt } = req.body;
    await enrollment.update({
      progress,
      status,
      feedback,
      isCompleted,
      completedAt: isCompleted ? (completedAt || new Date()) : null
    });
    res.json(enrollment);
  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({ error: 'Failed to update enrollment' });
  }
});

// Delete enrollment (admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    await enrollment.destroy();
    res.json({ message: 'Enrollment deleted' });
  } catch (error) {
    console.error('Delete enrollment error:', error);
    res.status(500).json({ error: 'Failed to delete enrollment' });
  }
});

// Verify payment (admin)
router.put('/:id/verify', authenticate, authorize('admin'), async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    const { action } = req.body; // 'verify' or 'reject'
    if (action === 'verify') {
      await enrollment.update({ paymentStatus: 'verified' });
    } else if (action === 'reject') {
      await enrollment.update({ paymentStatus: 'rejected' });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
    res.json(enrollment);
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

module.exports = router;