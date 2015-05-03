/*jslint node: true */
'use strict';

module.exports = {
    tipFormat: function (word, iFantasy) {
        word = word.replace(/\s+/g, '');
        var f = {
            Home: '博客',
            Archive: '归档',
            Add: '添加',
            Edit: '编辑',
            Error: '错误',
            Login: '登录',
            Post: iFantasy.data.title,
            Tags: '标签',
            Tag: '标签：' + iFantasy.data.tag,
            invalidlink: '无效的链接',
            databaseerror: '数据库内部错误',
            addsuccess: '添加成功',
            editsuccess: '编辑成功',
            hidesuccess: '删除成功',
            loginfailed: '登录失败',
            loginsuccess: '登录成功',
            logoutsuccess: '登出成功',
            mustlogin: '没有权限',
            mustlogout: '已经登录'
        };
        return f[word];
    },
    dateFormat: function (fmt, date) {
        var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            },
            k;
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
        }
        for (k in o) {
            if (o.hasOwnProperty(k)) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
                }
            }
        }
        return fmt;
    }
};
