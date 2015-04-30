/*jslint node: true */
'use strict';

var home = require('./route/home.js'),
    post = require('./route/post.js'),
    add = require('./route/add.js'),
    login = require('./route/login.js'),
    logout = require('./route/logout.js'),
    edit = require('./route/edit.js'),
    hide = require('./route/hide.js'),
    archive = require('./route/archive.js'),
    tags = require('./route/tags.js'),
    tag = require('./route/tag.js'),
    error = require('./route/error.js');

module.exports = function (blog) {
    blog.use('/', home);
    blog.use('/post', post);
    blog.use('/add', add);
    blog.use('/login', login);
    blog.use('/logout', logout);
    blog.use('/edit', edit);
    blog.use('/hide', hide);
    blog.use('/archive', archive);
    blog.use('/tags', tags);
    blog.use('/tag', tag);

    blog.use(error);
};
