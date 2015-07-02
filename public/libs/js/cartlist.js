$(function(){
	 $('.cart_price').each(function(){
	 	var total = $(this).html()
	 	$(this).next().next().html(total);
	 })
	 $('.add').click(function(e){
	 	var target=$(e.target);
	 	var count=parseInt(target.next().val())+1
	 	target.next().val(count);
	 	var total = parseInt(target.parent().prev().html()*count);
	 	target.parent().next().html(total)	
	 })

	 $('.down').click(function(e){
	 	var target=$(e.target);
	 	var count=parseInt(target.prev().val())-1
	 	
	 	if(count==0){
	 		count=1
	 	}
	 	target.prev().val(count)
	 	var total = parseInt(target.parent().prev().html()*count);
	 	target.parent().next().html(total)
	 })

	 $('.del').click(function(e){ 	
	 	var target = $(e.target);
	 	var id = target.data('id');
	 	var row = $('.item-id-'+id);
	 	if(confirm("确认要删除？")){
		 	$.ajax({
		 		type:'DELETE',
		 		url:'/cart/remove?id='+id
		 	}).done(function(results){
		 		if(results.success===1){
		 			if(row.length>0){
		 				row.remove()
		 			}
		 		}
		 	})
	 	}
	 })

	 $('.buy').click(function(e){
	 	var target = $(e.target);
	 	var goodid = target.data('id');
	 	var count=target.parent().siblings('.cart_math').children('.count').val();
	 	var total=target.parent().prev().html()
	 	var data={
	 			"goodid":goodid,
	 			"count":count,
	 			"total":total
	 		}
	 		window.location.href="/cart/order?goodid="+goodid+"&count="+count+"&total="+total+""
	 })
	
})