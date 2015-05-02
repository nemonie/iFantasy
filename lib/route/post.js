/*jslint node: true */
'use strict';

// 单页路由，地址 /post

var router = require('express').Router(),
    render = require('../render.js'),
    marked = require('marked'),
    Post = require('../model/post.js');

router.get('/:link', function (req, res, next) {
    var link = req.params.link,
        post = new Post();
    post.getPostByLink(link, true, function (err, doc) {
        if (!err) {
            doc.content = marked(doc.content);
            render(req, res, 'Post', '', err, 'post', doc);
        } else {
            next();
        }
    });
});

module.exports = router;
