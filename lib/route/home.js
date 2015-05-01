/*jslint node: true */
'use strict';

// 主页路由，地址 /

var router = require('express').Router(),
    render = require('../render.js'),
    marked = require('marked'),
    Post = require('../model/post.js');

router.get('/', function (req, res, next) {
    var post = new Post();
    post.get(1, 10, '', true, function (err, result) {
        if (!err) {
            result.docs.forEach(function (doc, index) {
                result.docs[index].brief = marked(doc.content.split('<more>')[0]);
                result.docs[index].content = marked(doc.content);
            });
        }
        render(req, res, 'Home', err ? err.message : '', err, 'home', result);
    });
});

module.exports = router;
