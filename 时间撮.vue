<template>
	<div data-time-box>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import {Button} from 'element-ui';
	Vue.use(Button)
	export default{
		data(){
			return{
				list:[],
			}
		},
		methods:{
			
		},
		mounted(){
			let time = new Date();//Tue Nov 20 2018 16:03:51 GMT+0800 (中国标准时间)
			let yearT = time.getFullYear();//年
			let monthT = time.getMonth();//月
			let dateT = time.getDate();//日
			let hour = time.getHours();//时
			let minutes = time.getMinutes();//分
			let seconds = time.getSeconds();//秒
			let timeString = time.getTime();//1542701060408
			time = new Date(timeString) //Tue Nov 20 2018 16:03:51 GMT+0800 (中国标准时间)
		}
	}
</script>

<style lang="scss">
	div[data-time-box]{
		
	}
</style>