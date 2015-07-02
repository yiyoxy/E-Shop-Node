var mongoose = require('mongoose');

var OrderSchames = new mongoose.Schema({
	goodname:String,
	phone:Number,
	price:Number,
	address:String,
	username:String,
	linkman:String,
	total:Number,
	count:Number,
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

OrderSchames.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.updateAt = Date.now();
	}
	next()
})

OrderSchames.statics={
	fetch:function(page,callback){
		return this.find({}).limit(10).skip((page-1)*10).sort('meta.createAt').exec(callback);
	},
	getCount:function(callback){
		return this.find({}).count().exec(callback)
	},
	findByName:function(page,name,callback){
		return this.find({username:name}).limit(10).skip((page-1)*10).exec(callback);
	},
	getCountByName:function(name,callback){
		return this.find({username:name}).count().exec(callback);
	},
	findById:function(id,callback){
		return this.findOne({_id:id}).exec(callback);
	}
}
module.exports = OrderSchames;
