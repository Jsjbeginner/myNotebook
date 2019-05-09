<template>
		<el-input v-model="formData.messageCaptcha" :placeholder="$t('realnameRegistration.inquireVerCode')" @blur="inquireCaptcha">
            <el-button class="codeBtn" slot="append" @click="sendCode" v-if="!sendCodeDisabled">{{$t('login.sendCode')}}</el-button>
            <el-button class="codeBtn codeBtngray" slot="append" v-if="sendCodeDisabled" disabled>{{timer + $t('login.codeSecond')}}</el-button>
        </el-input>
</template>

<script>
	Vue from 'vue';
	export default {
		data(){
			return {
				timer: '',//倒计时时间
				sendCodeDisabled:false,//发送验证码按钮显示 
			}
		},
		methods:{
			//点击获取验证码
			sendCode(){
				let self = this;
                self.$refs['ruleForm'].validateField('phoneNumber',(msg)=>{
                    let data = {};
                    data.phoneNumber = self.formData.phoneNumber;
                    if(!!msg){
//                      Message.error(msg)
                    }else{
                        //发送手机号码验证用户是否有效 无效 返回信息 有效返回验证码、orgId
                        self.sendCodeDisabled = true;
                        if(window.name == ''){
                            self.timer = 60;
                        }else{
                            self.timer = parseInt(window.name)
                        }
                        let interval = window.setInterval(function(){
                            // debugger
                            if(self.timer > 0){
                                --self.timer
                                window.name = self.timer
                            }else{
                                self.sendCodeDisabled = false;
                                window.name = ''
                                window.clearInterval(interval)
                            }
                        },1000);
                        $v.get(AJAX_USER + '/sendMessage' ,{phone:self.formData.phoneNumber},(d) => {
                            this.formData.messageCaptcha = '';
                        })
                    }
                })
			},
		},
		mounted(){
			//定时
            if(window.name == ''){
                this.timer = 60
            }else{
                this.sendCodeDisabled = true;
                this.timer = parseInt(window.name)
                let interval = window.setInterval(function(){
                    // debugger
                    if(self.timer > 0){
                        --self.timer
                        window.name = self.timer
                    }else{
                        self.sendCodeDisabled = false;
                        window.name = ''
                        window.clearInterval(interval)
                    }
                },1000);
            }
		}
	}
	
	
</script>

<style>
</style>



		this.goodsDetail.startTime = '1533635052689';//2018-09-11 10:33:20
    	this.goodsDetail.endTime = '1536633240000';//2018-09-11 10:34:00
    	let newTimeStr = new Date().getTime();//获取当前时间撮
    	if (newTimeStr < this.goodsDetail.startTime){
    		this.isStart = false;//未开始
    	} else {
    		this.isStart = true;//已开始
    		//当前剩余时间
    		let times = this.goodsDetail.endTime - newTimeStr; //计算剩余毫秒数
    		//计算出相差天数
    		this.days = Math.floor(times/(24*3600*1000)); 
    		//计算出小时数
			var leave1 = times%(24*3600*1000);    //计算天数后剩余的毫秒数
			this.hours = Math.floor(leave1/(3600*1000));
			//计算相差分钟数
			var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2/(60*1000));
			//计算相差秒数
			var leave3 = leave2%(60*1000);      //计算分钟数后剩余的毫秒数
			var seconds = Math.round(leave3/1000);
			hours = days * 24 + hours;
			alert(" 相差 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
    	}