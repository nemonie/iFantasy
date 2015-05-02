/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    config = require('../../config.js');

mongoose.connect(config.database.host, config.database.name, config.database.port);

var DBmodel = {};
DBmodel.Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    date: Date,
    link: String,
    tags: [],
    content: String,
    brief: String,
    hidden: Boolean
}));

module.exports = DBmodel;
