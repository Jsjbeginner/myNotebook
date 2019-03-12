<template>
	<!--验证码-->
	<el-form :model="formData" ref="formData" :rules="rules" label-position="top" v-if="isCaptcha">
		<el-form-item prop="captcha" :label="$t('login.captcha')">
            <el-input class="left_input" v-model="formData.captcha" :placeholder="$t('login.captchaTips')"></el-input>
            <div class="right_div">
            	<img :src="codePic" @click="refreshImg" ref="codePic">
        	</div>
		</el-form-item>
	</el-form>


</template>

<script>
	export default  {
		data (){
			let ageRules = (rule, value, callback) => {
			    if (!rule.required) {
			        callback();
			    }
		      	if (!!!value) {
		        	return callback(new Error(this.$t("editAddress.fillAddressErrorMsg")));
		      	}
		      	if(value > 20){
		        	return callback(new Error('年龄大于20岁了。'));
		      	}
		      	callback();
		    };
		    let checkCaptcha = (rule, value, callback) => {
        		if (!rule.required) {
			    	callback();
			    }
		      	if (!!!value) {
		      		//验证码不能为空
			        return callback(this.$t("login.enterCaptcha"));
			    }
		      	if(this.errorMsg) {
		      		return callback(this.errorMsg);
		      	}
			    callback()
		    };
			return {
				formData: {
					name: '',
					age: '',
					gender: '',
					captcha: '',
				},
				errorMsg: '',//验证码错误
				rules: {
					//校验的名字和formData中的名字必须一样，prop="age"
					age: [{
						required: true,
	            		validator: ageRules,
	            		trigger: "blur"
		            }],
		            captcha: [
                		{
				            required: false,
				            validator: checkCaptcha,
				            trigger: "blur"
				        }
                	],
				},
				noteDataRules: {
            		noteData: [{
            			validator: (rule, value, callback) => {
							if (value == '' || value == null) {
                                callback(new Error('请填写订单通讯信息'));
                                return;
                            };
							callback();
						},
            		}]
            	}
			}
		}
		methods:{
			//重置表单的某个选项校验规则
			upRules(){
				this.stageCardRules.mcNumber[0].required = false;//先给设置为false 
        		this.$refs['stageCardForm'].validateField('mcNumber');//清空上一次校验的红色提示
			}
			//单独校验
			alone(){
				self.$refs['ruleForm'].validateField('phoneNumber',(msg)=>{
	                    let data = {};
	                    data.phoneNumber = self.formData.phoneNumber;
	                    if(!!msg){
	                        Message.error(msg)
	                    }else{
	                        //发送手机号码验证用户是否有效 无效 返回信息 有效返回验证码、orgId
	                        self.sendCodeDisabled = true;
	                        let interval = window.setInterval(function(){
	                            if ((self.time--) <= 0) {
	                                self.time = 60;
	                                self.sendCodeDisabled = false;
	                                window.clearInterval(interval);
	                            }
	                        },1000);
	                        $v.get(AJAX_USER + '/getCode?phone=' + self.formData.phoneNumber,(d) => {
	                            self.orgId = d.data.orgId;
	                        }).catch((d) => {
	                            Message.error(this.$t("login.errorCode"));
	                        })
	                    }
	                })
			},
			//全部校验
			allValidate(){
				this.errorMsg ='';//确保每次点击购买时校验规则只能为:是否为空
				self.$refs['ruleForm'].validate((valid) =>{//验证码不为空
	            	if(valid){
	            		alert(JSON.stringify(this.formData))
	            		//校验验证码是否有效
	            		$v.get(AJAX_SHOP_MOBILE + '/configurableActivity/checkCaptch?captcha=' + this.formData.captcha, (d) =>{
							this.errorMsg = '';
    					},(e) => {
							this.errorMsg = e.meta.message;
							this.$refs.formData.validateField('captcha');//提示验证码错误信息；
        					this.refreshImg();//刷新验证码
                        })
	            	}
	            })
			},
			//取消校验
			closeValidate(){
				this.rules.age[0].required = false;
			},
			//刷新验证码
			refreshImg() {
                this.codePic = this.codePic + '?' + new Date().getTime();
            },
		}
	}
</script>

<style>
</style>