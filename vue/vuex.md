# vuex
 
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
## store
改变`store`唯一的途径就是提交（`store.commit('mutation定义的方法')`）`mutation`  
### 组件调用store:
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
### 组件触发变化:
在methods中提交mutation
## getters（store的计算属性）
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
#### 以属性的形式访问值

	store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
	store.getters.doneTodosCount // -> 1
	store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
在组件中使用它

	computed:{
		doneTodisCount(){
			return this.$store.getter.doneTodoCount
		}
	}
### mapGetters辅助函数
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
## mutation
必须是同步函数  
任何在回调函数中进行的状态的改变都是不可追踪的
		
	const store = new Vuex.store({
		state:{
			count :1
		},
		mutation:{
			increment(state,n){
				state.count += n ;
			}
		}	
	})

不能直接调用mutation handler，这个选项类似事件注册：“当触发一个type(类型为increment)的mutation时，调用函数”，因此使用store.commit传入相应的type
	
	store.commit('increment',22)
### payload将n换成payload对象即可

传入对象

	const store = new Vuex.store({
		state:{
			count :1
		},
		mutation:{
			increment(state,payload){
				state.count += payload.amount ;
			}
		}	
	})
	store.commit('increment',{
		amount:10
	})	
	---------------------------------
	//或者
	//提交mutation的另一种方式（对象风格）
		store.commit({
			type:'increment',
			amount:10
		})
	
### store的state添加新属性

	Vue.set(obj,'newProp',123)
	-----------或者
	state.obj = {...state.obj,newProp:123}
### mapMutations
使用`mapMutations`将组件中的methods映射为store.commit调用（需要在根节点注入store）

	import {mapMutations} from 'vuex'
	export default{
		methods:{
			...mapMutations({
				‘increment’,//将`this.increment`映射为`this.$store.commit(increment)`  
				'incrementBy' 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
			}),
			...mapMutations({
				add:'increment' //将this.add()映射为`this.$store.commit('increment')`
			})
		}
	}
## action
1.提交的是mutation2.可以进行异步操作

	const store = new Vuex.store({
		state:{
			count:0
		},
		mutation:{
			increment(state){
				state.count++;
			}
		},
		action:{
			incrementAsync({commit}){ //参数解构 ==》context.commit==>context类似store实例
				setTimeout(()=>{
					commit('increment')
				},1000)  //进行异步操作
			}
		}
	})

### 分发方式通过store.dispatch触发（类似于store.commit()）

	store.dispatch('incrementAsync',{amount:10})
	//同样支持以对象形式分发
	store.dispatch({
		type:'incrementAsync',
		amount:10
	})
### mapActions

	import {mapActions} from 'vuex'
	export default{
		methods:{
			...mapActions([
				'increment',//将`this.increment()`映射为`this.$store.dispatch('increment')`
			]),
			...mapActions({
				add:'increment'//将`this.add()`映射为`this.$store.dispatch(increment)`
			})
		}
	}
### 组合Action
store.dispatch可以处理被触发的action的处理函数返回promise并且store.dispatch仍旧返回promise
	
	actions:{
		actionsA({commit}){
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					commit('someMutation')
					resolve()
				},1000)	
			})
		}
	}

------------------

	store.dispatch('actionA').then(()=>{...})
在另一个action中调用action

	actions:{
		actionsA({commit}){
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					commit('someMutation')
					resolve()
				},1000)	
			})
		},
		actionB({dispatch,commit}){
			return dispatch('actionA').then(()=>{
				commit('someOtherMutation')
			})
		}
	}
使用asych/await
	
	actions:{
		async actionA({commit}){
			commit('gotAta',await getDate())
		},
		async actionA({dispatch,commit}){
			await dispatch('actionA')
			commit('gotOtherAta',await getOtherDate())
		}
	}
## Module
将store分割成模块，每个模块拥有自己的`state`,`mutation`,`action`,`getter`,甚至嵌套子模块

	const moduleA = {
		state:{..}
		mutations:{..}
		actions:{..}
		getters:{...}
	}
	const moduleB = {
		state:{..}
		mutations:{..}
		actions:{..}
		getters:{...}
	}
	const store = new Vuex.Store({
		models:{
			a:moduleA,
			b:moduleB
		}
	})
### 模块的局部状态
mutation和getters接收的第一个参数（state）是局部的  
对于action和getters通过第三个参数暴露出来：({state,commit,`rootState`|`rootGetter`})  
分发时将{root:true}作第三参数传给dispatch得到全局
### 命名空间namespaces:true

	modules: {
	  foo: {  //命名空间
	    namespaced: true,
	
	    getters: {
	      // 在这个模块的 getter 中，`getters` 被局部化了
	      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
	      someGetter (state, getters, rootState, rootGetters) {
	        getters.someOtherGetter // -> 'foo/someOtherGetter'
	        rootGetters.someOtherGetter // -> 'someOtherGetter'
	      },
	      someOtherGetter: state => { ... }
	    },
	
	    actions: {
	      // 在这个模块中， dispatch 和 commit 也被局部化了
	      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
	      someAction ({ dispatch, commit, getters, rootGetters }) {
	        getters.someGetter // -> 'foo/someGetter'
	        rootGetters.someGetter // -> 'someGetter'
	
	        dispatch('someOtherAction') // -> 'foo/someOtherAction'
	        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
	
	        commit('someMutation') // -> 'foo/someMutation'
	        commit('someMutation', null, { root: true }) // -> 'someMutation'
	      },
	      someOtherAction (ctx, payload) { ... }
	    }
	  }
	}

### 在命名空间模块中注册全局action
添加root:true并将这个action放在handler中

	{
		actions:{
			someOtherAcrion({dispatch}){
				dispatch('someAction')	
			}
		},
		modules:{
			foo:{
				namespaced:true,
				actions:{
					someAction:{
						`root:true`,
						handler(namespacedContext,payload){...}
					}
				}
			}
		}
	}
### 带命名空间的绑定函数
由于命名空间的存在mapState,maoGetters,mapActions,mapMutations绑定命名空间起来比较繁琐

	computed:{
		...mapState({
			a:state =>state.some.nested.module.a
		})
	},	
	methods:{
		...mapActions([
			'some/nested/module/foo'
		])
	}

可以简化为

	computed: {
	  ...mapState('some/nested/module', {   //空间名称字符串作为第一个参数传递给函数
	    a: state => state.a,
	    b: state => state.b
	  })
	},
	methods: {
	  ...mapActions('some/nested/module', [
	    'foo',
	    'bar'
	  ])
	}

#### createNamespacedHelpers命名空间辅助函数。它返回一个对象

	import { createNamespacedHelpers } from 'vuex'
	
	***const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
	
	export default {
	  computed: {
	    // 在 `some/nested/module` 中查找
	    ...mapState({
	      a: state => state.a,
	      b: state => state.b
	    })
	  },
	  methods: {
	    // 在 `some/nested/module` 中查找
	    ...mapActions([
	      'foo',
	      'bar'
	    ])
	  }
	}
###模块注册

	store.registerModule('myMoudule',{
		...
	})//注册模块`myModule`
	store.registerModule(['nested','myMoudel']),{
		...
	}//注册嵌套模`nested/myModule`
通过store.state.myMoudel和store.state.nested.myMoudel访问