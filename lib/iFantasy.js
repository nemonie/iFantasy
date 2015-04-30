/*jslint node: true */
'use strict';

// 依赖
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash');

// 扩展
var config = require('../config.js'),
    route = require('./route.js');

function iFantasy() {
    config.theme = config.theme || 'basic';
    var rootPath = path.join(process.cwd(), 'lib'),
        themePath = path.join(rootPath, 'theme', config.theme);

    // 判断theme是否存在
    require('fs').readdir(themePath, function (err) {
        if (err) {
            console.error('can\'t open theme files');
            process.exit(1);
        }

        var blog = express();
        // 开启反向代理支持
        blog.enable('trust proxy');
        // 关闭header头x-powered-by
        blog.disable('x-powered-by');
        // 在console输出实时log
        blog.use(logger('short'));
        blog.use(bodyParser.json());
        blog.use(bodyParser.urlencoded({
            extended: false
        }));
        // 设置模板引擎为ejs
        blog.set('view engine', 'ejs');
        // 根据主题将对应目录设置为static，且路由设置为/static/
        blog.use('/static', express['static'](path.join(themePath, 'static')));
        blog.set('views', path.join(themePath, 'template'));
        // 设置session，并存储在mongodb中
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
        // 启用flash
        blog.use(flash());
        // 路由设置
        route(blog);
        // 开始监听端口
        blog.listen(config.server.port, function () {
            console.log('iFantasy server listening on port ' + config.server.port);
        });
    });
}

module.exports = iFantasy;
