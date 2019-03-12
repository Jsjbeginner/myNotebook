
<template>
	<div data-warmhint-box>
		<el-form :model="formDataTop" >
			<el-form-item label="关联对象：">
				<el-select v-model="formDataTop.objId1" @change="changeEventTop" style="width: 100px;">
					<el-option
						v-for="item in objId1List"
						:value="item.value"
						:label="item.label"
						>
					</el-option>
				</el-select>
				<el-select v-model="formDataTop.objId2" v-if="isColumnTop" style="width: 200px; margin-left: 20px;">
					<el-option
						v-for="item in columnList"
						:value="item.value"
						:label="item.label"
						>
					</el-option>
				</el-select>
				<el-input v-model="formDataTop.objId2" placeholder="输入关联的产品ID" v-if="isProductTop" style="width: 200px; margin-left: 20px;"></el-input>
				<el-button type="danger" @click="getListData(1,paginationData.pageSize)" style="margin-left: 20px;">查询</el-button>
			</el-form-item>
		</el-form>
		<el-button type="danger" @click="addData()" class="button_top">新增提示</el-button>
		<el-table :data="tableData">
			<el-table-column label="ID" prop="infoId" algin="center"></el-table-column>
			<el-table-column label="提示类型" prop="infoType" algin="center">
				<template scope="scope">
					{{getTypeName(scope.row)}}
				</template>
			</el-table-column>
			<el-table-column label="提示内容" prop="infoContent" algin="center"></el-table-column>
			<el-table-column label="时间" prop="createTime" algin="center">
			</el-table-column>
			<el-table-column label="操作" algin="center">
				<template scope="scope">
					<el-button type="text" @click="editData(scope.row)">编辑</el-button>
					<el-button type="text" @click="deleteData(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination 
        	layout="prev, pager, next, total, jumper" 
        	:total="paginationData.total" 
        	:page-size="paginationData.pageSize" 
        	:current-page="paginationData.currentPage"
        	@current-change="changePage">
        </el-pagination>
		
		<el-dialog :title="dialogData.dialogTitle" v-model="dialogData.dialogVisible" :before-close="closeDialog" @close="closeDialog">
			<el-form :model="formData" ref="formData" :rules="rules" class="form" label-width="100px" label-position="left">
				<el-form-item label="提示类型:" prop="infoType">
					<el-select v-model="formData.infoType" >
						<el-option
							v-for="item in hintTypeList"
							:value="item.value"
							:label="item.label"
							>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="提示内容:" prop="infoContent">
					<el-input v-model="formData.infoContent" type="textarea" :row="2" placeholder="输入提示内容"></el-input>
				</el-form-item>
				<el-form-item label="关联类型" prop="objId1">
					<el-select v-model="formData.objId1" @change="changeEvent">
						<el-option
							v-for="item in objId1List"
							:value="item.value"
							:label="item.label"
							>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="栏目ID" prop="objId2" v-if="isColumn">
					<el-select v-model="formData.objId2">
						<el-option
							v-for="item in columnList"
							:value="item.value"
							:label="item.label"
							>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item  label="产品ID" prop="objId2" v-if="isProduct">
					<el-input v-model="formData.objId2" placeholder="输入关联的产品ID"></el-input>
				</el-form-item>
			</el-form>
			<div class="button_bottom">
				<el-button @click="sureDialog('formData')" type="primary">确 定</el-button>
				<el-button @click="closeDialog()">取 消</el-button>				
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { $v, DateFormat, TIPS_TIEM,AJAX_CMS_ADMIN} from '~cms/js/public';
	import {Table,TableColumn,Button,Dialog,Form,FormItem,Select,Option,Input,MessageBox,Message,Loading,Pagination} from 'element-ui';
	Vue.use(Table);
	Vue.use(TableColumn);
	Vue.use(Button);
	Vue.use(Dialog);
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Select);
	Vue.use(Option);
	Vue.use(Input);
	Vue.use(Pagination);
	export default{
		data(){
			var correlation = (rule, value, callback) => {
		        if (!value) {
		          	return callback(new Error('请选择相关类型ID'));
		        }
	          	if (!Number.isInteger(Number(value))) {
	            	return callback(new Error('请输入数字值'));
	          	} else {
	            	if (value.length > 8) {
	              		callback(new Error('ID长度不超过8位'));
	            	} else {
	              		callback();
	            	}
	          	}
		    };
			return{
				isFirst:1,
				isColumn:false,
				isProduct: false,
				isColumnTop:false,
				isProductTop: false,
				isEdit: null, //编辑为 true 新增为false
				infoId: '', //存放每一行对应信息的Id
				tableData: [ 
					{
						infoType: '1',
						infoContent: '温馨提示:',
						createTime: '2017-08-09',
						infoId: 100,
						objId1: 'CAT',
						objId2: '1',
					},{
						infoType: '2',
						infoContent: '温馨提示:此界面仅为您提供当月余量信息查询。本页数据不包含免费流量、免费语音、国际漫游流量包、国际漫游语音包。详细内容以当地营业厅查询为准。',
						createTime: '2017-08-09',
						infoId: 101,
						objId1: 'PROD',
						objId2: '123213',
					}
				],//table数据
				paginationData:{//分页
					currentPage: 1,
					pageSize: 10,
					total: 0,
				},
				hintTypeList:[
					{
						label: '业务介绍',
						value: '1',
					},{
						label: '温馨提示',
						value: '2',
					},{
						label: '常见问题',
						value: '3',
					}
				],//类型数据
				objId1:'',//关联类型ID
				objId1List: [//关联类型数组
					{
						label: '栏目',
						value: 'CAT',	
					},{
						label: '产品',
						value: 'PROD',	
					}
				], 
				columnList: [ //关联类型为栏目
					{value:'1', label:'产品订购'},
					{value:'2', label:'订购历史查询'},
					{value:'3', label:'余量查询'},
					{value:'4', label:'账单查询'}
				],
				dialogData: { //dialog数据
					dialogTitle: '',
					dialogVisible: false,
				},
				formDataTop: {
					//查询的form表单
					objId1:'',
					objId2:'',
				},
				formData: { //form表单数据
					infoType: '', //提示类型
					infoContent: '',//提示内容
					objId1: '',//关联类型'CAT':栏目  'PROD:产品
					objId2:'',//栏目或产品对应的相关Id
				},
				rules: {
					infoType: [
						{ required: true, message: '请选择提示类型', trigger: 'blur' },
					],
					infoContent: [
						{ required: true, message: '请输入提示内容', trigger: 'blur' },
					],
					objId1:[
						{ required: true, message: '请选择关联类型', trigger: 'blur' },
					],
					objId2:[
						{ required: true, validator: correlation, trigger: 'blur' },
					],
				},
			}
		},
		methods:{
			//分页改变
			changePage(val){
				this.paginationData.currentPage = val;
				this.getListData(val,this.paginationData.pageSize);
			},
			//获取数据
			getListData(page,pageCount){
		        let self = this;
		        let url = AJAX_CMS_ADMIN + '/rd/queryrd';
		        let data = self.formDataTop;
		        data.page = page;
		        data.pageCount = pageCount;
		        self.paginationData.total = 20;
//		        $v.get('url', data, (d) => {
//		        	self.paginationData.total = d.total;
//		        	self.tableData = d.resultList;
//	        	})
			},
			//新增表单
			addData(){
				let self = this;
				self.isEdit = false;
				self.dialogData.dialogTitle='新增提示表单',
				self.dialogData.dialogVisible = true;
			},
			//编辑表单
			editData(row) {
				let self = this;
				self.isFirst = 1;
				self.isEdit = true;
				self.infoId = row.infoId;
				self.dialogData.dialogTitle = '编辑提示表单';
				self.dialogData.dialogVisible = true;
				self.$nextTick(()=>{
					for(let obj in row){
						if(obj == 'infoType' || obj == 'infoContent' || obj == 'objId1' || obj =='objId2'){
							self.formData[obj] = row[obj];
						}
					}
				});
			},
			//	改变dialog change事件
			changeEvent(value) {
				if(value == 'CAT'){
					this.isColumn = true; //显示栏目ID
					this.isProduct = false; //隐藏产品ID
					if(this.isFirst != 1){
						this.formData.objId2 = '';
					} else {
						this.isFirst++;
					}
				} else if(value == 'PROD'){
					this.isColumn = false;
					this.isProduct = true;
					if(this.isFirst != 1){
						this.formData.objId2 = '';
					} else {
						this.isFirst++;
					}
				} else {
					this.isColumn = false;
					this.isProduct = false;
					this.formData.objId2 = '';
				}
			},
			//	formTop 的change事件
			changeEventTop(value) {
				if(value == 'CAT'){
					this.isColumnTop = true; //显示栏目ID
					this.isProductTop = false; //隐藏产品ID
					this.formDataTop.objId2 = '';
				} else {
					this.isColumnTop = false;
					this.isProductTop = true;
					this.formDataTop.objId2 = '';
				}
			},
			//Dialog关闭时回掉函数
			closeDialog(done){
				let self = this;
				for(let i in self.formData){
					self.formData[i] = '';
				}
				self.$refs['formData'].resetFields();
				self.dialogData.dialogVisible = false;
				done ? done() : '';
			},
			//确认dialog中的信息(调接口)
			sureDialog(formName){
				let self = this;
				self.$refs[formName].validate((valid) => {
					if(valid){
						let data = {};
						let url = self.isEdit ? '/rd/updaterd' : '/rd/saverd';
						url = AJAX_CMS_ADMIN +url ;
						data = self.formData
						if(self.isEdit){
							//编辑
							data.infoId = self.infoId
						}
						alert(url)
						alert(JSON.stringify(data))
//						let loading = Loading.service({ fullscreen: true });
//						$v.post(url, data, (d) => {
//							loading.close();
//							Message({
//					            	type: 'success',
//					            	message: self.isEdit ? '编辑成功' : '添加成功',
//					            	duration: TIPS_TIEM
//					          	});
// 							self.closeDialog();
//							self.getListData(1,self.paginationData.pageSize);
//						})
					}
				})
			},
			//删除表单(调接口)
			deleteData(row) {
				let self = this;
				MessageBox.confirm("此操作将永久删除文件，是否继续？", "提示", {
					cancelButtonText: "取消",
					confirmButtonText: "确定",
    				type: 'warning',
    			}).then(()=>{
    				let url = AJAX_CMS_ADMIN + '/rd/updaterd'
    				let data = {};
    				data.infoId = row.infoId;
    				data.isDel = 1;
    				console.log(data)
    				Message({
		            	type: 'success',
		            	message: '删除成功！',
		            	duration: TIPS_TIEM
		          	});
    			}).catch(()=>{
    				Message({
					    type: 'info',
					    message: '已取消删除',
		            	duration: TIPS_TIEM
					});
    			})
			},
			//显示类型名称
			getTypeName(row){
				let name = '';
				this.hintTypeList.map((item)=>{
					if(item.value == row.infoType){
						name = item.label;
						return ;
					}
				})
				return name;
			},
		},
		mounted(){
			let self = this;
			self.getListData(1,self.paginationData.pageSize);
		},
	}
</script>

<style lang="sass">
	div[data-warmhint-box]{
		padding-right: 20px;
		.button_top{
			margin-bottom:20px;
		}
		table{
			tbody tr {
				text-align: center;
				td div.cell{
				    max-height: 48px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
				}
			}
		}
		.el-pagination {
            float: right;
            margin-top: 10px;
            margin-right: 10px;
        }
		.el-dialog{
			.el-dialog__body{
				.form{
					.el-form-item{
						.el-form-item__label{
							font-size: 15px;
							font-weight: bolder
						}
					}
					.el-form-item__content{
						.el-select{
							width: 100%;
						}
					}
				}
			}
		}
		.button_bottom{
			    display: inline-block;
			    float: right;
			    margin-bottom: 20px;
			    margin-top: 20px;
		}
	}
</style>