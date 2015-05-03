/*jslint node: true */
'use strict';

// 主页路由，地址 /

var router = require('express').Router(),
    render = require('../render.js'),
    marked = require('marked'),
    Post = require('../model/post.js');

router.get('/', function (req, res, next) {
    var search, cpage, perpage, post;
    search = req.query.s ? req.query.s.trim() : '';
    post = new Post();
    if (search) {
        post.search(search, function (err, result) {
            if (err) {
                return next();
            }

            result.search = search;
            render(req, res, 'Search', '', 'search', result);
        });
    } else {
        cpage = req.query.p ? parseInt(req.query.p, 10) : 1;
        perpage = 10;
        post.get(cpage, perpage, '', true, function (err, result) {
            if (err) {
                return next();
            }

            result.docs.forEach(function (doc, index) {
                result.docs[index].brief = marked(doc.content.split('<more>')[0]);
                result.docs[index].content = marked(doc.content);
            });
            result.pager = {
                cpage: cpage,
                pageNum: Math.ceil(result.total / perpage)
            };
            render(req, res, 'Home', '', 'home', result);
        });
    }
});

module.exports = router;
