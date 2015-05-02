/*jslint node: true */
'use strict';

// 登陆路由，地址 /login

var router = require('express').Router(),
    render = require('../render.js'),
    redirect = require('../redirect.js'),
    User = require('../model/user.js');

router.get('/', User.mustLogout);
router.get('/', function (req, res, next) {
    render(req, res, 'Login', '', null, 'login', {
        username: ''
    });
});

router.post('/', User.mustLogout);
router.post('/', function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    if (User.login(username, password)) {
        req.session.user = username;
        redirect(req, res, 'login success', '/');
    } else {
        render(req, res, 'Login', 'login failed', new Error('login failed'), 'login', {
            username: username
        });
    }
});

module.exports = router;
