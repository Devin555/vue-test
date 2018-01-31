<template>
	<div id="login">
		<div class="contain_login">
			<el-form status-icon ref="ruleForm2" label-width="120px"
			         class="demo-ruleForm">
				<el-form-item label="Username" prop="pass">
					<el-input type="text" v-model="username" auto-complete="off" @keyup.enter.native="submit"></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="pass">
					<el-input type="password" v-model="password" auto-complete="off" @keyup.enter.native="submit"></el-input>
				</el-form-item>
				<el-form-item>
					<span>账号：F1333553 密码：Foxconn123!!</span>
					<el-button type="primary" @click="submitForm()">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import AC from '../../API/url'
	let Base64 = require('js-base64').Base64;
	let Sha512 = require('js-sha512');
	export default {
		name: 'login',
		data () {
			return {
				username: '',
				password: '',
				sha512Key: ''
			}
		},
		methods: {
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
			submitForm() {
				this.sha512key();
				axios.post(AC.login, {
					"username": this.username,
					"password": Base64.encode(this.password),
					"PID": 17072501
				}, {
					"Content-Type": 'application/json',
					"X-REQUESTED-WITH": this.sha512Key
				}).then(res => {
					let token = "TOKEN=" + res.data.TOKEN + ";PID=17072501";
					axios.get(AC.checkToken, {
						headers: {
							"X-CSRFToken": token
						}
					}).then(res => {
						if(res.data.status == "True"){
						window.localStorage.setItem("userInfo", JSON.stringify({info: res.data, token: token}));
							this.$router.push({path: '/main/page1'})
						}
					}).catch(err => {
						console.log(err);
					});
				}).catch(err => {
					console.log(err);
				});
			},
			submit(){
				this.submitForm()
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	#login {
		height: 100%;
		background: url("../../assets/login_bg.jpg") no-repeat;
		background-size: cover;
	}

	.contain_login {
		background: #fff;
		border-radius: 3px;
		padding: 60px 80px 0 40px;
		width: 480px;
		height: 260px;
		position: absolute;
		top: 50%;
		margin-top: -180px;
		left: 50%;
		margin-left: -265px;
	}

	.contain_login .el-form-item__label {
		text-align: center;
		font-weight: bold;
	}
</style>
