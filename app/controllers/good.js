var Type = require('../models/type');
var FirstType = require("../models/firsttype");
var Good = require("../models/good");
var fs = require('fs');
var _ = require('underscore');

//admin good page
exports.admin=function(req,res){
	res.render('goodadmin',{
		title:"商品信息修改",
		good:{
			typename:'',
			bcgimg:'',
			goodname:'',
			label:'',
			price:'',
			postage:'',
		}
	})
}
//admin good post
exports.postNew=function(req,res){
	var id = req.body.good._id;
	var goodObj = req.body.good;
	var _good;
	if(id!=='undefined'){
		Good.findById(id,function(err,good){
			if(err){
				console.log(err)
			}
			_good = _.extend(good,goodObj);
			
			_good.save(function(err,good){
				if (err) {
					console.log(err)
				}
				res.redirect('/admin/goodlist')
			})

		})
	}
	else{
		_good = new Good({
			typename:goodObj.typename,
			bcgimg:goodObj.bcgimg,
			goodname:goodObj.goodname,
			label:goodObj.label,
			price:goodObj.price,
			postage:goodObj.postage,
		})

		_good.save(function(err,good){
			if(err){
				console.log(err)
			}
			res.redirect('/admin/goodlist')
		})
	}

}
//good detail
exports.detail=function(req,res){
	//var files = fs.readdirSync("./app/img");
	var id=req.params.id;
		Good.findById(id,function(err,good){
			res.render('detail',{
			title:'商品详情',
			good:good
			})
		})
}
//good admin list
exports.list=function(req,res){
	if(req.session.user.role!=1){
		res.redirect('/admin/signup')
	}else{
		var page = req.query.page;
		if(page==undefined){
			page=1;
		}
		Good.fetch(page,function(err,goods){
			Good.getCount(function(err,count){
				if(err){
					console.log(err)
				}
				var pages = Math.ceil(count/9);
				var pageArray=[]
				for(var i=1;i<=pages;i++){
					pageArray.push(i)
				}
				Type.fetch(function(err,types){
					if(err){
						console.log(err)
					}
					res.render('goodlist',{
						title:'商品列表管理',
						pages:pageArray,
						goods:goods,
						types:types,
						good:{
							typename:'',
							bcgimg:'',
							goodname:'',
							label:'',
							price:'',
							postage:'',
						}
					})
				})	
			})
		})
	}
		
}
//list delete movie
exports.remove=function(req,res){
	var id = req.query.id;

	if(id){
		
		Good.remove({_id:id},function(err,good){
			if(err){
				console.log(err);
			}
			else{
				res.json({success: 1})
			}			

		})
	}
}
//update movie
exports.update=function(req,res){
	var id = req.params.id;
	Good.findById(id,function(err,good){
		if(err){
			console.log(err);
		}
		res.render('goodadmin',{
			title:"商品信息修改",
			good:good
		})
	})
}


