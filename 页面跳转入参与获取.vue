<template>
</template>

<script>
	import Vue from 'vue';
	
	export default{
		data(){
			return{
				register:'',
				activateType:'',
				activateCode:'',
			}
		},
		methods:{
			getQueryString(name) {
			    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			    let r = window.location.search.substr(1).match(reg);
			    if (r != null) return unescape(r[2]); return null;
			},
			getQueryStingArgs() {
		    	let qs = location.search.length > 0 ? location.search.substring(1) : '';
		    	let args = [];
		    	let items = qs.length > 0 ? qs.split('&') : [];
		    	let item = null;
		    	let name = null;
		    	let value = null;
		    	let i = 0;
		    	let len = items.length;
		    	//逐个将每一项添加到agrs对象中
		    	 for (i=0; i<len ; i++) {
		    	 	item = items[i].split("=");
		    		name = decodeURIComponent(item[0]);
		    		value = decodeURIComponent(item[1]);
		    		if(name.length) {
		    			args[name] = value;
		    		}
		    	 }
		    	 return args;
		    },
		},
		mounted(){
			this.register = this.$route.query.register;
	        this.activateType = this.$route.query.activateType;
	        this.activateCode = this.$route.query.activateCode;
//	        this.register = this.getQueryString('register');
//	        this.activateType = this.getQueryString('activateType')
//	        this.activateCode = this.getQueryString('activateCode')
			
//			let argumentsArr = this.getQueryStingArgs();
//			this.register = argumentsArr["register"];
			
			//获取当前url中？后面的 第一个参数的值 
//			location.search 获取当前url中？的值（包括？）
//			location.search.substr(1) 选区不包括？的字符串
//			location.search.substr(1).split("=") 将字符串以'='分割，形成一个数组。
        	let path = location.search.substr(1).split("=")[1]
        	this.uniqleType = JSON.parse(path).uniqleType;
        	
        	let path = this.$store.state.siteDetail.urlRegionSuffix + '/shop/unique/uniquePay';
			window.location.href = path + '?data=' +JSON.stringify({uniqueType: 'newBuy',currency:this.currency});
			this.$router.push({ path: path + '?data='+JSON.stringify({uniqueType: 'newBuy'})});
//      	this.$router.push({ path: '/ss/RelaNameRegistration?data='+JSON.stringify(this.resultInformation)});
        	
        	
        	let queryData = JSON.parse(this.$route.query.data);
        	this.phoneNo = queryData.phoneNo;

		}
	}
	
</script>

<style>
</style>