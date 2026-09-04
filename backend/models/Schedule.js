module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    startTime: {
      type: DataTypes.STRING,
    },
    endTime: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    instructorId: {
      type: DataTypes.INTEGER,
    },
    participantId: {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'schedules',
    timestamps: true,
  });

  return Schedule;
};
