##vue.cli
###创建

	npm install --global vue-cli
	切换到项目目录
	cd vuetest
	
	安装一来模块
	npm install
	运行
	npm run dev
	打包
	npm run build
main.js入口文件
	
	import Vue from 'vue'
	import todoList from './todoList.vue'
new Vue({
	el：‘#app’,
	component:{todoList}
	template:'<todoList/>'
})

app.vue改为todoList 组件
	
	<template>
	<div>
		<div>
			<input class="item" v-model:"inputValue">
			<button @click = "handleSubmit">提交</button>
		</div>
		<ul>
		<todoItem v-for="{item,index } of list" :key="index" :content="item" :index="index" @delete = “myhandeldelete” ></todoItem>      //经过下面的组件声明方可使用 ，定义content目的父组件传值给子组件,监听delete事件触发此文件定义的myhandelDelete事件
		</ul>
	</div>
	</template>//template中只能有一个子元素
	<script>
	import todoItem from './component/todoItem'  //其为局部组件
	export default{
		components:{
			'todoItem':todoItem     //局部组件进行声明
		}
		data:function(){         //data从对象变成函数,其返回值对应的数据
			return {
			inputValue:'',
			list:[]
			}
		},
		methods:{
			handelSubmit(){
				this.list.push(this.inputValue)  //this指向实例，vue底层将this.$data.list处理缩写成this.list
				this.inputvalue=""
			},
			myhandelDelete(index){
				this.List.splice(index,1)
			}
		}	
	}
	</script>
	<style></style>

hellworld.vue==>todoItem.vue

	<template>
		<li class="item" @click="handleDelete">{{content}}</li>
	</template>
	<script>
		export default{
			props:['content','index'], //声明对content的使用即接收名为content的数据
			methods:{
				handleDelete(){
					this.$emit('delete',this.index)//子组件向父组件通信,使用$emit向外触发事件delete,将this.index待会给父组件
				}
			}
		}
	</script>
	<style scoped>    // scoped指组件作用域（局部样式）,组件外部的样式使用里面的内容没有作用
		.item{
			color
		}	
	</style>