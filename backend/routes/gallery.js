const express = require('express');
const { Gallery, User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get all gallery images (public)
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.findAll({
      include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(galleries);
  } catch (error) {
    console.error('Fetch galleries error:', error);
    res.status(500).json({ error: 'Failed to fetch galleries' });
  }
});

// Upload gallery image (admin/instructor)
router.post('/', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const { title, description, imageUrl, tags } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ error: 'Title and imageUrl required' });
    }
    const gallery = await Gallery.create({
      title,
      description,
      imageUrl,
      tags,
      uploaderId: req.user.id
    });
    res.status(201).json(gallery);
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({ error: 'Failed to create gallery' });
  }
});

// Delete gallery (owner or admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }
    if (gallery.uploaderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await gallery.destroy();
    res.json({ message: 'Gallery deleted' });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ error: 'Failed to delete gallery' });
  }
});

module.exports = router;