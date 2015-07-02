var mongoose = require('mongoose');
var TypeSchemas = require('../schemas/type');
var Type = mongoose.model('Type',TypeSchemas)

module.exports = Type;