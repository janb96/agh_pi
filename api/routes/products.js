var express = require('express');
var router = express.Router();

//MODELS
let categories = require('../models/Categories');
let products = require('../models/Products');

//UTILS
let ResponseType1 = require('../utils/ResponseType1');
let EmployeePermission_t1 = require('../utils/EmployeePermission_t1');
let EmployeePermission_t3 = require('../utils/EmployeePermission_t3');

router.get('/', EmployeePermission_t3, function(req, res, next) {

    products.findAll().then(
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

router.post('/', EmployeePermission_t1, function(req, res, next) {

    const productName = req.body.productName;
    const categoryID = req.body.categoryID;
    const productDescription = req.body.productDescription;
    const productImageUrl = req.body.productImageUrl;
    const productPrice = req.body.productPrice;
    const isVisible = req.body.isVisible;
    const isRecommended = req.body.isRecommended;

    if(!productName || !categoryID ||
        !productDescription || !productImageUrl ||
        !productPrice
    ) {
        res.send(new ResponseType1(false, "The entered data is incorrect"));
        return;
    }

    const product = {
        productName: productName,
        productDescription: productDescription,
        productImageUrl: productImageUrl,
        isVisible: isVisible,
        isRecommended: isRecommended,
        categoryID: categoryID,
        productPrice: productPrice
    };

    categories.findOne({
        where: {
            categoryID: categoryID
        }
    }).then(
        result => {
            if(!result) {
                res.send(new ResponseType1(false, "Category with this categoryID does not exist"));
                return;
            }

            products.findOne({
                where: {
                    productName: productName
                }
            }).then(
                result => {
                    if(result) {
                        res.send(new ResponseType1(false, "Product with this name already exist"));
                        return;
                    }

                    products.create(product).then(
                        result => {
                            res.send(new ResponseType1(true, result));
                        }
                    ).catch(
                        err => {
                            res.send(new ResponseType1(false, "Something gone wrong ;("));
                            console.log(err);
                        }
                    );

                }
            ).catch(
                err => {
                    res.send(new ResponseType1(false, "Something gone wrong ;("));
                    console.log(err);
                    return;
                }
            );

        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
            return;
        }
    );

});

router.put('/', EmployeePermission_t3, function(req, res, next) {

    const productID = req.body.productID;
    const productName = req.body.productName;
    const categoryID = req.body.categoryID;
    const productDescription = req.body.productDescription;
    const productImageUrl = req.body.productImageUrl;
    const productPrice = req.body.productPrice;
    const isVisible = req.body.isVisible;
    const isRecommended = req.body.isRecommended;

    if(!productName || !categoryID ||
        !productDescription || !productImageUrl ||
        !productPrice
    ) {
        res.send(new ResponseType1(false, "The entered data is incorrect"));
        return;
    }

    const product = {
        productName: productName,
        productDescription: productDescription,
        productImageUrl: productImageUrl,
        isVisible: isVisible,
        isRecommended: isRecommended,
        categoryID: categoryID,
        productPrice: productPrice
    };

    if(!Number.isInteger(productID) || !Number.isInteger(categoryID)) {
        res.send(new ResponseType1(false, "The entered productID or categoryID is incorrect"));
        return;
    }

    categories.findOne({
        where: {
            categoryID: categoryID
        }
    }).then(
        result => {
            if(!result) {
                res.send(new ResponseType1(false, "Category with this categoryID does not exist"));
                return;
            }

            products.update(product, {
                    where: {
                        productID: productID
                    }
                }
            ).then(
                result => {
                    console.log(result);
                    res.send(new ResponseType1(true, "Record successfully changed"));
                }
            ).catch(
                err => {
                    console.log(err);
                    res.send(new ResponseType1(false, "Something gone wrong ;("));
                }
            );

        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
            return;
        }
    );

});

router.get('/byCategoryID/:categoryID', function(req, res, next) {

    let categoryID = req.params.categoryID;

    products.findAll({
        where: {
            categoryID: categoryID
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

router.get('/byProductID/:productID', function(req, res, next) {

    let productID = req.params.productID;

    products.findOne({
        where: {
            productID: productID
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

router.get('/recommended', function(req, res, next) {

    products.findAll({
        where: {
            isRecommended: true
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

router.get('/visible', function(req, res, next) {

    products.findAll({
        where: {
            isVisible: true
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


module.exports = router;
