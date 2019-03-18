<template>
	
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//设置弹出新窗口
			open() {
				var a = window.open('',"_blank","toolbar=yes,titlebar=yes,status=yes,menubar=yes,resizable=no,width=545, height=600,top=20");
				a.location.href = "https://www.baidu.com"
			},
			//置顶
			goTop(){
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			},
		},
		mounted() {
			//页面顶部显示位置
			document.getElementById('anchor').scrollIntoView();
		},
	}
</script>

<style>
	
</style>