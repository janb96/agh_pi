var express = require('express');
var router = express.Router();

//MODELS
let orders = require('../models/Orders');
let ordersDetails = require('../models/OrdersDetails');
let products = require('../models/Products');

//UTILS
let ResponseType1 = require('../utils/ResponseType1');
let EmployeePermission_t1 = require('../utils/EmployeePermission_t1');
let EmployeePermission_t3 = require('../utils/EmployeePermission_t3');

router.get('/', EmployeePermission_t1, function(req, res, next) {

    orders.findAll().then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.get('/orderDetails/byOrderID/:orderID', EmployeePermission_t3, function(req, res, next) {

    let orderID = req.params.orderID;

    ordersDetails.findAll({
        where: {
            orderID: orderID
        }
    }).then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.get('/byOrderID/:orderID', EmployeePermission_t3, function(req, res, next) {

    let orderID = req.params.orderID;

    orders.findAll({
        where: {
            orderID: orderID
        }
    }).then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.get('/byStatus/:orderStatus', EmployeePermission_t3, function(req, res, next) {

    let orderStatus = req.params.orderStatus;

    orders.findAll({
        where: {
            orderStatus: orderStatus
        }
    }).then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.post('/', async function(req, res, next) {

    const tableID = req.body.tableID;
    const isPaid = false;
    const orderStatus = "NEW";
    const orderDetails = req.body.orderDetails;

    if(!Number.isInteger(tableID)) {
        res.send(new ResponseType1(false, "The entered tableID is incorrect"));
        return;
    }

    let order = {
        tableID: tableID,
        isPaid: isPaid,
        orderStatus: orderStatus
    };

    let orderID = null;

    try {
        let dbOrder = await orders.create(order);
        orderID = dbOrder.dataValues.orderID;
    } catch(err) {
        res.status(200);
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }

    if(!Number.isInteger(orderID)) {
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }

    let orderPrice = 0;

    for(let detail of orderDetails) {
        let dbProduct = await products.findOne({
            where: {
                productID: detail.productID
            }
        });
        if(!dbProduct) {
            res.status(200);
            res.send(new ResponseType1(false, "No product with such productID in database"));
            return;
        }

        const orderDetail = {
            orderID: orderID,
            productID: detail.productID,
            unitPrice: dbProduct.dataValues.productPrice,
            quantity: detail.quantity
        };

        orderPrice += detail.quantity * dbProduct.dataValues.productPrice;

        try {
            await ordersDetails.create(orderDetail);
        } catch(err) {
            res.status(200);
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            return;
        }

    }

    order.orderPrice = orderPrice;

    try {
        await orders.update(order, {
                where: {
                    orderID: orderID
                }
            }
        );
    } catch(err) {
        res.status(200);
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }


    res.send(new ResponseType1(true, "CustomerOrder created"));

});

router.get('/byOrderStatus/:orderStatus', EmployeePermission_t3, function(req, res, next) {

    let orderStatus = req.params.orderStatus;

    orders.findAll({
        where: {
            orderStatus: orderStatus
        }
    }).then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.put('/changeStatus', function(req, res, next) {

    const orderID = req.body.orderID;
    const orderStatus = req.body.orderStatus;

    if(!Number.isInteger(orderID)) {
        res.send(new ResponseType1(false, "The entered orderID is incorrect"));
        return;
    }

    if(orderStatus === "NEW" || orderStatus === "READY" || orderStatus === "DELIVERED") {

        const order = {
            orderStatus: orderStatus
        };

        orders.update(order, {
                where: {
                    orderID: orderID
                }
            }
        ).then(
            result => {
                console.log(result);
                res.send(new ResponseType1(true, "Order status successfully changed"));
            }
        ).catch(
            err => {
                console.log(err);
                res.send(new ResponseType1(false, "Something gone wrong ;("));
            }
        );

    } else {
        res.send(new ResponseType1(false, "The entered orderStatus is incorrect"));
        return;
    }

});



module.exports = router;
