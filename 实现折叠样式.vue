<template>
    <div data-cdnhead-box>
        <div class="solution_head">
            <img :src="SRC_URL + data.bgImg"/>
            <div class="common_width">
                <el-row>
                    <el-col :xs="24" :sm="24" :offset="-24">
                        <div class="solution_title_first" id="firstDiv">
                            <h1>{{data.title}}</h1>
                            <p :class="pName" id="firstp">{{data.content}}</p>
                            <div class="aDiv"> 
                            	<a v-if="approuverA" @click="unfold" ><i class="el-icon-d-arrow-left el-icon--right"></i></a>
                            </div>
                        </div>
                        <div class="solution_title_second" id="secondDiv">
                            <h1>{{data.title}}</h1>
                            <p :class="pName" id="secondP">{{data.content}}</p>
                            <div class="aDiv"> 
                            	<a @click="packUp" ><i class="el-icon-d-arrow-left el-icon--right"></i></a>
                            </div>
                        </div>
                    </el-col> 
                    <!--<el-col>
                        <el-button>{{data.btnText}}</el-button>
                    </el-col>-->
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { $v, SiteDetail} from '~cms/js/common/public';
    import { AJAX_CMS, SRC_URL } from '~cms/js/common/const';
    import { Button, Col, Row } from 'element-ui';
    import { routes } from '~cms/router/tpl_route';
    Vue.use(Button);
    Vue.use(Row);
    Vue.use(Col);

    export default {
        data() {
            return {
            	approuverA: false,
                SRC_URL: SRC_URL,
                pName:'',
                data: {
                    btnText: "",
				    btnUrl: "",
				    bgImg: "",
				    title: "",
				    content: ''
                },
            }
        },
        props: ['catId', 'tplId', 'tplInstId'],
        mounted() {
            SiteDetail.get('langId').then((d) => {
                let data = d;
                data.catId = this.catId;
                data.tplId = this.tplId;
                data.tplInstId = this.tplInstId;
                $v.get(AJAX_CMS + '/content/data', data, (d) => {
                    this.data = d.data.content[0];
                    if(sessionStorage.getItem("langId") == 3){
		           		this.pName='eno';
		           	}
		           	else if (sessionStorage.getItem("langId") == 2){
		           		this.pName='en';
		           	}
		           	else if (sessionStorage.getItem("langId") == 1){
		           		this.pName='eno';
		           	}
					let firstHeight;
					let secondHeight;
					Vue.nextTick(()=>{
		 				firstHeight = document.getElementById("firstp").offsetHeight;
		 				secondHeight = document.getElementById("secondP").offsetHeight;
		   				document.getElementById("secondDiv").style.display = "none";
		 				console.log(firstHeight)
		 				console.log(secondHeight)
		 				if(firstHeight< secondHeight) {
		 					this.approuverA = true
		 				}
					})
                })	
            })
        },
        methods: {
        	//展开
        	unfold(){
        		document.getElementById("firstDiv").style.display = "none";
        		document.getElementById("secondDiv").style.display = "block";
        	},
        	//收起
        	packUp(){
        		document.getElementById("firstDiv").style.display = "block";
        		document.getElementById("secondDiv").style.display = "none";
        	},
        }
}
</script>

<style lang="sass">
    @import '../../../../css/common/theme_default.scss';
    div[data-cdnhead-box]{
        @media (max-width: $media) {
            .el-row {
                text-align: center;
            }
            p {
                padding: 0 20px;
                box-sizing: border-box;
            }
        }
        .solution_head {
            position: relative;
            height: 350px;
            text-align: center;
            line-height: 350px;
            img {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0; 
                object-fit: cover;
            }
            .common_width {
                position: relative;
                top: 55px; 
                line-height: 1;
                z-index: 11;
                text-align: left;
                display: inline-block;
                /*vertical-align: middle;*/
                .solution_title_first {
                    padding-bottom: 50px;
                    h1 {
                        padding-bottom: 30px;
                        font-size: 28px;
                        font-weight: 700;
                        color: #444958;
                    }
                    p {
                    	text-indent: 2em;
                        text-align: justify;
                    	overflow: hidden;
                        width: 60%;
                        height: 100%;
                        color: #444958 ;
                        line-height: 2;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 8;
                        -webkit-box-orient: vertical;
                        word-break: break-word;
                    }
                   	p.en{
                   		text-indent: 0em;
                   	}
                   	.aDiv{
                   		width: 61%;
                   		margin-top: -13px;
                   		a{
                   			color: #3F51B5;
                   			float: right;
                   			i {
                   				transform: rotate(270deg);
                   			}
                   		}
                   	}
                }
                .solution_title_second{
                	padding-bottom: 50px;
                	h1 {
                        padding-bottom: 30px;
                        font-size: 28px;
                        font-weight: 700;
                        color: #444958;
                    }
                    p {
	                	text-indent: 2em;
	                    text-align: justify;
	                	/*text-overflow: ellipsis;*/
	                    width: 60%;
	                    height: 100%;
	                    color: #444958 ;
	                    line-height: 2;
	                    word-break: break-word;
                    }
                    p.en{
                    	text-indent: 0em;
                    }
                    .aDiv{
                   		width: 61%;
                   		margin-top: -13px;
                   		a{
                   			color: #3F51B5;
                   			float: right;
                   			i {
                   				transform: rotate(90deg);
                   			}
                   		}
                   	}
                }
                .el-button {
                    background: center;
                    color: #9ba6b7;
                    padding: 12px 50px;
                    border: 1px solid #9ba6b7;
                }
                
            }
        }
        @include media-xs(){
			.solution_head {
                .common_width {
                    .solution_title_first {
                    	h1 {
	                        padding-bottom: 30px;
	                        font-size: 28px;
	                        font-weight: 700;
	                        color: #444958;
	                    }
                        p {
                        	text-indent: 2em;
                        	-webkit-line-clamp: 5;
                        	text-align: justify;
                            width: 100%;
                            height: 100%;
                        }
                        p.en{
                    		text-indent: 0em;
                   	 	}
                   	 	.aDiv{
	                   		width: 100%;
	                   		margin-top: -13px;
	                   		a{
	                   			margin-right: 20px;
	                   			color: #3F51B5;
	                   			float: right;
	                   			i {
	                   				transform: rotate(270deg);
	                   			}
	                   		}
	                   	}
                    }
                    .solution_title_second{
                    	background-color: #f7f7f7;
	                	padding-bottom: 50px;
	                	h1 {
	                        padding-bottom: 30px;
	                        font-size: 28px;
	                        font-weight: 700;
	                        color: #444958;
	                    }
	                    p {
		                	text-indent: 2em;
		                    text-align: justify;
		                	text-overflow: ellipsis;
		                    width: 100%;
		                    height: 100%;
		                    color: #444958 ;
		                    line-height: 2;
		                    word-break: break-word;
	                    }
	                    p.en{
	                    	text-indent: 0em;
	                    }
	                    .aDiv{
	                   		width: 100%;
	                   		margin-top: -13px;
	                   		a{
	                   			margin-right: 20px;
	                   			color: #3F51B5;
	                   			float: right;
	                   			i {
	                   				transform: rotate(90deg);
	                   			}
	                   		}
	                   	}
	                }
                    .secondDiv{
                    	padding-bottom: 50px;
                    }
                }
            }
		}
    }
</style>

