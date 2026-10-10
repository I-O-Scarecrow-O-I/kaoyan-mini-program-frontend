<template>
	<view v-if="loginDone">
		<view class="uni-padding-wrap">
			<view class="list">
				<view class="listm " @click="goToMisses">
					<image class="listmpic " src="/static/c10.png" mode="widthFix"></image>
					<view class="listmr">
						<view>我的错题</view>
					</view>
				</view>
			</view>
		</view>
		<button class="btn-next" type="warn" @click="loginOut">退出登录</button>
	</view>
	<view class="content" v-else-if="!loginDone">
		<view class="box"
			style="padding: 60rpx 120rpx 100rpx;box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);border-color: #ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:90%;border-style:solid;height:auto;margin:-310rpx 5% 0">
			<view class="logo"
				style="padding:0;box-shadow:0 0px 0px rgba(0,0,0,0);margin:0 0 16rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
				<image
					style="padding:0;box-shadow:0 0 0px #59f43e;margin:0 auto 40rpx;border-color:#ccc;border-radius:40rpx;border-width:0;width:160rpx;border-style:solid;is-show:true;height:160rpx"
					src="http://codegen.caihongy.cn/20220211/5d658f9d5a3949b4ad49aed902c58cfa.jfif" mode="aspectFill"
					class=" "></image>
			</view>
			<view class="uni-form-item uni-column  "
				style="padding:0;box-shadow:0 0px 0px rgba(0,0,0,0);margin:0 0 16rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
				<input class="uni-input "
					style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx"
					type="text" placeholder="请输入账号" v-model="username" />
			</view>
			<view class="uni-form-item uni-column  "
				style="padding:0;box-shadow:0 0px 0px rgba(0,0,0,0);margin:0 0 16rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
				<input class="uni-input"
					style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx"
					type="password" placeholder="请输入密码" v-model="password" />
			</view>
			<button class="btn-submit  "
				style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:#ccc;background-color:#C00000;border-radius:8rpx;color:rgba(255, 255, 255, 1);border-width:0;width:100%;font-size:32rpx;border-style:solid;height:88rpx"
				type="primary" @click="login()">登录</button>

			<button class="btn-submit  "
				style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:5px 0 0 0;border-color:#ccc;background-color:#C00000;border-radius:8rpx;color:rgba(255, 255, 255, 1);border-width:0;width:100%;font-size:32rpx;border-style:solid;height:88rpx"
				type="primary" @click="fastLogin()">快捷登录</button>
			<view class="links "
				style="padding:0;box-shadow:0 0px 0px rgba(0,0,0,0);margin:0 0 16rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
				<view class="link-highlight  "
					style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:10rpx auto;border-color:#ccc;background-color:rgba(0, 0, 0, 0);color:rgba(65, 65, 65, 1);text-align:center;border-radius:0;border-width:0;width:100%;line-height:36rpx;font-size:24rpx;border-style:solid"
					@click="register()">注册</view>
				<view
					style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:#ccc;background-color:rgba(0,0,0,0);color:rgba(57, 57, 57, 1);text-align:right;border-radius:0;border-width:0;width:100%;line-height:36rpx;font-size:24rpx;border-style:solid"
					@click="forget()">忘记密码？</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				loginDone: false
			};
		},
		methods: {
			goToMisses() {
				wx.navigateTo({
					url: '/pages/misses/misses'
				});
			},
			async login() {
				if (this.username == '' || this.password == '') {
					return uni.showToast({
						title: "请将信息填写完整",
						duration: 1500,
						icon: 'none'
					})
				}
				await uni.$http.get('students/login?username=' + this.username + '&password=' + this.password).then(
					res => {
						if (res.data.code != 0) return uni.showToast({
							title: "账号或密码不正确",
							duration: 1500,
							icon: 'none'
						})
						this.loginDone = true
						uni.setStorageSync('Token', res.data.token)
					})

			},
			loginOut() {
				this.loginDone = false;
				this.username = '';
				this.password = '';
			},
			fastLogin() {
				// 获取临时登录凭证code。
				var that = this
				uni.login({
					provider: 'weixin',
					success(res) {
						// 调用后端接口，传入code
						uni.$http.post('students/fastLogin', {
								code: res.code
							})
							.then(res => {

								//失败
								if (res.data.code != 0) {
									return uni.showToast({
										title: "快捷登录失败",
										duration: 1500,
										icon: 'none'
									})
								}
								// 登录成功后的逻辑处理
								that.loginDone = true
								uni.setStorageSync('Token', res.data.token)
							})
					}
				})
			},
			register() {
				wx.navigateTo({
					url: '/pages/register/register'
				});
			},
			forget() {
				wx.navigateTo({
					url: '/pages/forget/forget'
				});
			}
		}
	};
</script>

<style scoped>
	.btn-submit {
		height: auto !important;
		line-height: 88rpx
	}

	.content {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		height: calc(120vh - 44px);
		box-sizing: border-box
	}

	.logo {
		text-align: center
	}

	.logo image {
		height: 200rpx;
		width: 200rpx;
		margin: 0 0 60rpx
	}

	.uni-form-item {
		margin-bottom: 40rpx;
		padding: 0
	}

	.uni-form-item .uni-input {
		font-size: 30rpx;
		padding: 7px 0
	}

	button[type="primary"] {
		background-color: #b49950;
		border-radius: 0;
		font-size: 34rpx;
		margin-top: 60rpx
	}

	.links {
		margin-top: 40rpx;
		font-size: 26rpx;
		color: #999
	}

	.links view {
		display: inline-block;
		vertical-align: top;
		margin: 0 10rpx
	}

	.links .link-highlight {
		margin: 0;
		color: #b49950
	}

	view {
		font-family: "Microsoft YaHe";
		font-size: 30rpx
	}

	page {
		background: #ededed
	}

	.header {
		background: #f39800;
		padding: 15rpx 20rpx 255rpx;
		position: relative
	}

	.ssbox {
		background: hsla(0, 0%, 100%, .35);
		width: 530rpx;
		border-radius: 60rpx;
		padding: 10rpx 15rpx;
		box-sizing: border-box
	}

	.ss_input {
		border: none;
		width: 450rpx;
		font-size: 30rpx;
		color: #fff;
		background: none;
		height: 45rpx;
		line-break: 45rpx
	}

	.headerb {
		position: absolute;
		left: 0;
		top: 60rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx
	}

	.headerb image {
		width: 710rpx;
		box-shadow: 0 10rpx 10px rgba(0, 0, 0, .3);
		border-radius: 40rpx;
		position: relative;
		z-index: 10
	}

	.notice {
		position: relative;
		z-index: 5;
		padding: 0 50rpx
	}

	.noticem {
		background: #fff;
		padding: 55rpx 30rpx 15rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10px rgba(0, 0, 0, .3);
		margin-top: -45rpx
	}

	.noticer {
		width: 480rpx;
		height: 50rpx
	}

	.noticer .swiper-item {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx
	}

	.list {
		padding: 50rpx 20rpx 20rpx
	}

	.listm {
		background: #fff;
		border-radius: 15rpx;
		box-shadow: 0 0 10px rgba(0, 0, 0, .3);
		margin-bottom: 20rpx;
		padding: 30rpx
	}

	.listmpic {
		border-radius: 10rpx;
		width: 166rpx
	}

	.listmr {
		width: 300rpx;
		display: inline-block;
		position: absolute;
		margin-top: 30px;
	}
</style>