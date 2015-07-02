$(function(){
	$(".cart").click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var cart = target.data('cart')
		if(cart=="yes"){
			$.ajax({
			type:"GET",
			url:"/cart/add?id="+id
			}).done(function(results){
				if(results.success === 1){
					 alert('加入购物车成功！')
				}else{
					alert('已添加过该商品，加入购物车失败！')
				}
			})
		}else{
			alert('请先登录！')
		}
		
	})

	$(".buy").click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		if(id!="ok"){
			alert("请先登录！")
		}
	})
})