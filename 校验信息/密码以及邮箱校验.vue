<template>
	<!--注册-->
	<div data-register-box >
		<div class="content">
			<div style="margin-top: 20px; margin-bottom: 20px;">asda</div>
			<div style="height:2px;margin:0px auto;background-color:red;overflow:hidden;"></div>
			<div class="input_area">
	            <el-form :model="fromData" :rules="rules" ref="rulesForm" label-width="210px">
	                <!--邮箱-->
	                <el-form-item prop="mail" label="邮箱">
	                    <el-input v-model="fromData.mail" :placeholder="$t('register.emailTips')"></el-input>
	                </el-form-item>
	                <!--登入密码-->
	                <el-form-item prop="pwd" label="密码">
	                    <el-input type="password" v-model="fromData.pwd" :placeholder="$t('register.passwordTips')" @blur="pwdIntension"></el-input>
	                </el-form-item>
	                <!--密码强度-->
	                <el-form-item label="密码强度" v-show="showPwdIntension">
	                    <div class="progressDiv">
	                        <el-progress :percentage="intension" :show-text="false" :class="progress"></el-progress>
	                        <span v-if="intension == 33" class="spanD">{{$t("register.weakness")}}</span>
	                        <span v-if="intension == 67" class="spanD">{{$t("register.medium")}}</span>
	                        <span v-if="intension == 100" class="spanD">{{$t("register.strong")}}</span>
	                    </div>
	                </el-form-item>
	                <!--再次确认-->
	                <el-form-item prop="pwdAgain" label="确认密码">
	                    <el-input type="password" v-model="fromData.pwdAgain" :placeholder="$t('register.passwordAgainTips')"></el-input>
	                </el-form-item>
	                <!--服务条款-->
	                <div class="protocol_line">
	                    <el-form-item prop="protocolChecked">
	                        <el-checkbox v-model="fromData.protocolChecked"></el-checkbox>
	                        <span class="protocolleft">本人已阅读及同意</span>
	                        <span class="protocolTitle" style="cursor:pointer;margin-left:7px;" @click="dialogVisible=true">《网站使用条款》及《私隐条例》</span>
	                    </el-form-item>
	                    <el-dialog :visible.sync="dialogVisible">
	                        <!--<Protocol></Protocol> 条款协议-->
	                        <div slot="footer">
	                            <el-button class="footerBtn" @click="confirmProtocol">{{$t("register.confirmDialog")}}</el-button>
	                        </div>
	                    </el-dialog>
	                </div>
	                <!--注册按钮-->
	                <el-form-item label-width="0">
	                    <el-button type="primary" style="width: 100px"  @click="registerFunction" > 注册</el-button>
	                    <el-button type="primary" style="width: 100px;margin-top: 20px;"  @click="registerFunction" > 取消</el-button>
	                </el-form-item>
	            </el-form>
	        </div>
	    </div>
	</div>
</template>

