var mongoose = require('mongoose');

var TypeSchemas = new mongoose.Schema({
	typename:String,
	bigid:String
})

TypeSchemas.statics={
	fetch:function(callback){
		return this.find({}).sort('meta.updateAt').exec(callback);
	}
}
module.exports = TypeSchemas