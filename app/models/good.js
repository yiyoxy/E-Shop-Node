var mongoose = require('mongoose');
var GoodSchemas = require('../schemas/good');
var Good = mongoose.model('Good',GoodSchemas)

module.exports = Good