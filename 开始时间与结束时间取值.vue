<template>
	<div>
		<span class="startTimeClass" v-text=" 开始时间： "></span>
		<el-date-picker
		        :clearable = false
		        :picker-options="pickerOptions"
		        style="float:none"
		        v-model="startDate"
		          type="date"
		          :placeholder="请选择开始时间">
		</el-date-picker>
		<span class="endTimeClass" v-text=" 结束时间： "></span>
		<el-date-picker
		        :clearable = false
		        :picker-options="pickerOptions2"
		        style="margin-left: -4px;float:none"
		          v-model="endDate"
		          type="date"
		          :placeholder="请选择结束时间">
		</el-date-picker>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		mounted(){
			
		},
		
	}
</script>

<style>
</style>