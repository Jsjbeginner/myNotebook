//获取当前浏览器地址
goService(){
//	let urlAddress = window.location.protocol ? 'https://' + window.location.host : 'https//' + window.location.host 
	let ishttps = 'https:' ==  window.location.protocol ? true: false;
	let urlAddress = window.location.host;
	if(ishttps){
	    urlAddress = 'https://' + urlAddress;
	} else {
	    urlAddress = 'http://' + urlAddress;
	}
	let data ={}
	data.url = urlAddress
	$v.get(AJAX_USER +'/getOnlineUrl', data, (d) => {
		window.open(d.data.url)	                
    });
},

//返回当前浏览器顶部
document.body.scrollTop = document.documentElement.scrollTop = 0;