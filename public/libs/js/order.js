$(function(){
	$('#inputCount').blur(function(){
		var total = parseFloat($('#inputPrice').val())*$('#inputCount').val();
		$('#inputTotal').val(total);
	})

	if($('#user').val()==""){
		alert("请先登录！")
		window.location.href="/"
	}
})