<script>
	import Vue from 'vue';
    import {Form,FormItem,Input,Button,Checkbox,Progress,MessageBox,Message,Dialog} from 'element-ui';
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Input);
	Vue.use(Button);
	Vue.use(Dialog);
	Vue.use(Checkbox);
	Vue.use(Progress);

	
    export default{
    	data() {
    		//校验邮箱
	        let checkMail = (rule, value, callback) => {
	            let mail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	            if (value == "") {
	                return callback(new Error("邮箱不能为空"));
	            } else if (!mail.test(value)) {
	                return callback(new Error("邮箱格式不正确"));
	            } else {
	                checkMailIsUsable((result) => {
	                    if (result == 1) {
	                    	//成功
	                        callback();
	                    } else if(result == 2){
	                        return callback(new Error("邮箱格式不正确"));
	                    } else {
	                    	return callback(new Error("邮箱被已经注册了"));
	                    }
	                });
	            }
	        };
	        let checkMailIsUsable = (callback) => {
	        	return callback(1);
//	         	 点击检测邮箱时调用
//			    let data = {
//			        userType: 1,
//			        email: this.fromData.mail,
//			    };
//			    $v.get(AJAX_USER + '/signUp/check', data, (d) => {
//			        if (d.data.usable) {
//			        	//验证成功
//			            return callback(1);
//			        } else {
//			        	if(d.data.message == 'emailPatternError'){
//			        		//后端验证邮箱格式错误
//			        		return callback(2);
//			        	} else {
//			        		//后端验证邮箱已经注册过
//			        		return callback(3);
//			        	}
//			        }
//			    })
			};
	        //校验新密码
	        let checkPassword = (rule, value, callback) => {
	            let reg = /^[a-z0-9]{6,22}$/i;
	            if (value == "") {
	                this.showPwdIntension = false;
	                return callback(new Error("请输入密码"));
	            } else if (!reg.test(value)) {
	            	this.showPwdIntension = false;
	                return callback(new Error("密码格式不正确"));
	            } else {
	                //显示密码强度
	                this.showPwdIntension = true;
	                callback();
	            }
	        };
			//再次确认新密码
	        let checkPasswordAgain = (rule, value, callback) => {
	            if (value == "") {
	                return callback(new Error("请输入确认密码"));
	            } else if (this.fromData.pwd != this.fromData.pwdAgain) {
	                return callback(new Error("两次密码不正确"));
	            } else {
	                callback();
	            }
	        };
	        //使用条款必填
	        let checkProtocol = (rule, value, callback) => {
	            if (!value) {
	                return callback(new Error("请同意条款"));
	            } else {
	                callback();
	            }
	        };
	        return {
	            intension: 0, //密码强度
	            progress: 'grees',//密码强度颜色显示
	            dialogVisible: false, //dialog 显示
	            showPwdIntension:false, //密码强度
	            fromData: {
	            	mail: "", //邮箱
	                pwd: "",//登入密码
	                pwdAgain: "",//再次确认密码
	                protocolChecked: true,//第一个条款
	            },
	            rules: {
	            	mail: [{ required: true, validator: checkMail, trigger: "blur" }],//邮箱验证
	                protocolChecked: [{ required: true, validator: checkProtocol, trigger: "change" }], //'请先同意服务协议'
	                pwd: [{ required: true, validator: checkPassword, trigger: "blur" }],
	                pwdAgain: [{ required: true, validator: checkPasswordAgain, trigger: "blur" }],
	            }
	        }
    },
    components: {
//      Protocol,
    },
    mounted() {
    },
    methods: {
    	pwdIntension(){
    		//输入密码失焦的时候 进行判断密码强度
            let self = this;
            let S_level = 0;
            if (self.fromData.pwd == null || self.fromData.pwd == '') {
                self.intension = 0;
            } else {
                S_level = self.checkStrong(self.fromData.pwd);
                console.log("强度是：" + "---" + S_level)
                switch (S_level) {
                    case 0:
                        self.intension = 0;
                    case 1:
                        self.intension = 33;
                        self.progress = 'red'
                        break;
                    case 2:
                        self.intension = 67;
                        self.progress = 'yellow'
                        break;
                    default:
                        self.progress = 'grees'
                        self.intension = 100;
                }
            }
    	},
    	//返回密码的强度级别  
        checkStrong(sPW) {
            let Modes = 0;
            var i;
            for (i = 0; i < sPW.length; i++) {
                //测试每一个字符的类别并统计一共有多少种模式.  
                Modes |= this.CharMode(sPW.charCodeAt(i));
            }
            return this.bitTotal(Modes);
        },
        //计算出当前密码当中一共有多少种模式  
        bitTotal(num) {
            let modes = 0;
            var j;
            for (j = 0; j < 4; j++) {
                if (num & 1) modes++;
                num >>>= 1;
            }
            return modes;
        },
        //测试某个字符是属于哪一类.
        CharMode(iN) {
            if (iN >= 48 && iN <= 57) //数字  
                return 1;
            if (iN >= 65 && iN <= 90) //大写字母  
                return 8;
            if (iN >= 97 && iN <= 122) //小写  
                return 4;
            else
                return 0; //特殊字符  
        },
        //dialog中的确定
        confirmProtocol() {
            this.fromData.protocolChecked = true;
            this.dialogVisible = false;
        },
        registerFunction() {
            //点击注册按钮调用
            let self = this;
            let data = {};
            console.log(data)
            this.$refs.rulesForm.validate((valid) => {
                if (valid) {
//                  $v.post(url, data, (d) => {
//                      if (d.data.usable == 1) {
//                      	//注册成功
//                          window.location.href = "/auth/activation_result?register=1";
//                      } else {
//                      	//注册失败
//                          window.location.href = "/auth/activation_result?register=2";
//                      }
//                  });
                }
            })
        },
    },
}
</script>

