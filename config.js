/*jslint node: true */
'use strict';

module.exports = {
    theme: 'basic',
    site: {
        name: 'codermo',
        description: 'codermo\'s blog',
        disqus: '',
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
        account: 'test',
        password: 'f4360f8417df2ee8d5d55b253e3097e1'
    }
};
