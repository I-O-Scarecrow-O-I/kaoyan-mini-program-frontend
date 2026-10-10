<template>
  <view class="container">
    <!-- 轮播图 -->
    <swiper autoplay indicator-dots>
      <swiper-item v-for="(item, index) in list" :key="index" @click="gotoInfoDetail(index)">
        <image :src="'http://localhost:8081/' + item.value" class="carousel-image" mode="aspectFit"></image>
      </swiper-item>
    </swiper>
    
    <!-- 咨询文章列表 -->
    <view class="article-list">
      <view v-for="(article, index) in articles" :key="index" class="article-item" @tap="goToArticleDetail(article.url)">
        <image :src="'http://localhost:8081/' + article.value" class="article-cover" mode="aspectFill"></image>
        <view class="article-info">
          <view class="article-title">{{article.title}}</view>
          <view class="article-summary">{{article.summary}}</view>
        </view> 
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		list:[],
		articles:[]
	}
  },
  onLoad() {
  	this.getList()
	this.getArticles()
  },
  
  methods: {
    goToArticleDetail(a) {
		var url = a
      // 点击跳转到文章详情页面，可以根据实际情况进行实现
	  uni.navigateTo({
	  	url:'/pages/webView/webView?url='+url
	  })
    },
	async getArticles() {
		const {data: res}= await uni.$http.get('book/list')
		if(res.code != 0) return uni.$showMsg
		console.log(res)
		this.articles= res.data.list
	},
	async getList() {
		const {data: res}= await uni.$http.get('info/list')
		if(res.code != 0) return uni.$showMsg
		console.log(res)
		this.list = res.data.list
	},
	gotoInfoDetail(index){
		var url = ''
		if(index == 0) url = 'https://yz.chsi.com.cn/'
		else if(index == 1) url = 'https://yz.chsi.com.cn/kyzx/zt/kyfs2024.shtml'
		else url = 'https://yz.chsi.com.cn/kyzx/kp/202403/20240312/2293269492.html'
		uni.navigateTo({
			url:'/pages/webView/webView?url='+url
		})
	}
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.carousel-image {
  width: 100%;
  height: 150px;
  border-radius: 10px;
}

.article-list {
  margin-top: 40px;
}

.article-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.article-cover {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
}

.article-info {
  flex: 1;
}

.article-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.article-summary {
  color: #666;
}
</style>
