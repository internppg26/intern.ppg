const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('postgres', 'postgres.otqxepsbmfixnliytxob', 'internPPG_2026', {
  host: 'aws-0-ap-northeast-1.pooler.supabase.com',
  port: 6543,
  dialect: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false
});

const User = require('./backend/models/User')(sequelize, DataTypes);

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Connected to Postgres.');

    const hashedPassword = await bcrypt.hash('internppg2026', 10);
    const [admin, created] = await User.findOrCreate({
      where: { email: 'admin@gmail.com' },
      defaults: {
        username: 'admin',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'superadmin',
        emailVerified: true
      }
    });

    if (created) {
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists. Updating password and role just in case...');
      admin.password = hashedPassword;
      admin.role = 'superadmin';
      await admin.save();
      console.log('Admin user updated!');
    }
  } catch (err) {
    console.error('Error seeding admin:', err);
  } finally {
    await sequelize.close();
  }
}

seedAdmin();
