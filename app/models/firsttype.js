var mongoose = require('mongoose');
var FirstTypeSchemas = require('../schemas/firsttype');
var FirstType = mongoose.model('FirstType',FirstTypeSchemas)

module.exports = FirstType