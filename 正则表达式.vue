<template>
</template>

<script>
	//邮箱正则
	let mailRe = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	/**
     * flag: 1--不可以填写数字，不可以只填写空格，不可以只填写特殊符号;2--不可以只填写空格，不可以只填写特殊符号
     */
    checkRule(val,flag) {
        if(flag == '1'){
          return !/\d/g.test(val) && val.replace(/\s/g, '') != '' && /[a-zA-Z\u4e00-\u9fa5]/g.test(val);
        }
        if(flag == '2'){
          return val.replace(/\s/g, '') != '' && /[a-zA-Z0-9\u4e00-\u9fa5]/g.test(val);
        }
    },   
</script>

<style>
</style>