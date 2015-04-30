/*jslint node: true */
'use strict';

module.exports = function (req, res, msg, url) {
    if (msg) {
        req.flash('msg', msg);
    }
    res.redirect(url);
};
