const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DomaineApprentissage = sequelize.define('DomaineApprentissage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  level: {
    type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
    allowNull: false,
    defaultValue: 'débutant'
  }
}, {
  tableName: 'domain_apprentissage',
  timestamps: true
});

module.exports = DomaineApprentissage;
