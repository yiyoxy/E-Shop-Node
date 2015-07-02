var mongoose = require('mongoose');
var OrderSchemas = require('../schemas/order');
var Order = mongoose.model('Order',OrderSchemas)

module.exports = Order