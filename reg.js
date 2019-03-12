//8位不重复数字的正则表达式
let reg = /^(?!\d*?(\d)\d*?\1)\d{8}$/i
//连续相同的6位数字 如:333333
let reg =/^([0-9])\1{5}$/i
let reg =/^([\d])\1{5}$/i
//连续相同的6位数字或字母 如:222222 cccccc ZZZZZZ
let reg =/^([0-9a-zA-Z])\1{5}$/i
//连续相同3位数字后根连续相同的三位小写字母 如:222www
let reg =/^([\d])\1{2}([a-z])\2{2}$/i
//同上,但是能匹配数字+字母或字母+数字 如:222www 或 www222
let reg =/^([\d])\1{2}([a-z])\2{2}|([a-z])\3{2}([\d])\4{2}$/i


	if(!this.checkRule(value,2)){
        return callback(new Error(this.$t("editAddress.addressLinePromptuk")));
    }
	
	checkRule(val,flag) {
        if(flag == '1'){
          return !/\d/g.test(val) && val.replace(/\s/g, '') != '' && /[a-zA-Z\u4e00-\u9fa5]/g.test(val);
        }
        if(flag == '2'){
          return val.replace(/\s/g, '') != '' && /[a-zA-Z0-9\u4e00-\u9fa5]/g.test(val);
        }
    }, 
   