const express = require('express');
const { Schedule } = require('../models');

const router = express.Router();

// Get all schedules (public - no auth required)
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.json(schedules);
  } catch (error) {
    console.error('Fetch schedules error:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Get single schedule (public)
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    console.error('Fetch schedule error:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Create schedule
router.post('/', async (req, res) => {
  try {
    const { title, desc, tag, link, date, time, location } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const schedule = await Schedule.create({
      title, desc, tag, link, date, time, location
    });
    res.status(201).json(schedule);
  } catch (error) {
    console.error('Create schedule error:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// Update schedule
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    const { title, desc, tag, link, date, time, location } = req.body;
    await schedule.update({ title, desc, tag, link, date, time, location });
    res.json(schedule);
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

// Delete schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    await schedule.destroy();
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

module.exports = router;
