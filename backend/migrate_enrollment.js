const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: console.log
});

async function migrate() {
  try {
    const queryInterface = sequelize.getQueryInterface();
    
    // Add paymentStatus
    await queryInterface.addColumn('enrollments', 'paymentStatus', {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending',
    }).catch(err => console.log('Column paymentStatus may already exist or error:', err.message));
    
    // Add paymentProof
    await queryInterface.addColumn('enrollments', 'paymentProof', {
      type: DataTypes.STRING,
      allowNull: true,
    }).catch(err => console.log('Column paymentProof may already exist or error:', err.message));

    // Add takenAt to Exams
    await queryInterface.addColumn('exams', 'takenAt', {
      type: DataTypes.DATE,
      allowNull: true,
    }).catch(err => console.log('Column takenAt may already exist or error:', err.message));

    console.log("Migration completed!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sequelize.close();
  }
}

migrate();
