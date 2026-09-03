const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for frontend integration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'LMS Backend API', version: '1.0.0' });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Auth routes
console.log('[DEBUG] Loading auth router');
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// Program routes
console.log('[DEBUG] Loading program router');
const programRouter = require('./routes/program');
app.use('/api/programs', programRouter);

// Module routes
const moduleRouter = require('./routes/module');
app.use('/api/modules', moduleRouter);

// Enrollment routes
const enrollmentRouter = require('./routes/enrollment');
app.use('/api/enrollments', enrollmentRouter);

// Article routes
const articleRouter = require('./routes/article');
app.use('/api/articles', articleRouter);

// Gallery routes
const galleryRouter = require('./routes/gallery');
app.use('/api/galleries', galleryRouter);

// File routes
const fileRouter = require('./routes/file');
app.use('/api/files', fileRouter);

// Exam routes
const examRouter = require('./routes/exam');
app.use('/api/exams', examRouter);

// Certificate routes
const certificateRouter = require('./routes/certificate');
app.use('/api/certificates', certificateRouter);

// Schedule routes
const scheduleRouter = require('./routes/schedule');
app.use('/api/schedules', scheduleRouter);

// Sync database and start server
async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected.');
    
    // Always sync in dev for now
    await db.sequelize.sync({ alter: false }).catch(err => {
      console.error('Database sync error:', err);
    });
    console.log('Database synced (no alter).');
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    // Keep server reference
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Prevent default exit behavior
    });
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      // Do not exit - log only
    });
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
}

start().catch(err => console.error('Start failed:', err));