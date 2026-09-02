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

// Create article
router.post('/', async (req, res) => {
  try {
    const { title, content, thumbnail, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }
    const article = await Article.create({
      title,
      content,
      thumbnail,
      category,
      authorId: 1 // Default author ID since auth is temporarily removed
    });
    res.status(201).json(article);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update Top News (max 5)
router.put('/top-news', async (req, res) => {
  try {
    const { articleIds } = req.body;
    if (!Array.isArray(articleIds)) {
      return res.status(400).json({ error: 'articleIds must be an array' });
    }
    if (articleIds.length > 5) {
      return res.status(400).json({ error: 'Maximum 5 Top News allowed' });
    }
    
    // Reset all
    await Article.update({ isTopNews: false }, { where: {} });
    
    // Set new ones
    if (articleIds.length > 0) {
      await Article.update({ isTopNews: true }, { where: { id: articleIds } });
    }
    
    res.json({ message: 'Top News updated successfully' });
  } catch (error) {
    console.error('Update top news error:', error);
    res.status(500).json({ error: 'Failed to update top news' });
  }
});

// Update article
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const { title, content, thumbnail, category } = req.body;
    await article.update({ title, content, thumbnail, category });
    res.json(article);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    await article.destroy();
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;