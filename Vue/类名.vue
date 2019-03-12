<template>
	<el-row 
		:class="{'wap-package-coll-row':ifShowColl[index]}" 
		v-for="(itemFather,index) in vasList" 
		:key="index">
			<div class="little-title-div" @click="wapCollShow(index)">
				<h1 class="package-h1" >{{itemFather.title}}:</h1>
				<i class="el-icon-d-arrow-left"></i>
			</div>
			<el-checkbox-group v-model="chooseVasList" style="margin-top: 16px;" ref="wapSimOnlyPackage">
				<el-col :xs='12' :sm='8' :md='8' :lg='8' 
					v-for="(item,pacIndex) in itemFather.list" 
					:key="pacIndex" 
				>
				    <el-checkbox >
				    	<div></div>
				    	<el-input-number></el-input-number>
				    </el-checkbox>
				    <div class="num">
						<el-input-number></el-input-number>
					</div>
				</el-col>
			</el-checkbox-group>
			<!-- 加载更多 -->
	        <!--<el-col :xs="24" class="xl-loading-more" style="margin-bottom: 0;text-align: center;" v-show="loadMoreList[index]">
	          <span @click.stop.prevent="getMore(index)">
				<div class="el-icon-arrow-right-div" style="display: inline-grid;height: 22px;margin: 10px 0;">
		      		<i class="el-icon-arrow-right" style="transform: rotate(90deg);"></i>
					<i class="el-icon-arrow-right" style="transform: rotate(90deg);margin-top: -9px;"></i>
		      	</div>
	          </span>
	        </el-col>-->
	</el-row>
	<ul>
      	<li v-for="(item,index) in chooseSimNoList" 
      		:key="index" 
      		:class="{'selected': chooseSimNo.simNo == item.simNo }" 
      		@click="chooseSimNo = item">
	      	<span>{{item.simNo}}</span>
	      	<span>{{item.expDate}}</span>
      	</li>
    </ul>
</template>

<script>
	export default {
		data(){
			return {
				ifShowColl:[],//row索引值 对应的真假
				chooseSimNo: {},//选中的sim卡数据
			}
		},
        methods: {
        	//点击row 展开或隐藏
        	//ifShowColl[] 数组中true的index值对应了row中的index，true的时候类名为wap-package-coll-row
        	wapCollShow(index) {
        		if(this.ifShowColl.length>index && this.ifShowColl[index]){
		    		this.$set(this.ifShowColl, index, false);//显示
		    		return;
		    	}else{
		    		this.$set(this.ifShowColl, index, true);//隐藏
		    		return;
		    	}
        	},
        },
        mounted() {
//      	this.$nextTick(() => {
//              document.querySelector(".vux-number-input").type = "text";
//          })
        }
	}
	
</script>

<style lang="scss">
	@import '../../../assets/css/common/theme_default.scss';
	.wap-package-coll-row {
		.little-title-div {
			.el-icon-d-arrow-left {
				transform: rotate(-90deg)
			}
		}
		.el-checkbox-group {
			display: none;
		}
	}
	.selected {
        color: #ff001a;
        font-weight: bold;
        position: relative;
        &::after {
          content: '';
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 12px;
          position: absolute;
          right: 22px;
          top: 50%;
          margin-top: -12px;
          background-image: url('../../../assets/img/ss_selected.png');
          background-repeat: no-repeat;
          background-position: center;
        }
  	}
</style>