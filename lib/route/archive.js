/*jslint node: true */
'use strict';

// 归档路由，地址 /archive

var router = require('express').Router(),
    render = require('../render.js'),
    Post = require('../model/post.js');

router.get('/', function (req, res, next) {
    var post = new Post();
    post.get(0, 0, '', false, function (err, result) {
        if (err) {
            return next();
        }

        render(req, res, 'Archive', '', 'archive', result);
    });
});

module.exports = router;
