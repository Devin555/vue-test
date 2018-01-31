<template>
	<div id="main">
		<header>
			<span class="signout" @click="signout">{{$t('message.signOut')}}</span>
			<span :class="{active:active0}" @click="switchLang" @mouseenter="showPage1(0)" @mouseleave="hidePage1(0)">{{$t('message.language')}}</span>
			<span :class="{active:active1}" @mouseenter="showPage1(1)"
			      @mouseleave="hidePage1(1)">{{$t('message.system')}}</span>
		</header>
		<div class="table" @mouseenter="showPage1(1)" @mouseleave="hidePage1(1)" v-show="displayPage">
			<router-link to="/main/page1">系统注册</router-link>
			<router-link :to="'/main/page2?'+id">系统审核</router-link>
			<router-link to="/main/page3">系统信息更新</router-link>
		</div>
		<div class="content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import AC from '../../API/url'
	let Sha512 = require('js-sha512');
	export default {
		name: 'Main',
		data () {
			return {
				msg: 'asd',
				sha512Key: '',
				displayPage: false,
				active1: false,
				active0: false,
				lang_en: 'en',
				lang_cn: 'cn',
				id:12
			}
		},
		mounted(){
		},
		methods: {
//			加密
			sha512key(){
				let date = new Date();
				let y = date.getUTCFullYear();
				let m = date.getUTCMonth() + 1;
				let d = date.getUTCDate();
				if (m < 10) {
					m = '0' + m;
				}
				if (d < 10) {
					d = '0' + d;
				}
				let keyTime = y + "-" + m + "-" + d + "ajan@6$)c)*8fplq(&!^d6&*l@r)5o0zm%*-ak62hraklqx4e$";
				let keystr = Sha512(keyTime);
				this.sha512Key = "KEY=" + keystr + ";PID=17072501";
			},
//			退出
			signout(){
				let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
				let X_CSRFToken = userInfo.token;
				let headersData = {
					'Content-Type': 'application/json',
					"X-CSRFToken": X_CSRFToken,
					"X-REQUESTED-WITH": this.sha512Key,
					"Accept-Language": "zh-hans"
				};
				axios.get(AC.logout, {
					headers: headersData
				}).then(res => {
					if (res.data.status == "True") {
						window.localStorage.setItem("userInfo", "");
						this.$router.push({path: '/login'})
					}
				}).catch(err => {
					console.log(err);
				});
			},
//			中英切换
			switchLang()  {
				if (this.$i18n.locale == 'en') {
					this.$i18n.locale = this.lang_cn
				} else {
					this.$i18n.locale = this.lang_en
				}
			},
//			鼠标进入导航栏显示下拉导航
			showPage1(index){
				if (index == 0) {
					this.active0 = true
				} else if (index == 1) {
					this.displayPage = true;
					this.active1 = true
				}
			},
			hidePage1(index){
				if (index == 0) {
					this.active0 = false
				} else if (index == 1) {
					this.displayPage = false;
					this.active1 = false
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#main {
		height: 100%;
		overflow: auto;
	}

	header {
		height: 40px;
		background: #373d41;
		color: #fff;
	}

	header span {
		display: inline-block;
		line-height: 40px;
		float: right;
		width: 100px;
		cursor: pointer;
		font-size: 14px;
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.signout:hover {
		color: #66ccff;
	}

	.active {
		background: #272b2f;
	}

	.table {
		background: #272b2f;
		width: 150px;
		position: fixed;
		z-index: 9999;
		top: 40px;
		right: 200px;
		text-align: center;
		padding: 10px 0 10px;
	}

	a {
		color: #fff !important;
		display: inline-block;
		text-decoration: none;
		width: 150px;
		line-height: 30px;
		font-size: 13px;
	}

	a:hover {
		color: #66ccff !important;
	}

	.content {
		width: 100%;
	}
</style>
