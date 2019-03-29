function(){
	isIE9(){
		//判断当前浏览器是否小于等于ie9
	    var browser=navigator.appName 
	    var b_version=navigator.appVersion 
	    var version=b_version.split(";"); 
	    var trim_Version=version[1] ? version[1].replace(/[ ]/g,"") : ''; 
	    //alert(trim_Version.split('MSIE')[1] <= 9)
	    if(browser=="Microsoft Internet Explorer" && trim_Version.split('MSIE')[1] <= 9) {
	        return true;
	    }
	    return false;
	}
	goInType() {
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		    //alert(navigator.userAgent);  
		    window.location.href ="iPhone.html";
		} else if (/(Android)/i.test(navigator.userAgent)) {
		    //alert(navigator.userAgent); 
		    window.location.href ="Android.html";
		} else {
		    window.location.href ="pc.html";
		};
		if(/(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent)){
		    window.location.href = 'mobile.html';
		}
	}
}
