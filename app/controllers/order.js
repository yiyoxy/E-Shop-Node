var Good = require("../models/good")
var Order = require("../models/order");
var _ = require('underscore');

//admin
exports.admin=function(req,res){
	var id = req.params.id;
	Good.findById(id,function(err,good){
		var username;
		if(err){
			console.log(err)
		}
		else if(req.session.user){
			name = req.session.user.name;
		}
		else{
			name = "";
		}
		res.render('order',{
			title:"下单",
			order:{
			goodname:good.goodname,
			price:good.price,
			phone:'',
			address:'',
			username:name,
			total:'',
			count:'0',
			linkman:''
			},
			good:good
		})
	})
	
}

exports.orderPost=function(req,res){
	var orderObj = req.body.order;
	var id = req.params.id;
	var _order;
	Good.findById(id,function(err,good){
		if(err){
			console.log(err)
		}
		var ordertotal = orderObj.count*good.price
		_order = new Order({
		price:good.price,
		goodname:good.goodname,
		phone:orderObj.phone,
		address:orderObj.address,
		username:req.session.user.name,
		total:orderObj.total,
		count:orderObj.count,
		linkman:orderObj.linkman
	})

		_order.save(function(err,order){
			if(err){
				console.log(err)
			}
		})
		return res.redirect('/user/myorder')
	})
	
}

exports.orderlist=function(req,res){
	if(req.session.user.role!=1){
		res.redirect('/admin/signup')
	}else{
		var page = req.query.page;
		if(page==undefined){
			page=1;
		}
		Order.fetch(page,function(err,orders){
			Order.getCount(function(err,count){
				var pages = Math.ceil(count/10);
				var pageArray=[]
				for(var i=1;i<=pages;i++){
					pageArray.push(i)
				}
				if(err){
					console.log(err)
				}				
				res.render('orderlist',{
				title:'后台订单列表管理',
				orders:orders,
				pages:pageArray
				})
			})
		})
	}
	
}

exports.userorder=function(req,res){
	var _username = req.session.user.name;
	var page = req.query.page;
	if(page==undefined){
		page=1;
	}
	Order.findByName(page,_username,function(err,orders){
		Order.getCountByName(_username,function(err,count){
			var pages = Math.ceil(count/10);
			var pageArray=[]
			for(var i=1;i<=pages;i++){
				pageArray.push(i)
			}
		
			res.render('myorder',{
				title:"个人订单管理页",
				orders:orders,
				pages:pageArray
			})
		})
	})
}

exports.orderdetail=function(req,res){
	var id = req.params.id;
	Order.findById(id,function(err,order){
		if(err){
			console.log(err);
		}
		res.render('orderdetail',{
			title:"订单详情",
			order:order
		})
	})
}
exports.cartorder=function(req,res){
	var goodid = req.query.goodid;
	Good.findById(goodid,function(err,good){
		if(err){
			console.log(err)
		}
		res.render('order',{
			title:'下单',
			order:{
				goodname:good.goodname,
				price:good.price,
				phone:'',
				address:'',
				username:req.session.user.name,
				total:req.query.total,
				count:req.query.count,
				linkman:''
			},
			good:good
		})
	})

}

exports.remove=function(req,res){
	var id = req.query.id;
	if(id){
		
		Order.remove({_id:id},function(err,roder){
			if(err){
				console.log(err);
			}
			else{
				res.json({success: 1})
			}			

		})
	}
}

