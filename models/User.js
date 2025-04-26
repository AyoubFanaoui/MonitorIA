const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DomaineApprentissage = require('./DomaineApprentissage');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true
});

// Association : Un User a plusieurs DomainApprentissage
User.hasMany(DomaineApprentissage, { foreignKey: 'userId' });
// Un DomainApprentissage appartient à un User
DomaineApprentissage.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
