<template>
	<el-input v-model="textInputT" @change="textChange" type="text"></el-input>
</template>

<script>
	export default {
		data(){
			return {
				textInputT: '',
				textInput: '',
			}
		},
		methods: {
			textChange(val){
				let reg = /^[0-9]*$/i;
				if(reg.test(val)){
					this.textInput = val;
				} else {
					Vue.nextTick(()=>{
						this.textInputT = this.textInput;
					})
				}
			}
		}
	}
</script>

<style>
</style>