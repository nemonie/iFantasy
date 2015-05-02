/*jslint node: true */
'use strict';

var config = require('../config.js');

module.exports = function (req, res, pagename, msg, err, template, data) {
    if (msg) {
        req.flash('msg', msg);
    }
    req.pageName = pagename;
    res.render(template, {
        metadata: {
            siteTitle: config.site.title,
            siteName: config.site.name,
            siteAuthor: config.site.author,
            siteDesc: config.site.description,
            siteKeyword: config.site.keyword,
            disqus: config.site.disqus,
            homepage: config.site.homepage,
            pageName: req.pageName,

            msg: req.flash('msg').toString(),
            user: req.session.user,

            error: err
        },
        data: data
    });
};
