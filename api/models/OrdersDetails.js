var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let OrdersDetails = sequelize.define('OrdersDetails', {
    orderDetailID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Orders',
            key: 'orderID'
        }
    },
    productID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Products',
            key: 'productID'
        }
    },
    unitPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = OrdersDetails;