/*jslint node: true */
'use strict';

// 主页路由，地址 /

var router = require('express').Router(),
    render = require('../render.js'),
    marked = require('marked'),
    Post = require('../model/post.js');

router.get('/', function (req, res, next) {
    var cpage = req.query.p ? parseInt(req.query.p, 10) : 1,
        perpage = 10,
        post = new Post();
    post.get(cpage, perpage, '', true, function (err, result) {
        if (!err) {
            result.docs.forEach(function (doc, index) {
                result.docs[index].brief = marked(doc.content.split('<more>')[0]);
                result.docs[index].content = marked(doc.content);
            });
            result.pager = {
                cpage: cpage,
                pageNum: Math.ceil(result.total / perpage)
            };
            render(req, res, 'Home', '', err, 'home', result);
        } else {
            next();
        }
    });
});

module.exports = router;
