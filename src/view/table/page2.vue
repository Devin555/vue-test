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
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	export default {
		name: 'HelloWorld',
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
				name: 'jack'
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
					var disX = e.clientX-el.offsetLeft;
					var disY = e.clientY-el.offsetTop;
					console.log(disX+'--'+disY)
					document.onmousemove = function (e) {
						el.style.left = 60 + 'px'
					}
				};
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
</style>
