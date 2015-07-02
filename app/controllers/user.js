var User = require('../models/user');

exports.reg=function(req,res){
	var _user = req.body.user;	
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user!=""){
			return res.redirect("/")
		}
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				res.redirect("/")
			})
		}
	})
	
}

exports.adminreg=function(req,res){
	var _user = req.body.user;	
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user!=""){
			return res.redirect("/admin/userlist")
		}
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				res.redirect("/admin/userlist")
			})
		}
	})
	
}

//signup
exports.signup=function(req,res){
	var _user = req.body.user
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect("/")
		}
		
			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err)
				}
				if(isMatch&&user.role==0){
					req.session.user = user;
					res.redirect("/")
				}
				else{
					res.redirect("/")
				}
			})
	})
}
//signout
exports.signout=function(req,res){
	if(req.session.user.role==1){
		delete req.session.user;
		res.redirect('/admin/signup')
	}else{
		delete req.session.user;
		res.redirect('/')
	}
	
}
//userlist
exports.userlist=function(req,res){
	if(req.session.user.role!=1){
		res.redirect('/admin/signup')
	}else{
		var page = req.query.page;
		if(page==undefined){
			page=1;
		}
		User.fetch(page,function(err,users){
			User.getCount(function(err,count){
				var pages = Math.ceil(count/10);
				var pageArray=[]
				for(var i=1;i<=pages;i++){
					pageArray.push(i)
				}
				if(err){
					console.log(err)
				}	
				
				res.render('userlist',{
				title:'成员列表',
				users:users,
				pages:pageArray
				})
			})
		})
	}
	
}
exports.remove=function(req,res){
	var id = req.query.id;
	if(id){
		User.remove({_id:id},function(err,good){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}
exports.access=function(req,res){
	var _user = req.body.user
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect("/admin/signup")
		}
		
			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err)
				}
				if(isMatch){
					if(user.role==1){
						req.session.user = user;
						res.redirect("/admin/userlist")
					}else{
						res.redirect("/admin/signup")
					}
					
				}
				else{
					res.redirect("/admin/signup")
				}
			})
	})
}
