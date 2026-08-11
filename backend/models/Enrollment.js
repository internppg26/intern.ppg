module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    programId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'programs',
        key: 'id',
      },
    },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completedAt: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('active', 'dropped', 'completed'),
      defaultValue: 'active',
    },
    feedback: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'enrollments',
    timestamps: true,
  });

  return Enrollment;
};