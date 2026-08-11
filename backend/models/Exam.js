module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'modules',
        key: 'id',
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    score: {
      type: DataTypes.FLOAT,
    },
    maxScore: {
      type: DataTypes.FLOAT,
      defaultValue: 100,
    },
    passed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    answers: {
      type: DataTypes.JSON,
    },
    submittedAt: {
      type: DataTypes.DATE,
    },
    timeSpent: {
      type: DataTypes.INTEGER, // seconds
    },
  }, {
    tableName: 'exams',
    timestamps: true,
  });

  return Exam;
};