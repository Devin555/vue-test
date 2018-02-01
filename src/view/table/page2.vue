<template>
	<div style="padding-bottom: 60px">
		<h2>事件及事件修饰符</h2>
		<h3>@click.once</h3>
		<button @click.once="doOnce">once只执行一次</button>
		<h3>获取事件对象@click="getText($event)"</h3>
		<button @click="getText($event)">事件对象</button>
		<input v-model="text">
		<h3>阻止事件冒泡@click.stop="show"</h3>
		<div @click="showdiv">
			<p @click.stop="showp">
				<span @click.stop="show">阻止事件冒泡</span>
			</p>
		</div>
		<h3>阻止事件默认行为@click.prevent="stopdefault"</h3>
		<a href="#" @click.prevent="stopdefault">点击跳转</a>
		<h3>键盘事件@keydown.13 = "down" @keydown.enter="down1" @keyup.enter="down1"</h3>
		<input @keydown="down($event)">
		<input @keydown.13="down1">
		<input @keydown.enter="down1">
		<h3>自定义键盘事件</h3>
		<img src="../../assets/pic.png">
		<input @keydown.86="down2">
		<br>
		<h2>属性</h2>
		<img :src="url">
		<div :class=""></div>
		<h2>模板,指令</h2>
		<input v-model="msg">
		<div v-cloak>{{url}}</div>
		<div v-text="msg"></div>
		<div v-html="msg"></div>
		<div v-once>{{msg}}</div>
		<div v-pre>{{msg}}</div>
		<h2>过滤器</h2>
		<h3>1，使用第三方工具loadash</h3>
		<h3>2，使用自定义过滤器---全局过滤器、局部过滤器</h3>
		<div>{{8 | addzero}}</div>
		<div>{{8.56469156 | number(3)}}</div>
		<div>{{8 | number1(10)}}</div>
		<h2>AJAX</h2>
		<h3>vue本身不支持AJAX请求的</h3>
		axios的post请求发送数据时，数据格式是request payload,并非我们常用的form data,参数必须以键值对格式传递
		axios 不支持跨域请求
		<input v-model="uid">
		<button @click="getuserByUid(uid)">获取github的信息</button>
		<br>
		<img :src="avatar">
		<h3>跨域 发送JSONP请求</h3>
		axios 不支持跨域请求 vue-resourse支持跨域请求
		<h3>计算属性-- computed</h3>
		{{msg01}}
		计算属性VS方法：将计算属性定义为方法也可以实现,区别是计算属性是基于依赖进行更新的，只有在相关依赖发发生改变时才会变化，<br>
		计算属性是有缓存的，只要依赖没有变，就不会多次执行；<br>
		<h4>计算属性有两部分组成 get 、set</h4>
		分别用来获取计算属性和更改计算属性，写法：<br>
		{{num}}<br>
		{{num1}}
		<button @click="changeComputed()">修改计算属性</button>
		<h2 ref="hello">VUE实例的属性和方法</h2>
		1,属性 vm.$el , vm.$data , vm.$options , vm.$refs
		<button @click="testref($event)">测试refs</button>
		<br>
		2,方法 $mounted
		DOM更新完毕后执行回调函数
		$nextTick(function(){})
		<h2>$watch(obj,callback[,options]),$set(obj,key,value),$delete(obj,key)</h2>
		<h3>$set,$delete 分别给数据对象添加和删除属性</h3>
		<button @click="doadd">添加</button>
		<button @click="dodelete">删除</button>
		{{users.name}}---{{users.age}}
		<h3>$$watch 监视数据变化</h3>
		<input v-model="num">{{num}}<br>
		<input v-model="users.name">
		<h5>{{users.name}}</h5>
		<h2>自定义指令</h2>
		<h3>自定义全局指令</h3>
		<h4 v-hello:chandecanshu.hehe="name">{{msg}}</h4>
		<button @click="changedata">改变数据</button>
		<h4 v-wbs>直接传函数</h4>
		<h3>自定义局部指令</h3>
		<input v-world v-model="msg">
		<h3>自定义指令练习</h3>
		<span v-drag class="aaa">aaa</span>
		<span v-test>指令练习</span>
		<h2>过渡</h2>
		<h3>vue动画本质上还是使用CSS3的transition,animation</h3>
		<h4>动画对应的有几个钩子函数，分别是动画进去之前，进入，进入之后，</h4>
		<div>
			<button @click="flag=!flag">show</button>
			//动画的钩子函数
			<transition name="fade"
			            @before-enter="beforeenter"
			            @enter="enter"
			            @after-enter="afterenter"
			            @before-leave="beforeleave"
			            @leave="leave"
			            @after-leave="afterleave"
			>
				<p class="donghua" v-show="flag"></p>
			</transition>
		</div>
		<h2>组件</h2>
		<hello></hello>
		<hello2></hello2>
		<h2>引用模板和动态组件</h2>
		<h3>引用模板：将组件内容方在模板template中</h3>
		<h3>动态组件</h3>
		<div>
			<button @click="showC='hello3'">显示hello3组件</button>
			<button @click="showC='world'">显示world组件</button>
		</div>
		<!--使用keep-alive可以缓存非活动的组件在内存中-->
		<keep-alive>
			<component :is="showC"></component>
		</keep-alive>
		<h2>组件间数据传递</h2>
		<h3>1,父子组件 --- 默认子组件无法访问父组件数据，父组件也无法访问子组件数据</h3>
		<h3>子组件访问父组件数组   props down</h3>
		父组件通过props向子组件传递数据，子组件通过props接受<br>
		<input v-model="url">
		<hello4 :message="url"></hello4>
		<hello5 :users="users"></hello5>
		<h3>父组件访问子组件数据  events up</h3>
		<div>父组件访问子组件数据，需要子组件$emit发送给父组件,父组件</div>
		<hello6 @e-hello6="getdata"></hello6>
		<hello7 @e-hello7="getH7D"></hello7>
		<h2>单向数据流</h2>
		<div>父组件利用props传递给子组件数据，当父组件数据改变，子组件会改变，但相反子组件数据改变不会改变父组件数据</div>
		<div>有时有必要子组件改变父组件的数据</div>
		<hello8 :Ghello8.sync="url"></hello8>
		<!--<hello8 :user="users"></hello8><input v-model="users.name">-->
		<h2>非父子组件间通信</h2>
		<h3>非父子组件间的通信，可以通过创建一个空的vue实例，用它来触发事件和侦听事件</h3>
		<hello9 @e-hello9="getH9d"></hello9>
		<hello10 :number000="number000"></hello10>
		<h2>slot内容分发：作用是用来获取组件中的原内容</h2>
		<hello11>
			<span slot="s1">组件中直接写的内容1</span>
			<span slot="s2">组件中直接写的内容2</span>
		</hello11>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import hello from '../../components/test'
	export default {
		name: 'page2',
		data () {
			return {
				text: '',
				url: 'https://diycode.b0.upaiyun.com/photo/2017/fc7727985fd40e43f6b5bd6192dc23b7.jpeg',
				msg: 'vue',
				ary: [
					{id: 1, age: 12},
					{id: 12, age: 13},
					{id: 112, age: 19}
				],
				uid: '',
				avatar: '',
				num: 5,
				users: {
					name: 'jack',
					id: 1
				},
				name: 'jack',
				flag: false,
				showC: 'hello3',
				childmsg:'',
				number000:''
			}
		},
		mounted(){
			this.$watch('num', function (newVal, oldVal) {  //监视数据变化方法一
				console.log(newVal + ',' + oldVal);
				console.log('num发生了改变')
			})
		},
		watch: {  //监视数据变化方法二
			num: (newVal, oldVal)=> {
				console.log('原值：' + oldVal + '--------新值：' + newVal)
			},
			users: {
				handler: (newVal, oldVal)=> {   //监视对象
					console.log(newVal)
				},
				deep: true  //深度监视
			}
		},
		//局部过滤器
		filters: {
			number1: (data, n)=> {
				return data + n
			}
		},
		//局部自定义指令
		directives: {
			world: {
				inserted(el){
					el.focus()  //元素绑定到DOM中时聚焦
				}
			},
			drag(el){
				el.onmousedown = function (e) {
					var disX = e.clientX - el.offsetLeft;
					var disY = e.clientY - el.offsetTop;
					console.log(disX + '--' + disY)
					document.onmousemove = function (e) {
						el.style.left = 60 + 'px'
					}
				};
			},
			test(el){
				el.style.background = '#ccc'
			}
		},
		computed: {
			msg01(){
				return this.msg.split('').reverse().join('')
			},
			num1: {
				get(){
					return this.num + 1
				},
				set(val){
					this.num = val
				}
			}
		},
		methods: {
			doOnce(){
				console.log("执行一次")
				for (let index in this.ary) {
					console.log(this.ary[index].id)
				}
			},
			getText(e){
				this.text = e.target.innerHTML
			},
			show(){
				console.log("span")
			},
			showp(){
				console.log("ppp")
			},
			showdiv(){
				console.log("div")
			},
			stopdefault(){
				console.log(121)
			},
			down(e){
				if (e.keyCode == 13) {
					console.log("您按下了13")
				}
			},
			down1(){
				alert(11)
			},
			down2(){
				console.log("自定义键盘事件OK")
			},
			getuserByUid(uid){
				let url = 'https://api.github.com/users/' + uid;
				axios.get(url).then(res=> {
					this.avatar = res.data.avatar_url;
					console.log(res.data)
				})
			},
			changeComputed(){
				this.num1 = 12
			},
			testref(e){
				console.log(this.$data.num)
				this.$refs.hello.style.background = 'red'
			},
			doadd(){
//				this.users.age = 12
//				this.$set(this.users,'age',20)    //实例添加
//				Vue.set(this.users,'age',30)        //全局方法添加

				if (this.users.age) {
					this.users.age++
				} else {
					this.$set(this.users, 'age', 20)
				}
			},
			dodelete(){
				if (this.users.age) {
					this.$delete(this.users, 'age');
					Vue.delete(this.users, 'age'); //全局方法
				} else {
					console.log('this.users.age不存在')
				}
			},
			changedata(){
				this.msg = 'vuevue'
			},
			beforeenter(){
				console.log('动画进去之前')
			},
			enter(){
				console.log('动画进入')
			},
			afterenter(){
				console.log('动画进入之后')
			},
			beforeleave(){
				console.log('动画离开之前')
			},
			leave(){
				console.log('动画离开')
			},
			afterleave(){
				console.log('动画离开之后')
			},
			getdata(childmsg){
				alert(childmsg)
			},
			getH7D(childaa){
				alert(childaa)
			},
			getH9d(number){
				this.number000 = number
				console.log(this.number000)
			}
		},
		components: {
			hello: hello,
			hello2: {
				template: '<h4>{{msg}}</h4>',
				data(){
					return {
						msg: '局部组件'
					}
				}
			},
			hello3: {
				template: '<h4>hello3组件{{x}}</h4>',
				data(){
					return {
						x: Math.random()
					}
				}
			},
			world: {
				template: '<h4>world组件{{y}}</h4>',
				data(){
					return {
						y: Math.random()
					}
				}
			},
			hello4: {
				template: '<div>{{message}}<input v-model="message"></div>',
				data(){
					return {
						name: 'jack',
						age: 12,
						users: {
							name: 'tom',
							age: 14
						}
					}
				},
				props:['message']
//				props:{message:String}  可以是数组也可以是对象
			},
			hello5:{
				template:'<div>{{users.name}}===={{users.id}}</div>',
				props:{
					users:{
						type:Object,
						default(){
							return {name: 'lily', id: 12}
						}
					}
				}
			},
			hello6:{
				template:'<div><button @click="send">将子组件数据发送给父组件</button></div>',
				data(){
					return{
						childMsg:'vue is good'
					}
				},
				methods:{
					send(){
						this.$emit('e-hello6',this.childMsg)
					}
				}
			},
			hello7:{
				template:'<div><button @click="sendP">向父组件发送数据</button></div>',
				data(){
					return{
						childaa:{
							name:'lucy',
							age:20
						}
					}
				},
				methods:{
					sendP(){
						this.$emit('e-hello7',this.childaa)
					}
				}
			},
			//单向数据流默认情况下父组件数据改变子组件也会改变，默认子组件不会改变父组件数据，但可以同伙.sync和this.$emit('update:Ghello8','aaaaaaaaaaaaa')方法改变
			hello8:{
				template:'<div><button @click="sentPP">子组件改变父组件数据</button>{{Ghello8}}</div>',
				props:['Ghello8','user'],
				methods:{
					sentPP(){
						this.$emit('update:Ghello8','aaaaaaaaaaaaa')
					}
//					send2(){
//						this.user.name = 'lucy'   //因为对象是引用类型
//					}
				}
			},
			//非父子组件间数据传递
			hello9:{
				template:'<div><button @click="senddd">传递数据到父组件然后到非父子组件</button>{{number}}</div>',
				data(){
					return{
						number:120
					}
				},
				methods:{
					senddd(){
						this.$emit('e-hello9',this.number)
					}
				}
			},
			hello10:{
				template:'<div>获取的非父子组件的数据{{number000}}</div>',
				props:['number000']
			},
			hello11:{
				template:'<div><slot name="s2"></slot>aaaaaaaaaa<slot name="s1"></slot></div>'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	span {
		border: 1px solid gray;
	}

	img {
		width: 500px;
		height: 300px;
	}

	.aaa {
		display: inline-block;
		width: 50px;
		height: 50px;
		background: cornflowerblue;
	}

	.donghua {
		width: 200px;
		height: 200px;
		background: red;
	}

	.fade-enter-active, .fade-leave-active {
		transition: all 3s ease
	}

	.fade-enter-active {
		opacity: 1;
		width: 200px;
		height: 200px;
	}

	.fade-leave-active {
		opacity: 0;
		width: 200px;
		height: 0px;
	}

	.fade-enter {
		opacity: 0;
		width: 200px;
		height: 100px;
	}
</style>
