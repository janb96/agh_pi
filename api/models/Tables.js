var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Tables = sequelize.define('Tables', {
    tableID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tableName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tableStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Tables;