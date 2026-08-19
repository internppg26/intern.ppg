const express = require('express');
const { Certificate, Exam, User, Module } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get certificates (authenticated)
router.get('/', authenticate, async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'student') where.studentId = req.user.id;
    const certificates = await Certificate.findAll({
      where,
      include: [
        { model: Exam, attributes: ['id', 'moduleId', 'score', 'takenAt'] },
        { model: User, as: 'student', attributes: ['id', 'name', 'email'] }
      ],
      order: [['issuedAt', 'DESC']]
    });
    res.json(certificates);
  } catch (error) {
    console.error('Fetch certificates error:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Get single certificate (owner or admin)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id, {
      include: [
        { model: Exam, include: [{ model: Module }] },
        { model: User, as: 'student' }
      ]
    });
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    if (certificate.studentId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    res.json(certificate);
  } catch (error) {
    console.error('Fetch certificate error:', error);
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
});

// Create certificate (admin/instructor)
router.post('/', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const { examId, certificateUrl, issuerName } = req.body;
    if (!examId || !certificateUrl) {
      return res.status(400).json({ error: 'examId and certificateUrl required' });
    }
    const exam = await Exam.findByPk(examId);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    const certificate = await Certificate.create({
      examId,
      studentId: exam.studentId,
      certificateUrl,
      issuerName: issuerName || 'LMS Academy',
      issuedAt: new Date()
    });
    res.status(201).json(certificate);
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
});

// Delete certificate (admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    await certificate.destroy();
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

module.exports = router;