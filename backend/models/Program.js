module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
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
    category: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER, // in hours
    },
    instructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    thumbnail: {
      type: DataTypes.TEXT('long'),
    },
  }, {
    tableName: 'programs',
    timestamps: true,
  });

  return Program;
};