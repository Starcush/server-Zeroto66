'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const habits = sequelize.define(
    'habits',
    {
      habitName: DataTypes.STRING,
      startDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        get: function () {
          return moment
            .utc(this.getDataValue('startDate'))
            .format('YYYY-MM-DD');
        },
      },
      deletedDate: DataTypes.DATEONLY,
      frequency: {
        type: DataTypes.STRING,
        defaultValue: '1111111',
        allowNull: false,
      },
      unit: {
        type: DataTypes.ENUM('check', 'count', 'minute'),
        allowNull: false,
      },
      goal: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  // for foreignkey
  habits.associate = function (models) {
    habits.belongsTo(models.user, {
      foreignKey: 'userId',
    });
  };
  return habits;
};
