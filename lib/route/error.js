/*jslint node: true */
'use strict';

// 错误判断

var router = require('express').Router(),
    render = require('../render.js');

router.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
router.use(function (err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status);
    render(req, res, 'Error', '', 'error', {
        error: err
    });
});

module.exports = router;
