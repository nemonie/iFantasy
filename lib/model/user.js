/*jslint node: true */
'use strict';

var config = require('../../config.js'),
    redirect = require('../redirect.js'),
    crypto = require('crypto');

function User() {

}

User.login = function (username, password) {
    if (config.user.md5) {
        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
    }
    return (config.user.account === username && config.user.password === password) ? true : false;
};

User.mustLogin = function (req, res, next) {
    if (!req.session.user) {
        redirect(req, res, 'must login', '/login');
    } else {
        next();
    }
};

User.mustLogout = function (req, res, next) {
    if (req.session.user) {
        redirect(req, res, 'must logout', '/');
    } else {
        next();
    }
};

module.exports = User;
