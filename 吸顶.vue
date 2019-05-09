<!-- 吸顶 -->
<template>
    <div class="scroll">
        <div class="header">header</div>
        <div class="nav" :class="navBarFixed == true ? 'navBarWrap' :''">吸顶导航</div>
    </div>
</template>
 
<script>
	export default {
	  data() {
	    return {
	        navBarFixed: false,
	    };
	  },
	 
	  components: {},
	 
	  mounted() {
	    window.addEventListener("scroll", this.watchScroll);
	  },
	 
	  methods: {
	    watchScroll() {
	      var scrollTop =
	        window.pageYOffset ||
	        document.documentElement.scrollTop ||
	        document.body.scrollTop;
	        console.log(scrollTop)
	      //  当滚动超过 90 时，实现吸顶效果
	      if (scrollTop > 90) {
	        this.navBarFixed = true;
	      } else {
	        this.navBarFixed = false;
	      }
	    }
	  }
	}
</script>
<style scoped>
.scroll{
    height:2000px;
}
.header {
  height: 90px;
  background: red;
  text-align: center;
  color: #fff;
}
.nav{
    padding:15px;
    width:100%;
    box-sizing: border-box;
    background:greenyellow;
    text-align: center;
}
.navBarWrap {
    position:fixed;
    top:0;
    z-index:999;
  }
 
</style>