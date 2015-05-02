/*jslint node: true */
'use strict';

// 隐藏路由，地址 /hide

var router = require('express').Router(),
    render = require('../render.js'),
    redirect = require('../redirect.js'),
    User = require('../model/user.js'),
    Post = require('../model/post.js');

router.get('/:link', User.mustLogin);
router.get('/:link', function (req, res, next) {
    var link = req.params.link,
        post = new Post();
    post.hide(link, function (err) {
        if (err) {
            redirect(req, res, err.message, '/post/' + link);
        } else {
            redirect(req, res, 'hide success', '/');
        }
    });
});

module.exports = router;
