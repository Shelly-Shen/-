#vuex
	new Vue({
	//state
		data(){
			return{
				count:0
			}
		},
	//view
		template:`<div>{{count}}</div>`,
	//actions
		methods:{
			increment(){
				this.count++
			}
		}
	})
多个视图（`view`）需要依赖同一状态或不同视图更改同一状态时使用vuex,将组件的共享状态抽出，以一个全局单例模式管理，使任何组件都可获取状态和触发它
##store
改变`store`唯一的途径就是提交（`store.commit('mutation定义的方法')`）`mutation`  
###组件调用store:
由于store是响应式的，在组件中调用Store中的状态只需在计算属性中返回

	const Counter = {
		template:`<div>count</div>`,
		computed:{
			count(){
				return store.state.count
			}
		}
	}
为防止每个组件频繁导入state，将根组件“注入”到每个子组件中（需要调用Vue.use(Vuex)）子组件在computed中通过`this.$store`访问
	
	const app = new Vue({
		el:"#app",
		store,
		//调用store项，可以把Store实例注入所有的子组件
		components:{Counter},
		template:`
			<div class="app">
				<counter></counter>
			</div>
	
		`
	})
当一个组件需要获取多个状态
	
	import {mapState} from 'vuex'
	export default{
		computed:mapState({
			//count函数返回状态中的属性
			count:state=>state.count
			//将字符串参数'count'等同于‘state=>state.count’
			countAlias:'count'
			countPlusLocalState(state){
			 // 为了能够使用 `this` 获取局部状态，必须使用常规函数
				return state.count+this.localCount
			}
		})	
	} 
..
	
	computed:mapState(['count'])
	//映射this.count为store.state.count
将`mapstate`与局部计算属性混合使用对象展开运算符
###组件触发变化:
在methods中提交mutation
##getters（store的计算属性）
依赖发生变化才会重新计算
	
	const store = new Vuex.Store({
		state:{
			todos:[
			{id:1,text:'...',done:true},
			{id:1,text:'...',done:false}
			]
		},
		getters:{
			doneTodos:state=>{
				return state.todos.filter(todo=>todo.done)
			},
			doneTodosCount:(state,getters)=>{
					return getters.doneTodos.length
				}
			//getter接收其他getter作为第二参数
			},
			getTodoById:(state)=>(id)=>{
				return state.todos.find(todo=>todo)
			}
			//给getter中的方法传参
		}
	})
####以属性的形式访问值

	store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
	store.getters.doneTodosCount // -> 1
	store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
在组件中使用它

	computed:{
		doneTodisCount(){
			return this.$store.getter.doneTodoCount
		}
	}
###mapGetters辅助函数
将getter映射到局部计算属性：

	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters([
				doneCount:'doneTodosCount',
				'antherGetter'//默认用原名
			])
		}
	}	
