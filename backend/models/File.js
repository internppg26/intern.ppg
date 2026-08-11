module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER, // bytes
    },
    mimeType: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.STRING,
    },
    uploaderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    category: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'files',
    timestamps: true,
  });

  return File;
};