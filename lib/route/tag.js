/*jslint node: true */
'use strict';

// 标签路由，地址 /tag

var router = require('express').Router(),
    render = require('../render.js'),
    Post = require('../model/post.js');

router.get('/:tag', function (req, res, next) {
    var tag = req.params.tag,
        post = new Post();
    post.get(0, 0, tag, false, function (err, result) {
        if (!err) {
            result.tag = tag;
            render(req, res, 'Tag', '', err, 'tag', result);
        } else {
            next();
        }

    });
});

module.exports = router;
