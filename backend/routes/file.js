const express = require('express');
const { File, User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get files (authenticated)
router.get('/', authenticate, async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'student') where.uploaderId = req.user.id;
    const files = await File.findAll({
      where,
      include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(files);
  } catch (error) {
    console.error('Fetch files error:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Upload file (admin/instructor)
router.post('/', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const { filename, filepath, size, mimeType, description } = req.body;
    if (!filename || !filepath) {
      return res.status(400).json({ error: 'Filename and filepath required' });
    }
    const file = await File.create({
      filename,
      filepath,
      size,
      mimeType,
      description,
      uploaderId: req.user.id
    });
    res.status(201).json(file);
  } catch (error) {
    console.error('Create file error:', error);
    res.status(500).json({ error: 'Failed to create file' });
  }
});

// Delete file (owner or admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    if (file.uploaderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await file.destroy();
    res.json({ message: 'File deleted' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

module.exports = router;