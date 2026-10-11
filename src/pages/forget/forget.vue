<template>
	<view class="content">
	  <view class="box" style="padding:48rpx 120rpx;box-shadow:0 0 0px #59f43e;margin:0;background-color:rgba(255, 255, 255, 0);border-color:#ccc;border-radius:8rpx;border-width:0;width:100%;border-style:solid;height:auto">
	    <view class="forget-input forget-margin-b" style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:#fff;border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
			<input style="padding:0 24rpx;box-shadow:0 0 16rpx rgba(0,0,0,0);margin:0;border-color:#ccc;background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx" type="text" placeholder="请输入您的账号" v-model="username"/>
		</view>
		<button class="landing" style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:#ccc;background-color:#C00000;border-radius:8rpx;color:rgba(255, 255, 255, 1);border-width:2rpx;width:100%;font-size:32rpx;border-style:solid;height:88rpx" type="primary" @click="reset()">重置密码</button>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:''
			}
		},
		methods: {
			async reset() {
				if(this.username == '' || this.password == '') {
					return uni.showToast({
								title:"请将信息填写完整",
								duration: 1500,
								icon:'none'
							})
				}
				const {data: res}= await uni.$http.get('students/resetPass?username='+this.username)
				if(res.msg == '账号不存在') {
					return uni.showToast({
								title:"账号不存在",
								duration: 1500,
								icon:'none'
							})
				}
				uni.showModal({
					title : '密码已重置为：123456',
					showCancel:false,
					success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/My/My'
								})
							}
						}
				
				})
			}
		}
	}
</script>

<style>
	.content {
	  height: calc(100vh - 44px);
	  overflow: auto
	}
	
	
	.verify-left {
	  width: calc(100% - 260rpx)
	}
	
	.verify-right {
	  padding-left: 20rpx
	}
	
	.verify-btn {
	  height: 80rpx;
	  line-height: 80rpx;
	  font-size: 28rpx;
	  width: 240rpx;
	  border-radius: 8rpx;
	  background: -webkit-linear-gradient(left, #ff978d, #ffbb69);
	  background: linear-gradient(left, #ff978d, #ffbb69)
	}
	
	.verify-left,
	.verify-right {
	  float: left
	}
	
	.landing {
	  height: auto !important;
	  line-height: 88rpx;
	  border-radius: 44rpx;
	  font-size: 32rpx
	}
	
	.forget-btn {
	  padding: 10rpx 20rpx;
	  margin-top: 380rpx
	}
	
	.forget-input input {
	  background: #fff;
	  font-size: 28rpx;
	  padding: 10rpx 25rpx;
	  height: 62rpx;
	  line-height: 62rpx;
	  border-radius: 8rpx
	}
	
	.forget-margin-b {
	  margin-bottom: 25rpx
	}
	
	.forget-input {
	  padding: 10rpx 20rpx;
	  overflow: auto
	}
	
	.forget-card {
	  background: #fff;
	  border-radius: 12rpx;
	  padding: 60rpx 25rpx;
	  box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, .12);
	  position: relative;
	  margin-top: 120rpx
	}
	
	.forget-bg {
	  height: 260rpx;
	  padding: 25rpx
	}
</style>
