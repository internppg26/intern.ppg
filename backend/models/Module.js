module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    programId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'programs',
        key: 'id',
      },
    },
    instructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    content: {
      type: DataTypes.TEXT,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    pdfUrl: {
      type: DataTypes.STRING,
    },
    estimatedMinutes: {
      type: DataTypes.INTEGER,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'modules',
    timestamps: true,
  });

  return Module;
};