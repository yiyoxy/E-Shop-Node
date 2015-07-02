$(function(){
	var url=location.search;
	var str = url.substr(1);
	var page
	if(url==""){
		page=1
		$('.pages:contains('+page+')').addClass('active')
	}
	strs = str.split("&"); 
	for(var i=0;i<str.length;i++){	
		if(strs[i].split("=")[0]=="page"){
			page=strs[i].split("=")[1];
		}else{
			page=1;
		}
		$('.pages:contains('+page+')').addClass('active')
	}
})