<template>
	<div data-browers-box id="anchor">
		
	</div>
</template>

<script>
	import Vue from 'Vue'
	
	export default {
		data: {
			return: {
				
			}
		},
		methods: {
			//返回顶部
			goTop() {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			}
		},
		mounted() {
			document.getElementById('anchor').scrollIntoView();//页面顶部显示的位置
		},
	}
	
</script>

<style>
</style>