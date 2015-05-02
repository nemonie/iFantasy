/*jslint node: true */
'use strict';

module.exports = function (req, res, msg, url) {
    req.session.msg = msg;
    res.redirect(url);
};
