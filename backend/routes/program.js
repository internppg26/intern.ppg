const express = require('express');
const { Program, Module, Enrollment, User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get all programs (public)
router.get('/', async (req, res) => {
  try {
    const programs = await Program.findAll({
      where: { isPublished: true },
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(programs);
  } catch (error) {
    console.error('Fetch programs error:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Get single program (public)
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'name', 'email'] },
        { model: Module, order: [['order', 'ASC']] }
      ]
    });
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    console.error('Fetch program error:', error);
    res.status(500).json({ error: 'Failed to fetch program' });
  }
});

// Create program (admin/instructor)
router.post('/', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const { title, description, category, duration, price, thumbnail } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title required' });
    }
    const program = await Program.create({
      title,
      description,
      category,
      duration,
      price,
      thumbnail,
      instructorId: req.user.id,
      isPublished: req.user.role === 'admin' // auto publish for admin
    });
    res.status(201).json(program);
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({ error: 'Failed to create program' });
  }
});

// Update program (owner or admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    if (program.instructorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { title, description, category, duration, price, thumbnail, isPublished } = req.body;
    await program.update({
      title,
      description,
      category,
      duration,
      price,
      thumbnail,
      isPublished: req.user.role === 'admin' ? isPublished : program.isPublished
    });
    res.json(program);
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({ error: 'Failed to update program' });
  }
});

// Delete program (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    await program.destroy();
    res.json({ message: 'Program deleted' });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({ error: 'Failed to delete program' });
  }
});

// Get modules of a program (public)
router.get('/:id/modules', async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { programId: req.params.id, isPublished: true },
      order: [['order', 'ASC']]
    });
    res.json(modules);
  } catch (error) {
    console.error('Fetch modules error:', error);
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
});

module.exports = router;