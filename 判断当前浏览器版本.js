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
}
