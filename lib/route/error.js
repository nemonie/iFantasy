/*jslint node: true */
'use strict';

// 错误判断

var router = require('express').Router(),
    fs = require('fs'),
    render = require('../render.js'),
    path = require('path');

function writeError(err, req) {
    var date = new Date(),
        errorLog = fs.createWriteStream(path.join(process.cwd(), 'log', date.toLocaleDateString() + '.log'), {
            flags: 'a',
            encoding: 'utf8'
        });
    errorLog.write(date.toLocaleString() + ' ' + (req.originalUrl || req.url) + ' ' + req.method + ' ' + err.status);
    if (err.status === 500) {
        errorLog.write('\n');
        errorLog.write(err.stack);
    }
    errorLog.write('\n\n');
    errorLog.end();
}

router.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
router.use(function (err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status);
    // 写入日志文件
    writeError(err, req);
    // 渲染错误页面
    render(req, res, 'Error', '', err, 'error', null);
});

module.exports = router;
