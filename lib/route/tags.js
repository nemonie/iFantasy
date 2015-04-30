/*jslint node: true */
'use strict';

// 所有标签路由，地址 /tags

var router = require('express').Router(),
    render = require('../render.js'),
    Post = require('../model/post.js');

router.get('/', function (req, res, next) {
    var post = new Post();
    post.getTags(function (err, tags) {
        render(req, res, 'Tags', err ? err.message : '', err, 'tags', tags);
    });
});

module.exports = router;
