const express = require('express');
const { User } = require('../models');
const { authenticate, authorize } = require('../middlewares/auth');
const { hashPassword } = require('../utils/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json({ users });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create new user (Admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, username, email, password, role, status } = req.body;
    if (!name || !email || !password || !username) {
      return res.status(400).json({ error: 'Name, username, email, and password are required' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already taken' });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role ? role.toLowerCase() : 'student',
      isActive: status === 'Active' ? true : (status === 'Inactive' ? false : true)
    });
    
    res.status(201).json({ user: user.toJSON() });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user (Admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, password, role, status } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (name) {
      if (user.role === 'student' && name !== user.name) {
        return res.status(403).json({ error: 'Admin cannot change student name' });
      }
      user.name = name;
    }
    
    if (email && email !== user.email) {
      if (user.role === 'student') {
        return res.status(403).json({ error: 'Admin cannot change student email' });
      }
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: 'Email already in use by another account' });
      }
      user.email = email;
    }
    
    if (username && username !== user.username) {
      if (user.role === 'student') {
        return res.status(403).json({ error: 'Admin cannot change student username' });
      }
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(409).json({ error: 'Username already in use by another account' });
      }
      user.username = username;
    }
    
    if (role) user.role = role.toLowerCase();
    
    // Status in UI is 'Active', 'Inactive', 'Pending'. Backend maps to isActive boolean.
    if (status === 'Active') user.isActive = true;
    else if (status === 'Inactive' || status === 'Pending') user.isActive = false;
    
    if (password && password.trim().length > 0) {
      if (user.role === 'student') {
        return res.status(403).json({ error: 'Admin cannot change student passwords' });
      }
      user.password = await hashPassword(password);
    }
    
    await user.save();
    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
