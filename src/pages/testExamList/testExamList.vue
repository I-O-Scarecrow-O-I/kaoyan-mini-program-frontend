<template>
	<view class="uni-padding-wrap">
	    <view class="list">
	      <view ><text>考试列表</text></view>
	      <block v-for="(item,index) in list" :key="index">
	        <view class="listm " @click="getExercise(item.id)">
	          <image class="listmpic " src="/static/c11.png" mode="widthFix"></image>
	          <view class="listmr">
	            <view >{{item.name}}</view>
	            <view >{{"考试时长："+item.time+"分钟"}}</view>
	            <view ><text ><button>点击考试</button></text></view>
	          </view>
	        </view>
	      </block>
	    </view>
	  </view>
</template>

<script scoped>
	export default {
		data() {
			return {
				list:[]
			};
		},
		onLoad() {
			this.getList()
		},
		methods : {
			async getList() {
				const {data: res}= await uni.$http.get('exampaper/list?page=1&limit=99')
				if(res.code != 0) return uni.$showMsg
				console.log(res)
				this.list = res.data.list
			},
			getExercise(id) {
				var a = '/pages/examExercise/examExercise'
				if(id == 2) a = a + '_net'
				else if(id == 3) a = a + '_jz'
				else if(id == 4) a = a + '_os'
				uni.navigateTo({
					url: a
				})
			}
		}
	}
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
	  width: 460rpx;
	  display: inline-block
	}
</style>
