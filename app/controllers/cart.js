var Cart = require('../models/cart');
var Good = require('../models/good');

exports.add = function(req,res){
	var id = req.query.id;
	var name = req.session.user.name;
	Good.findById(id,function(err,good){
		if(err){
			console.log(err)
		}
		Cart.findCart(id,name,function(err,cart){
			if(!cart){
				var _cart = new Cart({
					goodname:good.goodname,
					price:good.price,
					goodid:id,
					username:name,
					bcgimg:good.bcgimg,
				})
				_cart.save(function(err,cart){
					if(err){
						console.log(err)
					}
					res.json({success:1})
				})
			}
			else{
				res.json({success:0})
			}
		})
		
	})
}

exports.cartlist=function(req,res){
	var username = req.session.user.name;
	var page = req.query.page;
	if(page==undefined){
		page=1;
	}
	Cart.findByUserName(page,username,function(err,carts){
		if(err){
				console.log(err)
			}
		Cart.getCount(function(err,count){
			var pages = Math.ceil(count/10);
			var pageArray=[]
			for(var i=1;i<=pages;i++){
				pageArray.push(i)
			}	
			res.render('cartlist',{
				title:'购物车商品列表',
				carts:carts,
				pages:pageArray
			})
		})
	})
}

exports.remove=function(req,res){
	var id = req.query.id;

	if(id){
		Cart.remove({_id:id},function(err,good){
			if(err){
				console.log(err);
			}
			else{
				res.json({success: 1})
			}			

		})
	}
}

