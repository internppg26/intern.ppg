const express = require('express');
const { Exam, Module, User, Certificate } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get exams (authenticated)
router.get('/', authenticate, async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'student') where.studentId = req.user.id;
    const exams = await Exam.findAll({
      where,
      include: [
        { model: Module, attributes: ['id', 'title'] },
        { model: User, as: 'student', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(exams);
  } catch (error) {
    console.error('Fetch exams error:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

// Get single exam (owner or instructor/admin)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id, {
      include: [
        { model: Module, attributes: ['id', 'title'] },
        { model: User, as: 'student', attributes: ['id', 'name', 'email'] },
        { model: Certificate }
      ]
    });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    if (exam.studentId !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'instructor') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    res.json(exam);
  } catch (error) {
    console.error('Fetch exam error:', error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

// Create exam (student)
router.post('/', authenticate, authorize('student'), async (req, res) => {
  try {
    const { moduleId, score, passed, answers } = req.body;
    if (!moduleId || score === undefined) {
      return res.status(400).json({ error: 'moduleId and score required' });
    }
    const exam = await Exam.create({
      moduleId,
      studentId: req.user.id,
      score,
      passed: passed !== undefined ? passed : score >= 70,
      answers,
      takenAt: new Date()
    });
    res.status(201).json(exam);
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// Update exam (admin/instructor)
router.put('/:id', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    const { score, passed, feedback } = req.body;
    await exam.update({ score, passed, feedback });
    res.json(exam);
  } catch (error) {
    console.error('Update exam error:', error);
    res.status(500).json({ error: 'Failed to update exam' });
  }
});

// Delete exam (admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    await exam.destroy();
    res.json({ message: 'Exam deleted' });
  } catch (error) {
    console.error('Delete exam error:', error);
    res.status(500).json({ error: 'Failed to delete exam' });
  }
});

module.exports = router;