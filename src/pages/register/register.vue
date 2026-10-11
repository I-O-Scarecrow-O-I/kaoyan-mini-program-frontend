<template>
	<view class="content ">
	  <view class="box " style="padding:60rpx 120rpx;box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);margin:0 5%;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:90%;border-style:solid;height:auto">
	    <block>
	      <view class="logo " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
	        <image style="padding:0;box-shadow:0 0 0px #59f43e;margin:0 auto;border-color:#ccc;border-radius:40rpx;border-width:0;width:160rpx;border-style:solid;url:http://codegen.caihongy.cn/20220211/2eff605617a840bcb954b9faaabcf77b.jfif;is-show:true;height:160rpx" src="http://codegen.caihongy.cn/20220211/2eff605617a840bcb954b9faaabcf77b.jfif" mode="aspectFill"></image>
	      </view>
	    </block>
	    <block >
	      <view class="uni-form-item uni-column " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
			  <input class="uni-input " style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx" type="text" name placeholder="学生学号" v-model="ruleForm.xueshengxuehao"/>
		  </view>
	    </block>
	    <block >
	      <view class="uni-form-item uni-column " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
	    	  <input class="uni-input " style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx" type="text" name placeholder="学生姓名" v-model="ruleForm.xueshengxingming"/>
	      </view>
	    </block>
	    <block >
	      <view class="uni-form-item uni-column " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
	    	  <input class="uni-input " style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx" type="text" name placeholder="密码" v-model="ruleForm.mima"/>
	      </view>
	    </block>
	    <block >
	      <view class="uni-form-item uni-column " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
	    	  <input class="uni-input " style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx" type="text" name placeholder="确认密码" v-model="password"/>
	      </view>
	    </block>
	    <block >
	      <view class="uni-form-item uni-column " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
	        <picker mode="selector" :value="xueshengxingbieIndex" :range="xueshengxingbieOptions" @change="bindPickerChange">
	          <view class="uni-input " style="padding:0 20rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:rgba(255, 255, 255, 1);color:rgba(135, 133, 133, 1);text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;line-height:80rpx;font-size:28rpx;border-style:solid">
			  {{ruleForm.xingbie?ruleForm.xingbie:"请选择性别"}}
			  </view>
	        </picker>
	      </view>
	    </block>
	    <block >
	      <view class="uni-form-item uni-column " style="padding:0;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0 0 24rpx;border-color:#ccc;background-color:rgba(255, 255, 255, 0);border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
	    	  <input class="uni-input " style="padding:0 24rpx;box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:rgba(229, 229, 229, 1);background-color:#fff;color:#333;text-align:left;border-radius:16rpx;border-width:4rpx;width:100%;font-size:28rpx;border-style:solid;height:88rpx" type="text" name placeholder="联系电话" v-model="ruleForm.lianxidianhua"/>
	      </view>
	    </block>
		<button class="btn-submit " style="padding:0box-shadow:0 2rpx 12rpx rgba(0,0,0,0);margin:0;border-color:#ccc;background-color:#C00000;border-radius:8rpx;color:rgba(255, 255, 255, 1);border-width:0;width:100%;font-size:32rpx;border-style:solid;height:88rpx" type="primary" @click="register">注册</button>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xueshengxingbieIndex : -1,
				xueshengxingbieOptions : ['男','女'],
				password:'',
				ruleForm : {
					xueshengxuehao:'',
					xueshengxingming:'',
					mima:'',
					xingbie:'',
					lianxidianhua:''
	
				}
			}
		},
		methods: {
			register() {
				if(this.ruleForm.xueshengxuehao == '' || this.ruleForm.xueshengxingming == '' 
				|| this.ruleForm.mima == '' || this.ruleForm.xingbie == '' || this.ruleForm.lianxidianhua == '') {
					return uni.showToast({
								title:"请将信息填写完整",
								duration: 1500,
								icon:'none'
							})
				}
				if(this.ruleForm.mima != this.password) {
					return uni.showToast({
								title:"两次密码不相同",
								duration: 1500,
								icon:'none'
							})
				}
				uni.$http.post('students/register', this.ruleForm).then(res => {
					if(res.data.msg == '注册用户已存在') {
						return uni.showToast({
									title:"注册用户已存在",
									duration: 1500,
									icon:'none'
								})
					}
				              uni.showModal({
				              	title : '注册成功',
								showCancel:false,
				              	success: function (res) {
				              			if (res.confirm) {
				              				uni.switchTab({
				              					url: '/pages/My/My'
				              				})
				              			}
				              		}
				              
				              })
				          }, err => {
				              uni.$showMsg()
				        });
			},
			bindPickerChange(e){
			     this.xueshengxingbieIndex = e.detail;
				 this.ruleForm.xingbie = this.xueshengxingbieOptions[e.detail.value]
			}
		}
	}
</script>

<style scoped>
	.btn-submit {
	  height: auto !important;
	  line-height: 88rpx
	}
	
	.content {
	  height: calc(100vh - 44px);
	  overflow: auto
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
	
	button[type="primary"]{
	  background-color: #b49950;
	  border-radius: 0;
	  font-size: 34rpx;
	  margin-top: 60rpx
	}
	
	.links {
	  text-align: center;
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
	  color: #b49950
	}
	
	.picker-select-input {
	  line-height: 88rpx
	}
</style>
