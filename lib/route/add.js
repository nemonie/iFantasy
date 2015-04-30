/*jslint node: true */
'use strict';

// 添加路由，地址 /add

var router = require('express').Router(),
    render = require('../render.js'),
    redirect = require('../redirect.js'),
    User = require('../model/user.js'),
    Post = require('../model/post.js');

router.get('/', User.mustLogin);
router.get('/', function (req, res, next) {
    render(req, res, 'Add', '', null, 'add', null);
});

router.post('/', User.mustLogin);
router.post('/', function (req, res, next) {
    var title = req.body.title.trim(),
        link = req.body.link.replace(/[\s]+/g, ''),
        tags = req.body.tags.trim().replace(/[\s]+/g, ' ').split(' '),
        top = req.body.top ? true : false,
        content = req.body.content,
        post = new Post();
    post.add(title, link, content, top, tags, function (err) {
        if (err) {
            render(req, res, 'Add', 'add failed', err, 'add', {
                title: title,
                link: link,
                tags: tags,
                content: content,
                top: top
            });
        } else {
            redirect(req, res, 'add success', '/post/' + link);
        }
    });
});

module.exports = router;
