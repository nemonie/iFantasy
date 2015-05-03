/*jslint node: true */
'use strict';

// post 类
function Post() {
    this.Model = require('./db.js').Post;
    this.DBerror = new Error('database error');
}

Post.prototype.add = function (title, link, content, tags, callback) {
    var self = this;
    this.getPostByLink(link, false, function (err, doc) {
        if (err) {
            callback(err);
        } else {
            var post = new self.Model({
                title: title,
                date: new Date(),
                link: link,
                tags: tags,
                content: content,
                hidden: false
            });
            post.save(function (err) {
                callback(err ? self.DBerror : null);
            });
        }
    });
};

Post.prototype.edit = function (title, link, content, tags, callback) {
    var self = this;
    this.getPostByLink(link, true, function (err, doc) {
        if (err) {
            callback(err);
        } else {
            doc.title = title;
            doc.content = content;
            doc.tags = tags;
            doc.save(function (err) {
                callback(err ? self.DBerror : null);
            });
        }
    });
};

Post.prototype.hide = function (link, callback) {
    var self = this;
    this.getPostByLink(link, true, function (err, doc) {
        if (err) {
            callback(err);
        } else {
            doc.hidden = true;
            doc.save(function (err) {
                callback(err ? self.DBerror : null);
            });
        }
    });
};

Post.prototype.get = function (page, perpage, tag, needContent, callback) {
    var countQuery = this.Model.find().where('hidden').equals(false),
        findQuery = this.Model.find().where('hidden').equals(false),
        str,
        self = this;
    if (tag) {
        str = '("," + this.tags.join(",") + ",").indexOf(",' + tag + ',") != -1';
        findQuery.$where(str);
        countQuery.$where(str);
    }
    countQuery.count(function (err, count) {
        if (err) {
            callback(self.DBerror);
        } else {
            if (!needContent) {
                findQuery.select('-content');
            }
            findQuery.sort({
                'date': -1
            });
            if (page !== 0) {
                findQuery.skip((page - 1) * perpage).limit(perpage);
            }
            findQuery.exec(function (err, docs) {
                if (err) {
                    callback(self.DBerror);
                } else {
                    var result = {
                        total: count,
                        docs: docs
                    };
                    callback(null, result);
                }
            });
        }
    });
};

Post.prototype.search = function (search, callback) {
    var searchQuery = this.Model.find().where('hidden').equals(false),
        self = this;
    searchQuery.select('title date link');
    searchQuery.sort({
        'date': -1
    });
    searchQuery.where({
        content: new RegExp(search)
    });
    searchQuery.exec(function (err, docs) {
        if (err) {
            callback(self.DBerror);
        } else {
            var result = {
                docs: docs
            };
            callback(null, result);
        }
    });
};

Post.prototype.getPostByLink = function (link, exist, callback) {
    var self = this;
    this.Model.findOne().where('link').equals(link).where('hidden').equals(false).exec(function (err, doc) {
        var flag = exist ? !doc : !!doc;
        err = err ? self.DBerror : null;
        if (!err && flag) {
            err = new Error('invalid link');
        }
        callback(err, doc);
    });
};

Post.prototype.getTags = function (callback) {
    var self = this;
    this.Model.find().where('hidden').equals(false).select('tags').exec(function (err, docs) {
        if (err) {
            callback(self.DBerror);
        } else {
            var tagsObj = {},
                result = [],
                singleTag;
            docs.forEach(function (doc, index) {
                doc.tags.forEach(function (tag, index) {
                    if (tagsObj.hasOwnProperty(tag)) {
                        tagsObj[tag] += 1;
                    } else {
                        tagsObj[tag] = 1;
                    }
                });
            });
            for (singleTag in tagsObj) {
                if (tagsObj.hasOwnProperty(singleTag)) {
                    result.push({
                        name: singleTag,
                        weight: tagsObj[singleTag]
                    });
                }
            }
            callback(null, result);
        }
    });
};

module.exports = Post;
