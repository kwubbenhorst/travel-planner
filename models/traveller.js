const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Traveller = sequelize.define('Traveller', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  });

  Traveller.associate = (models) => {
    Traveller.belongsToMany(models.Location, { through: 'Trip' });
  };

  return Traveller;
};
