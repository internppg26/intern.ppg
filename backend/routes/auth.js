const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    if (!name || !email || !password || !username) {
      return res.status(400).json({ error: 'Missing required fields (name, username, email, password)' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
      name,
      username,
      email,
      password: hashed,
      role: role || 'student',
    });
    const token = generateToken(user);
    res.status(201).json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // 'email' field here can be email or username
    if (!email || !password) {
      return res.status(400).json({ error: 'Email/Username and password required' });
    }
    const { Op } = require('sequelize');
    const user = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email: email },
          { username: email }
        ]
      } 
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken(user);
    res.json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user.toJSON() });
});

router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, phone, avatar, instansi } = req.body;
    const user = req.user;
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (instansi !== undefined) user.instansi = instansi;
    if (avatar !== undefined) user.avatar = avatar;
    await user.save();
    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

router.put('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both passwords required' });
    }
    const valid = await comparePassword(currentPassword, req.user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Current password incorrect' });
    }
    req.user.password = await hashPassword(newPassword);
    await req.user.save();
    res.json({ message: 'Password updated' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Password change failed' });
  }
});

// Google Login endpoint
router.post('/google', async (req, res) => {
  try {
    const { idToken, username } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'Google ID token required' });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const { email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ where: { email } });

    if (user) {
      // If user exists but doesn't have a username yet
      if (!user.username) {
        if (!username) {
          // Tell frontend to prompt for username
          return res.status(200).json({ requireUsername: true, email, name, picture });
        } else {
          // Check if username is taken
          const existingUsername = await User.findOne({ where: { username } });
          if (existingUsername && existingUsername.id !== user.id) {
            return res.status(409).json({ error: 'Username already taken' });
          }
          user.username = username;
          await user.save();
        }
      }
    } else {
      // Create new user from Google account
      if (!username) {
        return res.status(200).json({ requireUsername: true, email, name, picture });
      }
      
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(409).json({ error: 'Username already taken' });
      }

      const randomPassword = require('crypto').randomBytes(32).toString('hex');
      const hashedPassword = await hashPassword(randomPassword);
      user = await User.create({
        name: name || email.split('@')[0],
        username,
        email,
        password: hashedPassword,
        role: 'student',
        avatar: picture || null,
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);
    res.json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed' });
  }
});

router.delete('/me', authenticate, async (req, res) => {
  try {
    await req.user.destroy();
    res.json({ message: 'Account deleted' });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({ error: 'Deletion failed' });
  }
});

module.exports = router;