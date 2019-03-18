<template>
    <div data-ud-box  v-cloak>
        <div :class="this.scrollTop > 85 ? 'isShow' : 'notShow'"></div>
        <div :class="{noFixed: this.scrollTop > 85, isFixed: searchBarFixed}">
        	<Navs></Navs>
        </div>
        <Navmobile></Navmobile>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Navs from '~/components/common/NavNew';
    import { TPL_ROUTES } from '~/assets/router/tpl_route';
    import { AJAX_CMS, ACCEPT_PORTAL } from '~/assets/js/common/const';
    import { $v, CurrBrowser, SiteDetail, TreeData } from '~/assets/js/common/public';
    import { Row, Col, Carousel, CarouselItem } from 'element-ui';
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Carousel);
    Vue.use(CarouselItem);
    import axios from 'axios';

    export default {
        data() {
            return {
                scrollTop: 0,
                searchBarFixed: false,
            }
        },
        components: {
            Navs,
        },
        methods: {
        	//监听鼠标事件
        	handleScroll(e) {
        		//获取滚动条位置
        		this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//				let offsetTop = document.querySelector('#searchBar').offsetTop
        		//判断滚轮向下/向上 e.wheelDelta>0向上 <0向下
        		e = e || window.event;
        		if(e.wheelDelta){//IE/Opera/Chrome
	            	if(e.wheelDelta > 0 && this.scrollTop > 160) {
	            		this.searchBarFixed = true;
	            	} else {
	            		this.searchBarFixed = false;
	            	}
	            } else if(e.detail){//Firefox
	            	if(e.detail > 0  && this.scrollTop > 160) {
	            		this.searchBarFixed = true;
	            	} else {
	            		this.searchBarFixed = false;
	            	}
	            }
        	},
        },
        mounted() {
        	//设置鼠标滑动事件
//          window.addEventListener('scroll', this.handleScroll)
            if(document.addEventListener){
	        	document.addEventListener('DOMMouseScroll',this.handleScroll,false);
		    }
	        window.onmousewheel=document.onmousewheel= this.handleScroll;
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/common/theme_default.scss';
    div[data-ud-box]{
        background-color: #f7f7f7;
        .isShow {
        	display: block;
            height: 80px;
		    line-height: 80px;
		    border-bottom: 5px #FF001A solid;
        }
        .notShow {
        	display: none
        }
    	.isFixed{
	        position: fixed;
		    top: 0;
		    z-index: 999;
		    width: 100%;
		    transition: all 0.3s ease;
		}
		.noFixed {
		    top: -85px;
    		position: fixed;
		}
</style>