<style lang="scss">
	@import "../../assets/css/common/theme_default.scss";
	div[data-register-box] {
		background-color: whitesmoke;
    	text-align: center;
		.content {
	        width: 900px;
	        height: 900px;
	        margin: auto;
	        background-color: white;
	        border: 1px solid #e6e6e6;
	        .content_header {
	            text-align: left;
	            padding-top: 10px;
	            margin-bottom: 10px;
	            height: 40px;
	            line-height: 40px;
	            >img {
	                vertical-align: middle;
	                margin-left: 30px;
	                width: 30px;
	                height: 20px;
	            }
	            span:first-child {
	                margin-left: 10px;
	            }
	            span:last-child {
	                float: right;
	                margin-right: 30px;
	            }
	        }
	        .input_area {
	            margin: 0 auto;
	            margin-top: 20px;
	            width: 620px;
	            .label_name {
	                display: inline-block;
	            }
	            .el-form-item{
	           		margin-bottom: 20px;
	            }
	            .el-input {
	            	/*输入框*/
	                width: 360px;
	            }
	            .el-form-item__error {
	            	/*提示信息*/
	                padding-left: 25px;
	            }
	        }
	        .protocol_line {
	            line-height: 1px;
	            text-align: left;	
	            .protocolleft{
	            	line-height: 20px;
	            	margin-left: 7px;
	            }
	            .el-checkbox__inner {
	                border-color: #d73435;
	            }
	            .el-checkbox__inner:hover {
	                border-color: #d73435;
	            }
	            .el-checkbox__input.is-checked {
	                .el-checkbox__inner {
	                    border-color: #d73435;
	                    background-color: #d73435 !important;
	                }
	            }
	            .protocolTitle{
	            	color: red;
	            }
	            .el-dialog {
	                width: 1180px;
	                font-family: PingFangSC-Medium;
	                color: #444958;
	                .el-dialog__header {
	                    padding: 24px 50px 20px !important;
	                    border-bottom: 1px #E5E5E5 solid;
	                    text-align: center;
	                    .el-dialog__title {
	                        font-size: 21px;
	                        color: #444958;
	                        letter-spacing: 0;
	                    }
	                }
	                .el-dialog__body {
	                    padding: 0px 50px !important;
	                    text-align: justify;;
	                    box-sizing: border-box;
	                }
	                .el-dialog__footer{
	                    text-align: center;
	                    height: 90px;
	                    font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
	                    font-size: 12px;
	                    background: #F6F7FA;
	                    box-shadow: 0 1px 0 0 #E5E5E5;
	                    border-radius: 8px 8px 0 0;
	                    letter-spacing: 1px;
	                    .footerBtn{
	                      background-color: #fff;
	                      color: #F1404B;
	                      border-color: #F1404B;
	                      margin: 20px;
	                    }
	                    .footerBtn:hover{
	                      color: #fff;
	                      background-color: #F1404B;
	                      border-color: #F1404B;
	                      margin: 20px;
	                    }
	                }
	            }
	        }
	        .el-button--primary {
	            color: rgba(255, 255, 255, 1);
	            border-color: rgba(215, 52, 53, 1);
	            background-color: rgba(215, 52, 53, 1);
	            ;
	        }
	        .el-button:hover {
	            color: rgba(255, 255, 255, 0.9);
	            border-color: rgba(215, 52, 53, 1);
	        }
	        .el-button:focus {
	            color: rgba(255, 255, 255, 0.9);
	            border-color: rgba(215, 52, 53, 1);
	        }
	    }
	    @include media-sm(){
	    		
	        .content {
	            .content_header {
	                .registerTitle{
	                    display: none;
	                }
	                .registerToL{
	                    display: none;
	                }
	            }
	            width: 100%;
	            box-sizing: border-box;
	            .input_area {
	                width: 90%;
	                .el-input {
	                    width: 100%;
	                }
	                .el-form-item__error {
	                    padding-left: 0px;
	                }
	                .el-dialog {
	                    width: 100%;
	                    .el-dialog__body {
	                        width: 100%;
	                        padding: 0px 20px !important;
	                    }
	                }
	                .el-form-item__content {
	                    margin-left: 0px!important;
	                    .one {
	                        padding-left: 0px;
	                    }
	                    
	                    .el-button{
	                        width: 100%!important;
	                    }
	                }
	                .el-form-item__label{
	                    display: none;
	                }
	            }   
	        }
	    }
	    @include media-xs(){
	    	.btn_box {
                text-align: right;
                color: #666666;
                font-size: 14px;
                >a {
                    margin-right: 10px;
                    color: #666666;
                }
            }
	        .content {
	            .content_header {
	                .registerTitle{
	                    display: none;
	                }
	                .registerToL{
	                    display: none;
	                }
	            }
	            width: 100%;
	            box-sizing: border-box;
	            .input_area {
	                width: 90%;
	                .el-input {
	                    width: 100%;
	                }
	                .el-form-item__error {
	                    padding-left: 0px;
	                }
	                .protocolTitle{
	                	color: #000000;
	                }
	                .protocolleft{
	                	line-height: 20px;
	            		font-size: 10px;
		            }
		            .protocolTitle{
		            	color: red;
		            	font-size: 10px;
		            }
	                .el-dialog {
	                    width: 100%;
	                    top: 0px !important;
	                    .el-dialog__body {
	                        width: 100%;
	                        padding: 0px 20px !important;
	                    }
	                    .el-dialog_header{
	                    	.el-dialog__headerbtn{
	                    		/*margin-right: -30px;*/
	                    	}
	                    }
	                }
	                .el-form-item__content {
	                    margin-left: 0px!important;
	                    .one {
	                        padding-left: 0px;
	                    }
	                    
	                    .el-button{
	                        width: 100%!important;
	                    }
	                }
	                .el-form-item__label{
	                    display: none;
	                }
	            }   
	        }
	    }
		.progressDiv {
	        .red {
	            .el-progress-bar {
	                margin-left: 15px;
	                margin-top: 12px;
	                width: 70%;
	                .el-progress-bar__outer {
	                    .el-progress-bar__inner {
	                        background-color: #FF4949;
	                    }
	                }
	            }
	        }
	        .yellow {
	            .el-progress-bar {
	                margin-left: 15px;
	                margin-top: 12px;
	                width: 70%;
	                .el-progress-bar__outer {
	                    .el-progress-bar__inner {
	                        background-color: #E8B743;
	                    }
	                }
	            }
	        }
	        .grees {
	            .el-progress-bar {
	                margin-left: 15px;
	                margin-top: 12px;
	                width: 70%;
	                .el-progress-bar__outer {
	                    .el-progress-bar__inner {
	                        background-color: #11B95C;
	                    }
	                }
	            }
	        }
	        .spanD {
	            display: inline-block;
	            float: right;
	            margin-top: -20px;
	            margin-right: 28px;
	        }
	    }
	}
</style>