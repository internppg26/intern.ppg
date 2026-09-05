const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

async function migrate() {
  // SQLite connection
  const sqlite = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });

  // PG connection
  const pg = new Sequelize('postgres', 'postgres.otqxepsbmfixnliytxob', 'internPPG_2026', {
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const modelsList = ['User', 'Program', 'Module', 'Enrollment', 'Article', 'Gallery', 'File', 'Exam', 'Certificate', 'Schedule'];
  const sqliteModels = {};
  const pgModels = {};

  for (const m of modelsList) {
    const modelDef = require('./models/' + m);
    sqliteModels[m] = modelDef(sqlite, DataTypes);
    pgModels[m] = modelDef(pg, DataTypes);
  }

  // PG Associations
  pgModels.User.hasMany(pgModels.Enrollment, { foreignKey: 'studentId' });
  pgModels.Enrollment.belongsTo(pgModels.User, { foreignKey: 'studentId', as: 'student' });
  pgModels.Program.hasMany(pgModels.Enrollment, { foreignKey: 'programId' });
  pgModels.Enrollment.belongsTo(pgModels.Program, { foreignKey: 'programId' });
  pgModels.Program.hasMany(pgModels.Module, { foreignKey: 'programId' });
  pgModels.Module.belongsTo(pgModels.Program, { foreignKey: 'programId' });
  pgModels.Program.belongsTo(pgModels.User, { foreignKey: 'instructorId', as: 'instructor' });
  pgModels.User.hasMany(pgModels.Program, { foreignKey: 'instructorId' });
  pgModels.User.hasMany(pgModels.Module, { foreignKey: 'instructorId' });
  pgModels.Module.belongsTo(pgModels.User, { foreignKey: 'instructorId', as: 'instructor' });
  pgModels.Module.hasMany(pgModels.Exam, { foreignKey: 'moduleId' });
  pgModels.Exam.belongsTo(pgModels.Module, { foreignKey: 'moduleId' });
  pgModels.User.hasMany(pgModels.Exam, { foreignKey: 'studentId' });
  pgModels.Exam.belongsTo(pgModels.User, { foreignKey: 'studentId', as: 'student' });
  pgModels.User.hasMany(pgModels.Certificate, { foreignKey: 'studentId' });
  pgModels.Certificate.belongsTo(pgModels.User, { foreignKey: 'studentId', as: 'student' });
  pgModels.Exam.hasOne(pgModels.Certificate, { foreignKey: 'examId' });
  pgModels.Certificate.belongsTo(pgModels.Exam, { foreignKey: 'examId' });
  pgModels.User.hasMany(pgModels.Article, { foreignKey: 'authorId' });
  pgModels.Article.belongsTo(pgModels.User, { foreignKey: 'authorId', as: 'author' });
  pgModels.User.hasMany(pgModels.Gallery, { foreignKey: 'uploaderId' });
  pgModels.Gallery.belongsTo(pgModels.User, { foreignKey: 'uploaderId', as: 'uploader' });
  pgModels.User.hasMany(pgModels.File, { foreignKey: 'uploaderId' });
  pgModels.File.belongsTo(pgModels.User, { foreignKey: 'uploaderId', as: 'uploader' });
  pgModels.User.hasMany(pgModels.Schedule, { foreignKey: 'instructorId' });
  pgModels.Schedule.belongsTo(pgModels.User, { foreignKey: 'instructorId', as: 'instructor' });
  pgModels.User.belongsToMany(pgModels.Schedule, { through: 'ScheduleParticipants', foreignKey: 'userId', as: 'schedules' });
  pgModels.Schedule.belongsToMany(pgModels.User, { through: 'ScheduleParticipants', foreignKey: 'scheduleId', as: 'participants' });

  try {
    await pg.authenticate();
    console.log('PG connected');
    
    // Disable constraints during migration
    await pg.query('SET session_replication_role = replica;');

    console.log('Syncing PG models...');
    await pg.sync({ force: true });
    console.log('PG models synced!');

    // Copy data sequentially to avoid foreign key issues (even though replica role is on)
    for (const m of modelsList) {
      console.log(`Migrating ${m}...`);
      const rows = await sqliteModels[m].findAll({ raw: true });
      if (rows.length > 0) {
        // In SQLite, boolean might be 0/1. Sequelize should handle it but let's be careful.
        await pgModels[m].bulkCreate(rows);
        console.log(`Migrated ${rows.length} rows for ${m}`);
      } else {
        console.log(`No rows for ${m}`);
      }
    }
    
    // Need to copy through table ScheduleParticipants manually
    console.log('Migrating ScheduleParticipants...');
    const spRows = await sqlite.query('SELECT * FROM ScheduleParticipants', { type: Sequelize.QueryTypes.SELECT });
    if (spRows.length > 0) {
      await pg.query(`
        INSERT INTO "ScheduleParticipants" ("createdAt", "updatedAt", "userId", "scheduleId")
        VALUES ${spRows.map(r => `('${r.createdAt}', '${r.updatedAt}', ${r.userId}, ${r.scheduleId})`).join(', ')}
      `);
      console.log(`Migrated ${spRows.length} rows for ScheduleParticipants`);
    }

    // Restore constraints
    await pg.query('SET session_replication_role = DEFAULT;');
    
    // Fix Postgres sequences for auto-increment PKs
    for (const m of modelsList) {
      const tableName = pgModels[m].tableName;
      const primaryKey = pgModels[m].primaryKeyAttribute;
      
      if (primaryKey) {
        try {
          const max = await pgModels[m].max(primaryKey);
          if (max) {
             await pg.query(`SELECT setval('"${tableName}_${primaryKey}_seq"', ${max + 1}, false)`);
             console.log(`Reset sequence for ${tableName}`);
          }
        } catch(e) {
          // ignore if no sequence
        }
      }
    }

    console.log('Migration complete!');
  } catch(e) {
    console.error('Migration failed:', e);
  } finally {
    await sqlite.close();
    await pg.close();
  }
}

migrate();
