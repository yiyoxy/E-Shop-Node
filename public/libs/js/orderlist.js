$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		console.log(target)
		var id = target.data('id');
		var tr = $('.item-id-'+id);
		if(confirm('确定要删除吗')){
			$.ajax({
			type:'DELETE',
			url:'/admin/orderlist?id=' + id
			}).done(function(results){
				if(results.success === 1){
					if(tr.length>0){
						tr.remove();
					}
				}
			})
		}
		
	})
})