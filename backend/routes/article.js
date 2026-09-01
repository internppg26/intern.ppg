const express = require('express');
const { Article, User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get all articles (public)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    console.error('Fetch articles error:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get single article (public)
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Fetch article error:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Create article (author/admin)
router.post('/', authenticate, authorize('admin', 'instructor', 'public'), async (req, res) => {
  try {
    const { title, content, thumbnail } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }
    const article = await Article.create({
      title,
      content,
      thumbnail,
      authorId: req.user.id
    });
    res.status(201).json(article);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update article (owner or admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    if (article.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { title, content, thumbnail } = req.body;
    await article.update({ title, content, thumbnail });
    res.json(article);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article (owner or admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    if (article.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await article.destroy();
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;