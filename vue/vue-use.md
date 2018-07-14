##vue.use
	
loading.vue
	
	<template>
	<div>
		loading..
	</div>
	</template>

index.vue
	
	import loadingComponent form'./loading.vue'
	const Loading =  {
		install:function(Vue){
			vue.component('loading',loadingComponent)
		}
	}
	export default Loading

main.js
	
	import loading from'./component/loading/index'
	Vue.use('loading')

vue.app
	
	<template>
		<div id="app">
		<loading></loading>
		</div>
	</template>