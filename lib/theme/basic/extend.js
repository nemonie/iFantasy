/*jslint node: true */
'use strict';

module.exports = {
    tipFormat: function (word, iFantasy) {
        var f_word = '';
        switch (word) {
        case 'Home':
            f_word = '博客';
            break;
        case 'Archive':
            f_word = '归档';
            break;
        case 'Add':
            f_word = '添加';
            break;
        case 'Edit':
            f_word = '编辑';
            break;
        case 'Error':
            f_word = '错误';
            break;
        case 'Login':
            f_word = '登录';
            break;
        case 'Post':
            f_word = iFantasy.data.title;
            break;
        case 'Tags':
            f_word = '标签';
            break;
        case 'Tag':
            f_word = '标签：' + iFantasy.data.tag;
            break;
        case 'invalid link':
            f_word = '无效的链接';
            break;
        case 'database error':
            f_word = '数据库内部错误';
            break;
        case 'add success':
            f_word = '添加成功';
            break;
        case 'edit success':
            f_word = '编辑成功';
            break;
        case 'hide success':
            f_word = '删除成功';
            break;
        case 'login failed':
            f_word = '登录失败';
            break;
        case 'login success':
            f_word = '登录成功';
            break;
        case 'logout success':
            f_word = '登出成功';
            break;
        case 'must login':
            f_word = '没有权限';
            break;
        case 'must logout':
            f_word = '已经登录';
            break;
        default:
            f_word = '';
            break;
        }
        return f_word;
    },
    dateFormat: function (fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
};
