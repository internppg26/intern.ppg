const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(config);

const User = require('./User')(sequelize, DataTypes);
const Program = require('./Program')(sequelize, DataTypes);
const Module = require('./Module')(sequelize, DataTypes);
const Enrollment = require('./Enrollment')(sequelize, DataTypes);
const Article = require('./Article')(sequelize, DataTypes);
const Gallery = require('./Gallery')(sequelize, DataTypes);
const File = require('./File')(sequelize, DataTypes);
const Exam = require('./Exam')(sequelize, DataTypes);
const Certificate = require('./Certificate')(sequelize, DataTypes);
const Schedule = require('./Schedule')(sequelize, DataTypes);

// Associations
User.hasMany(Enrollment, { foreignKey: 'studentId' });
Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Program.hasMany(Enrollment, { foreignKey: 'programId' });
Enrollment.belongsTo(Program, { foreignKey: 'programId' });

Program.hasMany(Module, { foreignKey: 'programId' });
Module.belongsTo(Program, { foreignKey: 'programId' });

Program.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });
User.hasMany(Program, { foreignKey: 'instructorId' });
User.hasMany(Module, { foreignKey: 'instructorId' });
Module.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

Module.hasMany(Exam, { foreignKey: 'moduleId' });
Exam.belongsTo(Module, { foreignKey: 'moduleId' });

User.hasMany(Exam, { foreignKey: 'studentId' });
Exam.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

User.hasMany(Certificate, { foreignKey: 'studentId' });
Certificate.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Exam.hasOne(Certificate, { foreignKey: 'examId' });
Certificate.belongsTo(Exam, { foreignKey: 'examId' });

User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Gallery, { foreignKey: 'uploaderId' });
Gallery.belongsTo(User, { foreignKey: 'uploaderId', as: 'uploader' });

User.hasMany(File, { foreignKey: 'uploaderId' });
File.belongsTo(User, { foreignKey: 'uploaderId', as: 'uploader' });

User.hasMany(Schedule, { foreignKey: 'instructorId' });
Schedule.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

User.belongsToMany(Schedule, { through: 'ScheduleParticipants', foreignKey: 'userId', as: 'schedules' });
Schedule.belongsToMany(User, { through: 'ScheduleParticipants', foreignKey: 'scheduleId', as: 'participants' });

const db = {
  sequelize,
  Sequelize,
  User,
  Program,
  Module,
  Enrollment,
  Article,
  Gallery,
  File,
  Exam,
  Certificate,
  Schedule,
};

module.exports = db;