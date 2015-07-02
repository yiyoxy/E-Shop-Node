var User = require("../app/controllers/user");
var Good = require("../app/controllers/good");
var Index = require("../app/controllers/index");
var Order = require("../app/controllers/order");
var Cart = require("../app/controllers/cart")

module.exports = function(app){
	//欲加载
	app.use(function(req,res,next){
	var _user = req.session.user;
		app.locals.user = _user;
		console.log(app.locals.user)
		next();

	})

	//首页
	app.get('/',Index.page)
	app.get('/admin/signup',Index.adminsignup)
	//商品
	app.get('/admin/good',Good.admin)
	app.post('/admin/good/new',Good.postNew)
	app.get('/good/:id',Good.detail)
	app.get('/admin/goodlist',Good.list)
	app.delete('/admin/goodlist',Good.remove)
	app.get('/admin/update/:id',Good.update)
	//用户
	app.post('/user/reg',User.reg)
	app.post('/user/signup',User.signup)
	app.post('/admin/access',User.access)
	app.get('/user/signout',User.signout)
	app.get('/admin/userlist',User.userlist)
	app.post('/admin/reg',User.adminreg)
	app.delete('/admin/userlist',User.remove)
	//订单
	app.post('/order/new/:id',Order.orderPost)
	app.get('/order/:id',Order.admin)
	app.get('/admin/orderlist',Order.orderlist)
	app.get('/user/myorder',Order.userorder)
	app.get('/orderdetail/:id',Order.orderdetail)
	app.get('/cart/order',Order.cartorder)
	app.delete('/admin/orderlist',Order.remove)
	//购物车
	app.get('/cart/add',Cart.add)
	app.get('/user/mycart',Cart.cartlist)
	app.delete('/cart/remove',Cart.remove)
	
}