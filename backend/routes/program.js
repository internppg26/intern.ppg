const express = require('express');
const { Program, Module, Enrollment, User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get all programs (public/admin)
router.get('/', async (req, res) => {
  try {
    const whereClause = req.query.all === 'true' ? {} : { isPublished: true };
    const programs = await Program.findAll({
      where: whereClause,
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

// Create program (admin)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    let { title, description, category, duration, price, thumbnail } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title required' });
    }
    
    if (description) {
      try {
        JSON.parse(description);
      } catch(e) {
        description = JSON.stringify({ shortDesc: description });
      }
    }

    const program = await Program.create({
      title,
      description,
      category,
      duration,
      price,
      thumbnail,
      instructorId: null, // Admin creates vacant course
      isPublished: false  // Starts unpublished
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
    if (program.instructorId !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    let { title, description, category, duration, price, thumbnail, isPublished } = req.body;
    
    // Smart merge for description to prevent Admin from overwriting Coach's JSON
    if (description) {
      let isNewDescJson = false;
      try {
        JSON.parse(description);
        isNewDescJson = true; // Coach is sending full JSON
      } catch(e) {}

      if (!isNewDescJson) {
        // Admin is sending a plain string, merge it into existing JSON if present
        let existingDesc = {};
        try {
          if (program.description) existingDesc = JSON.parse(program.description);
        } catch(e) {}
        
        existingDesc.shortDesc = description;
        // Keep the coach's `about` as fallback if it exists
        description = JSON.stringify(existingDesc);
      }
    }

    await program.update({
      title,
      description,
      category,
      duration,
      price,
      thumbnail,
      isPublished: isPublished !== undefined ? isPublished : program.isPublished // Coach or admin can publish
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

// Claim program (instructor enrolls to teach)
router.post('/:id/claim', authenticate, authorize('instructor', 'coach'), async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    if (program.instructorId) {
      return res.status(400).json({ error: 'Program already has an instructor' });
    }
    await program.update({ instructorId: req.user.id });
    res.json({ message: 'Program claimed successfully', program });
  } catch (error) {
    console.error('Claim program error:', error);
    res.status(500).json({ error: 'Failed to claim program' });
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