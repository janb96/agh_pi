var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Orders = sequelize.define('Orders', {
    orderID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    employeeID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    tableID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dateOfCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    isPaid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    orderStatus: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Orders;