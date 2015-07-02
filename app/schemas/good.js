var mongoose = require('mongoose');

var GoodSchemas = new mongoose.Schema({
	typename:String,
	bcgimg:String,
	goodname:String,
	label:String,
	price:String,
	postage:String,
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

GoodSchemas.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.updateAt = Date.now();
	}
	next()
})

GoodSchemas.statics={
	fetch:function(page,callback){
		return this.find({}).limit(9).skip((page-1)*9).sort('meta.updateAt').exec(callback)
	},
	getCount:function(callback){
		return this.find({}).count().exec(callback);
	},
	findById:function(id,callback){
		return this.findOne({_id:id}).exec(callback)
	},
	findByTypeName:function(page,typename,callback){
		return this.find({typename:typename}).limit(9).skip((page-1)*9).exec(callback);
	},
	getTypeCount:function(typename,callback){
		return this.find({typename:typename}).count().exec(callback)
	}
}

module.exports = GoodSchemas