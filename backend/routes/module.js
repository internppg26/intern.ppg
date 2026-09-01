const express = require('express');
const { Module, Program, User, Exam } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get modules for a program (public)
router.get('/', async (req, res) => {
  try {
    const { programId } = req.query;
    const where = { isPublished: true };
    if (programId) where.programId = programId;
    const modules = await Module.findAll({
      where,
      include: [
        { model: Program, attributes: ['id', 'title'] },
        { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] }
      ],
      order: [['order', 'ASC']]
    });
    res.json(modules);
  } catch (error) {
    console.error('Fetch modules error:', error);
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
});

// Get single module (public)
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id, {
      include: [
        { model: Program, attributes: ['id', 'title'] },
        { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
        { model: Exam }
      ]
    });
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    console.error('Fetch module error:', error);
    res.status(500).json({ error: 'Failed to fetch module' });
  }
});

// Create module (instructor/admin)
router.post('/', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const { title, description, programId, order, content, videoUrl, pdfUrl, estimatedMinutes } = req.body;
    if (!title || !programId) {
      return res.status(400).json({ error: 'Title and programId required' });
    }
    const program = await Program.findByPk(programId);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    const module = await Module.create({
      title,
      description,
      programId,
      order,
      content,
      videoUrl,
      pdfUrl,
      estimatedMinutes,
      instructorId: req.user.id,
      isPublished: req.user.role === 'admin'
    });
    res.status(201).json(module);
  } catch (error) {
    console.error('Create module error:', error);
    res.status(500).json({ error: 'Failed to create module' });
  }
});

// Update module (owner or admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    if (module.instructorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { title, description, order, content, videoUrl, pdfUrl, estimatedMinutes, isPublished } = req.body;
    await module.update({
      title,
      description,
      order,
      content,
      videoUrl,
      pdfUrl,
      estimatedMinutes,
      isPublished: req.user.role === 'admin' ? isPublished : module.isPublished
    });
    res.json(module);
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({ error: 'Failed to update module' });
  }
});

// Delete module (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    await module.destroy();
    res.json({ message: 'Module deleted' });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({ error: 'Failed to delete module' });
  }
});

module.exports = router;