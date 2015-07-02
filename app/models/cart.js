var mongoose = require('mongoose');
var CartSchemas = require('../schemas/cart');
var Cart = mongoose.model('Cart',CartSchemas);

module.exports = Cart
