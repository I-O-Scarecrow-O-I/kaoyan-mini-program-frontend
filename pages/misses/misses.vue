<template>
  <view class="container">
    <view>
      <!-- 其他练习内容 -->
    </view>
    <view>
		<view class="uni-padding-wrap">
			<view class="list">
				<view class="listm " @click="goToMisses_ds">
					<image class="listmpic " src="/static/c10.png" mode="widthFix"></image>
					<view class="listmr">
						<view>数据结构</view>
					</view>
				</view>
				<view class="listm " @click="goToMisses_jz">
					<image class="listmpic " src="/static/c10.png" mode="widthFix"></image>
					<view class="listmr">
						<view>计算机组成原理</view>
					</view>
				</view>
				<view class="listm " @click="goToMisses_os">
					<image class="listmpic " src="/static/c10.png" mode="widthFix"></image>
					<view class="listmr">
						<view>操作系统</view>
					</view>
				</view>
				<view class="listm " @click="goToMisses_net">
					<image class="listmpic " src="/static/c10.png" mode="widthFix"></image>
					<view class="listmr">
						<view>计算机网络</view>
					</view>
				</view>
			</view>
		</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goToMisses_ds() {
		console.log()
      wx.navigateTo({
        url: '/pages/misses/misses_ds'
      });
    },
	goToMisses_jz() {
		console.log()
	  wx.navigateTo({
	    url: '/pages/misses/misses_jz' 
	  });
	},
	goToMisses_os() {
		console.log()
	  wx.navigateTo({
	    url: '/pages/misses/misses_os' 
	  });
	},
	goToMisses_net() {
		console.log()
	  wx.navigateTo({
	    url: '/pages/misses/misses_net'
	  });
	}
  }
};
</script>

<style lang="scss">
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
