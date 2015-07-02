var mongoose = require('mongoose');

var CartSchemas = new mongoose.Schema({
	goodname:String,
	price:Number,
	username:String,
	goodid:String,
	bcgimg:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

CartSchemas.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.updateAt = Date.now();
	}
	next()
})

CartSchemas.statics={
	findByUserName:function(page,username,callback){
		return this.find({username:username}).limit(6).skip((page-1)*6).sort('meta.createAt').exec(callback);
	},
	findCart:function(id,name,callback){
		return this.findOne({goodid:id,username:name}).exec(callback);
	},
	getCount:function(callback){
		return this.find({}).count().exec(callback)
	}
}

module.exports = CartSchemas