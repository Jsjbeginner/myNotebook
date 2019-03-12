<template>
	<div data-center-box>
		<div class="father">
			<div class="child"></div>
		</div>
		<span class="span">文字在span中垂直剧中</span>
	</div>
</template>

<script>
	
</script>

<style lang="scss">
	div[data-center-box]{
		.father{
			width: 200px;
			height: 200px;
			background-color: red;
			position: relative; 
			.child{
				width: 50px;
				height: 50px;
				background-color: green;
				position: absolute;  
				top: 50%;
				left: 50%;
				transform:translate(-50%,-50%);/*利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。*/
			}
		}
		.father{
			overflow: hidden; /*清除浮动*/
			margin: auto;  /*都是块元素*/
			text-align: center;  /*内联样式*/
		    vertical-align: middle; /*文本垂直居中*/
		}
		.span{
			font-size: 34px;
		    line-height: 48px;
		    color: #fe9c07;
		    margin-left: 10px;
		    text-align: left;
		    display: flex;
		    align-items: center;  /*定义项目在交叉轴上的对齐方式 */
		    justify-content: space-around;
		    flex-direction: column; /*纵向为主轴*/ /*垂直居中*/
		    margin-left: 32px;
		}
		/*当要被居中的元素是inline或者inline-block的时候，可以将父级容器设置为display:table-cell，
	配合text-align:center和vertical-align:middle即可以实现水平垂直居中。
		.container{
		    display:table-cell;
		    text-align:center;
		    vertical-align:middle;
		}*/
		
		/*使用flex布局，无需绝对定位等改变布局的操作，可以轻松实现元素的水平垂直居中。
	    #container{
		    display:flex;
		    justify-content:center;
		    align-items: center;
		}*/
		
		
	}
</style>