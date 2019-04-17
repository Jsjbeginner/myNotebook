<template>
	<div data-obj-box>
		<div>{{objA}}</div>
		<div>{{objB}}</div>
		<div>
			<div>这个是结果:</div>
			<div>{{objC}}</div>
		</div>
		<el-button @click="goAdd">添加属性</el-button>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { AJAX_USER, ACCEPT_PORTAL,AJAX_NODE} from '~/assets/js/common/const';
	import {$v} from '~/assets/js/common/public';
	
	export default{
		data(){
			return {
				objA: {
					a: '这是本身自带属性',
				},
				objB: {
					b: '这是添加属性',
				},
				objC: {},
				listNotebook: [{title: 'one',content:'one'},{title: 'two',content:'two'},{title: 'three',content:'three'}],
				listImg: [{imgUrl: '../../img/img_one'},{imgUrl: '../../img/img_two'}]
			}
		},
		methods:{
			goAdd(){
				this.listNotebook.map((item,index)=>{
				 Object.assign(item,this.listImg[(index%2)])
				})
//				listNotebook: [{title: 'one',content:'one',imgUrl: '../../img/img_one'},{title: 'two',content:'two',imgUrl: '../../img/img_two'},{title: 'three',content:'three',imgUrl: '../../img/img_one'}],
				Object.assign(this.objC,this.objA,this.objB)
			},
			//遍历数组
			aaaFunction(){
				let brr=[];
				let arr  = [
					{name:'A',value:'2'},{name:'A',value:'3'},{name:'C',value:'2'}
				]
				//找name类型
				arr.map((item,index)=>{
					if(brr.length >0){
						brr.map((item1,index) => {
							if(item1 != item.name) {
								brr.push(item.name);
							}
						})
					} else {
						brr.push(item.name);
					}
				})
				//初始化
				let crr =[] //[{name:'A',value: []},{name:'C',value: []}]
				brr.map((item,index)=>{
					let boj ={name:item,value: []}
					crr.push(boj)
				})
				//最后的数组
				crr.map((item,index)=>{
					arr.map((item1,index2)=>{
						if(item1.name == item.name) {
							item.value.push(item1.value)
						}
					})
				})
				alert(JSON.stringify(crr))
			},
		},
		mounted(){
			
		},
	}
	
</script>

<style lang="scss">
	div[data-obj-box]{
		
	}
</style>