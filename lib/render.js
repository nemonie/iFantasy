/*jslint node: true */
'use strict';

var config = require('../config.js'),
    path = require('path');

module.exports = function (req, res, pagename, msg, template, data) {
    var extend = require(path.join(process.cwd(), 'lib', 'theme', config.theme, 'extend.js'));
    if (!msg) {
        msg = req.session.msg;
        req.session.msg = '';
    }
    res.render(template, {
        iFantasy: {
            site: {
                domain: config.site.domain,
                title: config.site.title,
                name: config.site.name,
                author: config.site.author,
                description: config.site.description,
                keyword: config.site.keyword,
                disqus: config.site.disqus,
                duoshuo: config.site.duoshuo,
                homepage: config.site.homepage
            },
            temp: {
                message: msg,
                pagename: pagename
            },
            user: req.session.user,
            data: data
        },
        extend: extend
    });
};
