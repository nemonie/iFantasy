/*jslint node: true */
'use strict';

module.exports = {
    theme: 'basic',
    site: {
        domain: 'http://blog.codermo.com',
        title: ' - iFantasy',
        name: '<span>i</span>Fantasy',
        description: 'codermo\'s blog',
        keyword: 'blog, codermo',
        disqus: '',
        duoshuo: 'ifantasy',
        author: 'codermo',
        homepage: 'http://www.codermo.com'
    },
    server: {
        port: 3000,
        cookieName: 'iFantasy',
        cookieSecret: 'iamcodermo'
    },
    database: {
        name: 'iFantasy',
        host: '127.0.0.1',
        port: 27017
    },
    user: {
        md5: true,
        account: 'codermo',
        password: 'f4360f8417df2ee8d5d55b253e3097e1'
    }
};
