var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Employees = sequelize.define('Employees', {
    employeeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employeeSurname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailHash: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfRegistration: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    permissionType: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Employees;