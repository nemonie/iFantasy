/*jslint node: true */
'use strict';

var express = require('express'),
    favicon = require('serve-favicon'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash');

var config = require('../config.js'),
    route = require('./route.js');

function iFantasy() {
    config.theme = config.theme || 'basic';
    var rootPath = path.join(process.cwd(), 'lib'),
        themePath = path.join(rootPath, 'theme', config.theme);

    require('fs').readdir(themePath, function (err) {
        if (err) {
            console.error('can\'t open theme files');
            process.exit(1);
        }

        var blog = express();

        blog.enable('trust proxy');
        blog.disable('x-powered-by');

        blog.set('views', path.join(themePath, 'template'));
        blog.set('view engine', 'jade');

        blog.use('/static', express['static'](path.join(themePath, 'static')));
        blog.use(favicon(path.join(themePath, 'static/favicon.ico')));

        blog.use(logger('short'));

        blog.use(bodyParser.json());
        blog.use(bodyParser.urlencoded({
            extended: false
        }));

        blog.use(session({
            secret: config.server.cookieSecret,
            name: config.server.cookieName,
            cookie: {
                maxAge: 1000 * 60 * 60
            },
            resave: true,
            saveUninitialized: false,
            store: new MongoStore({
                host: config.database.host,
                port: config.database.port,
                db: config.database.name
            })
        }));

        blog.use(flash());

        route(blog);

        blog.listen(config.server.port, function () {
            console.log('iFantasy server listening on port ' + config.server.port);
        });
    });
}

module.exports = iFantasy;
