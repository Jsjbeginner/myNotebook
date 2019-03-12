<template>
	 	<el-input v-model="login.password" :placeholder="请输入密码" type="password" id="password">
        </el-input>
        <i  class="eyeicon"
        	:class="eyeiconClass"
        	v-if="$store.state.siteDetail.orgId == 5" 
        	@mousedown="mousedown('mail')" 
        	@mouseup="mouseup('mail')"
        	@mouseout="mouseout('mail')"
        	@touchstart="touchstart('mail')"
        	@touchend="touchend('mail')"
        	>
    	</i>
</template>

<script>
	import Vue from 'vue';
	
	export default {
		data() {
			return {
				eyeiconClass: 'eyeicon_close',//eyeiconClass 会根据不同的类名来引入css背景图
			}
		},
		methods: {
			//欧 登陆的密码 小眼睛功能
        	mousedown(val){
        		this.eyeiconClass = 'eyeicon_open';
        		if(val == 'mail'){
        			document.querySelector('#password').childNodes[2].type = 'text'
        		} else {
        			document.querySelector('#passwordtwo').childNodes[2].type = 'text'
        		}
        	},
		},
		mounted(){
			//锚点，页面顶部固定到id=password 的位置
//			/scrollIntoView() 方法是滚动API 默认参数为true(顶部)
			document.getElementById('password').scrollIntoView()
		}
	}
</script>

<style>
</style>