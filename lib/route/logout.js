/*jslint node: true */
'use strict';

// 登出路由，地址 /logout

var router = require('express').Router(),
    redirect = require('../redirect.js'),
    User = require('../model/user.js');

router.get('/', User.mustLogin);
router.get('/', function (req, res, next) {
    req.session.user = null;
    redirect(req, res, 'logout success', '/');
});

module.exports = router;
