<template>
	<div>
		<!--直接下载-->
		<el-table-column>
			<template slot-scope="scope">
				<a :href=" AJAX_SHOP_SS + '/contract/download' + '?' + 'filePath=' + scope.row.filePath" :download="scope.row.contractName + '.' + scope.row.filePath.split('.')[1]">
					<img src="../../../assets/img/pact_query.png"/>
				</a>
			</template>
		</el-table-column>
		<!--PDF查看-->
		<el-table-column>
			<template slot-scope="scope">
				<span v-if="scope.row.filePath.indexOf('.pdf') != -1">
					<el-button type="danger" @click="getPdfQuery(scope.row);">{{$t('billQuery.query')}}</el-button>
				</span>
			</template>
		</el-table-column>
		
		<div v-html="htmlAddress" class="rich-text-default"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
  	import {Button, Row, Col, RadioGroup, RadioButton, Switch, MessageBox} from 'element-ui';
	
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Button);
	Vue.use(RadioGroup);
	Vue.use(RadioButton);
	Vue.use(Switch);
	Vue.use(Alert);
	export default {
		data() {
			return {
				htmlAddress: '',
			}
		},
		props:{
            address: '',
        },
		mounted() {
			let self = this;
			axios({
			 	method: 'get',
			 	url: SRC_URL+ this.address,
                responseType: 'stream'
			}).then((response)=>{
				self.htmlAddress = String(response.data);
			})
			
//			axios({
//              method: 'get',
//              url: SRC_URL + 'group1/M00/02/0A/CngaWVx_fX6ALVwtAAJv9uMMcIA668.pdf',
//              responseType: 'arraybuffer'
//          }).then((response) => {
//          	return 'data:application/pdf;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
//	        }).then(data => {
//			    this.htmlAddress = data
//			});
		},
		methods: {
			getPdfQuery(row) {
				//解决弹出窗口被拦截问题
				let popWindow = window.open();
				popWindow.href = AJAX_SHOP_SS + '/contract/download' + "?" + "filePath=" + row.filePath;
			}
		}
	}
</script>

<style>
</style>