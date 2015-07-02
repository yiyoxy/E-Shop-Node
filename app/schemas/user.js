var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	role:{
		type:Number,
		default:0
	},
	meta:{
		creatAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.pre('save',function(next){
	var user = this;
	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now();
	}
	else{
		this.updateAt = Date.now();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err){
			return next(err)
		}
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return next(err);
			user.password = hash
			next()
		})

	})
})

UserSchema.methods={
	comparePassword:function(_password,callback){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return callback(err,null)
				
			
			callback(null,isMatch)
		})
	}
}

UserSchema.statics={
	fetch:function(page,cb){
		return this.find({}).limit(10).skip((page-1)*10).sort('meta.updateAt').exec(cb)
	},
	getCount:function(cb){
		return this.find({}).count().exec(cb)
	}
}
module.exports = UserSchema