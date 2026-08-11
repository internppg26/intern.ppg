module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
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
    examId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    certificateNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    issuedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fileUrl: {
      type: DataTypes.STRING,
    },
    expirationDate: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'certificates',
    timestamps: true,
  });

  return Certificate;
};