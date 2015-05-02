/*jslint node: true */
'use strict';

// 编辑路由，地址 /edit

var router = require('express').Router(),
    render = require('../render.js'),
    redirect = require('../redirect.js'),
    User = require('../model/user.js'),
    Post = require('../model/post.js');

router.get('/:link', User.mustLogin);
router.get('/:link', function (req, res, next) {
    var link = req.params.link,
        post = new Post();
    post.getPostByLink(link, true, function (err, doc) {
        if (err) {
            redirect(req, res, err.message, '/post/' + link);
        } else {
            render(req, res, 'Edit', '', err, 'edit', doc);
        }
    });
});

router.post('/:link', User.mustLogin);
router.post('/:link', function (req, res, next) {
    var title = req.body.title.trim(),
        link = req.params.link.replace(/[\s]+/g, ''),
        tags = req.body.tags.trim().replace(/[\s]+/g, ' ').split(' '),
        content = req.body.content,
        post = new Post();
    post.edit(title, link, content, tags, function (err) {
        if (err) {
            render(req, res, 'Edit', 'edit failed', err, 'edit', {
                title: title,
                tags: tags,
                content: content
            });
        } else {
            redirect(req, res, 'edit success', '/post/' + link);
        }
    });
});

module.exports = router;
