var mongoose = require('mongoose');

var TypeListSchemas = new mongoose.Schema({
	name:String,
	bigid:String
})

TypeListSchemas.statics={
	fetch:function(callback){
		return this.find({}).sort('meta.updateAt').exec(callback);
	}
}
module.exports = TypeListSchemas