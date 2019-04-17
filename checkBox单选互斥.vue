<template>
	<div class="data-checkbox-box">
		<el-checkbox-group v-model="checkedCities">
	    	<el-checkbox v-for="city in cities" :label="city.cityId" :key="city.cityId" @change="changeChooseCity(city)">{{city.name}}</el-checkbox>
	  	</el-checkbox-group>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkedCities1: [],
				cities: [
					{
						name: '上海' , cityId: '2000'
					},{
						name: '北京' , cityId: '2001'
					},{
						name: '广州' , cityId: '2002'
					},{
						name: '深圳' , cityId: '2003'
					}
				],
			}
		},
		methods: {
			changeChooseCity(val){
				let a = this.checkedCities1.every((item)=>{
					return item != val.cityId;
				})
				let b = false;
				if(val.cityId == '2001' || val.cityId == '2002'){
					b = true;
				}
				if(!a && b) {
					alert("选中，且选择了互斥")
					//选中，且选择了互斥
					let arr = this.checkedCities1.filter((item)=>{
						return item == '2001' || item == '2002';
					})
					let brr = arr.filter((item)=>{
						return item != val.cityId;
					})
					this.checkedCities1 = this.checkedCities1.filter((item)=>{
						return item != brr[0];
					})
				}
			},
		},
		mounted(){
			
		}
	}
</script>

<style>
	
</style>