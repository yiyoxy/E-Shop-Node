var Type = require('../models/type');
var FirstType = require("../models/firsttype")
var Good = require("../models/good")
var fs = require('fs');


exports.adminsignup=function(req,res){
	res.render('adminsignup',{
		title:"商城管理系统"
	})
}

exports.page=function(req,res){
	if(req.session.user&&req.session.user.role==1){
		res.redirect('/admin/userlist')
	}
	var page = req.query.page;
	var typename = req.query.typename;
	if(page==undefined){
		page=1;
	}
	Type.fetch(function(err,types){
		if(err){
			console.log(err);
		}
		FirstType.fetch(function(err,firsttypes){
			if(err){
				console.log(err);
			}
			if(typename==undefined){
				Good.fetch(page,function(err,goods){
					Good.getCount(function(err,count){
						var pages = Math.ceil(count/9);
						var pageArray=[]
						for(var i=1;i<=pages;i++){
							pageArray.push(i)
						}
						if(err){
							console.log(err);
						}
						res.render('index1',{
						types:types,
						firsttypes:firsttypes,
						goods:goods,
						pages:pageArray
						})
					})
				})	
			}else{
				Good.findByTypeName(page,typename,function(err,goods){
					Good.getTypeCount(typename,function(err,count){
						var pages = Math.ceil(count/9);
						var pageArray=[]
						for(var i=1;i<=pages;i++){
							pageArray.push(i)
						}
						res.render('index2',{
						types:types,
						firsttypes:firsttypes,
						goods:goods,
						pages:pageArray,
						typename:typename
						})
					})
				})
			}
			
		})		
	})
}
