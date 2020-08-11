var express = require('express');
var router = express.Router();

//MODELS
let tables = require('../models/Tables');

//UTILS
let ResponseType1 = require('../utils/ResponseType1');
let EmployeePermission_t1 = require('../utils/EmployeePermission_t1');
let EmployeePermission_t2 = require('../utils/EmployeePermission_t2');

router.get('/', EmployeePermission_t2, function(req, res, next) {

    tables.findAll().then(
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

router.get('/byTableStatus/:tableStatus', function(req, res, next) {

    let tableStatus = req.params.tableStatus;

    tables.findAll({
        where: {
            tableStatus: tableStatus
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

router.post('/', EmployeePermission_t1, async function(req, res, next) {

    let tableName = req.body.tableName;
    let tableStatus = req.body.tableStatus;

    const table = {
        tableStatus: tableStatus,
        tableName: tableName
    };

    try {
        await tables.create(table);
    } catch(err) {
        res.status(200);
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }

    res.send(new ResponseType1(true, "Table created"));


});

router.put('/', EmployeePermission_t2, function(req, res, next) {

    const tableID = req.body.tableID;
    const tableName = req.body.tableName;
    const tableStatus = req.body.tableStatus;

    if(!Number.isInteger(tableID)) {
        res.send(new ResponseType1(false, "The entered tableID is incorrect"));
        return;
    }

    const table = {
        tableName: tableName,
        tableStatus: tableStatus
    };

    tables.update(table, {
            where: {
                tableID: tableID
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

});


router.put('/useTable', function(req, res, next) {

    const tableID = req.body.tableID;
    const tableStatus = "BUSY";

    if(!Number.isInteger(tableID)) {
        res.send(new ResponseType1(false, "The entered tableID is incorrect"));
        return;
    }

    const table = {
        tableStatus: tableStatus
    };

    tables.update(table, {
            where: {
                tableID: tableID
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

});



module.exports = router;
