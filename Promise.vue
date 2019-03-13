<template>
	<div data-promise-box>
		<el-button @click="clickBtn()"></el-button>
		{{list}}
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
		mounted(){
			this.promiseAll.then((d)=>{
				alert("promiseFunctionA and promiseFunctionB were end")
			})
		},
		methods:{
			promiseAll(){
				let promiseFunctionA = this.$refs.childTemplateRefName.promiseFunctionA();
				let promiseFunctionB = this.$refs.childTemplateRefName.promiseFunctionB();
				return Promise.all([promiseFunctionA,promiseFunctionB])
			},
			promiseFunctionA(){
				return new Promise((resolve, reject)=>{
					let data = {};
                    let url = AJAX_CMS_ADMIN + "/cms/catmanage/listParent";
                    $v.get(this, url, data, (d) => {
                    	this. dataList = d.data;
                        callback ? callback() : '';
                        resolve();
                    })
				})
			},
			promiseFunctionB(){
				return new Promise((resolve, reject)=>{
					let data = {};
                    let url = AJAX_CMS_ADMIN + "/cms/catmanage/listParent";
                    $v.get(this, url, data, (d) => {
                    	this. dataList = d.data;
                        callback ? callback() : '';
                        resolve();
                    })
				})
			},
			clickBtn(){
//				let data = [];
				this.promiseFunction().then((d) => {
					alert('成功')
					this.list = d;
				}).catch((d) =>{
					alert('失败')
					alert(d)
					let bbb =['7','8','9'];
					callback(null, {
                        list: bbb,
                    })
//					alert(d)
//					this.list = d;
//					callback(null,{tplArr: currTplArr,})
				});
			},
			promiseFunction(){
				let pro = new Promise((resolve, regect) =>{
					if(this.list.length == 0){
						let aaa = ['1','2','3'];
						alert('aaa')
						resolve(aaa)
					} else {
						let bbb =['4','5','6'];
						reject(bbb)
					}
				})
				return pro;
			},
		},
	}
</script>

<style>
</style>