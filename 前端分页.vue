<template>
	<div class="notice_box" data-notice-box>
		<el-tabs v-model="type" @tab-click="radioChange">
    			<el-tab-pane :label="I18n['messageNotification'+lang]" name="1"></el-tab-pane>
    			<el-tab-pane :label="I18n['systemAnnouncement'+lang]" name="2"></el-tab-pane>
		</el-tabs>
		<!--<el-radio-group v-model="type" @change='radioChange'>
		    <el-radio-button label="1">{{I18n['messageNotification'+lang]}}</el-radio-button>
		    <el-radio-button label="2">{{I18n['systemAnnouncement'+lang]}}</el-radio-button>
		</el-radio-group>-->
		<div class="tableList_box hidden" :class="{'show':tableDataShow==true}">
			<el-table :data="tableData" stripe :show-header="false" border
			    style="width: 100%;text-align: center;">
			    <el-table-column prop="msgTitle" align="center"></el-table-column>
			    <el-table-column prop="createTime" width='180' align="center"></el-table-column>
			    <el-table-column prop="isRead" width='80' align="center">
			    	<template scope="scope">
				        <span>{{ scope.row.isRead==1?"已读":"未读" }}</span>
				    </template>
			    </el-table-column>
			    <el-table-column label="操作" width='150'>
			      <template scope="scope">
			        <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
			        <el-button @click="handleDel(scope.row.msgId)" type="text" size="small" >删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination 
		  		layout="total, prev, pager, next, jumper" 
		  		:page-size="pageSize"
		  		:total="total"
		  		:current-page="currentPage"
			    @current-change="pageChange"
		  		>
		  	</el-pagination> 
		</div>
		<div class="noContent_box hidden" :class="{'show':nodatashow==true}">
			<p>{{I18n['noNoticeMsg'+lang]}}</p>
		</div>
		<div>
			<el-dialog :title="notice_title" v-model="dialogVisible">
				<p v-text="dialogTitle" class="title_box"></p>
				<p v-text="dialogDate"></p>
				<div class="load_html_template_box" v-html="loadHtml"></div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
    import {I18n, lang, $v,ajaxUrl,srcUrl,tipsTime,PAGE_SIZE} from 'baseUrl/js/frm/public.js';
	import Vue from 'vue';
	import {Table, TableColumn, Radio, Button, RadioButton, RadioGroup, Pagination, Dialog,
			MessageBox, Message, Loading, Tabs, TabPane 
	} from 'element-ui';//按需获取ui组件
	Vue.use(Radio);
	Vue.use(Button);
	Vue.use(RadioButton);
	Vue.use(RadioGroup);
	Vue.use(Table);
	Vue.use(TableColumn);
	Vue.use(Pagination);
	Vue.use(Dialog);
	Vue.use(Tabs);
	Vue.use(TabPane);
	
	module.exports = {
		data() {
			return {
				notice_title:I18n['messageNotification'+lang],//dialog详细类型标题
				dialogVisible:false,//dialog显示
				dialogTitle:'',//消息标题
				dialogDate:'',//发布日期
				loadHtml:'',//消息html
				I18n: I18n,//国际化语言对象
				lang:lang,//语言缩写
				type:'1',
				nodatashow:false,
				totalTableData:[],//总数据
				tableData:[],//每页受理数据
				tableDataShow:false,
				total:0,
				pageSize:PAGE_SIZE,
				currentPage:1,
			}
		},
		mounted() {//初始化
			this.getMsgList(1);
		},
		methods: {
			pageChange(value){
				this.currentPage = value;
				this.getTableData();
			},
			//获取第n页数据
			getTableData(){
				let self = this;
				self.tableData = [];
				let begin = self.pageSize*(self.currentPage-1);
				let end = self.currentPage*self.pageSize;
				self.totalTableData.map((item,index)=>{
					if(index >= begin && index < end){
						self.tableData.push(item);
					}
				});
			},
			//公共函数：请求数据
			getMsgList:function(type) {
				let self = this;
				let data ={};
				data.msgType = type;
				$v.get(self,ajaxUrl+'/message/list',data,function(d) {
		            if (d.data.length > 0) {
		            	self.total = d.data.length;
		            	self.currentPage = 1;
	            		self.tableDataShow=true;
	            		self.totalTableData = d.data;
	            		self.getTableData();//获取当前页数据
	            		self.nodatashow=false;
		            } else {
		            		self.nodatashow=true;
		            		self.tableDataShow=false;
		            }
		        });
			},
//			radioChange:function(value) {
//				if (value == 1) {
//					this.getMsgList(1);
//				} else if (value==2) {
//					this.getMsgList(2);
//				}
//			},
			// 点击tabs触发的方法
			radioChange:function(tab, event) {
				if (1 == tab.name) {
					this.getMsgList(1);
				} else {
					this.getMsgList(2);
				}
			},
			//删除
			handleDel:function(value) {
				let self = this;
				MessageBox.confirm("提示", "提示", {
					message: "确认删除该消息？",
					showCancelButton: true,
					confirmButtonText: "确定",
      				cancelButtonText: "取消",
      				type: 'warning',
      				callback: action => {
      					if (action == 'confirm') {
			        		let load = Loading.service({fullscreen: true});
							let activeUrl = ajaxUrl+"/message/delete";
							let data = {msgId:value,msgType:self.type};
							$v.get(this, activeUrl, data, function(d) {
								load.close();
								Message.success({message: "删除成功", duration: tipsTime});
								self.getMsgList(self.type);
							}, function(error) {
								load.close();
								Message.error({message: error.meta.message, duration: tipsTime});
							})
      					} else {
//    						Message.success({message: '取消', duration: tipsTime});
      					}
      				}
      			})
			},
			//查看设置为已读
			handleLook:function(value) {
				let self = this;
				self.dialogVisible = true;
				self.dialogTitle = value.noticeName;
				self.dialogDate = value.publishDate;
				self.loadHtml = value.msgContent;
				if(value.msgContent.substring(value.msgContent.length-5)=='.html'){
					$.ajax({
			            type: "GET",
			            url: srcUrl+value.msgContent,
						dataType:"html",
						headers:null,
			            success: function(d) {
			            	var d = d.replace(/(@sru:)/g,srcUrl);
			            	self.loadHtml = d;
			            }
				    });
				}
				//self.loadHtml='<p>尊敬的客户：为了更好地满足广大客户宽带消费的需求，自2017年1月1日起，我公司将推出20元包150M流量包，可在APP内办理</p>';
				if (self.type==1) {
					self.notice_title=I18n['messageNotification'+lang];
				} else {
					self.notice_title=I18n['systemAnnouncement'+lang];
				}
				if(value.isRead == 0) {
					let activeUrl = ajaxUrl+"/message/read";
					let data = {msgId:value.msgId,msgType:self.type};
					$v.get(self, activeUrl, data, function(d) {
						self.getMsgList(self.type);
					}, false);
				}
			}
		}
	}
</script>
<style lang="sass">
	@import '../../../css/frm/theme_default.scss';
	.notice_box[data-notice-box] {
		text-align: center;
		overflow: hidden;
		width: 100%;
		.el-radio-group {
			margin-bottom: 20px;
		    .is-active span {
    				background-color: $common_color !important;
    			}
		}
		.el-pagination {
			float: right;
			margin: $margin_instance / 2 0 ;
		}
		.noContent_box {
            margin: 50px;
		}
		.el-dialog {
			.title_box {
				font-size: 16px;
				font-weight: 700;
				margin-bottom: 5px;
			}
			.el-dialog__header {
				.el-dialog__title {
					float: left;
				}
			}
		}
		.el-button{
			min-width: 50px !important;
		}
		.el-table__body {
			width: 100% !important;
		}
	}
</style>