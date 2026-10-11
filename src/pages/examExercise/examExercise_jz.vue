<template>
	<view>
		<view class="header-container">
		  <view class="left-container " @click="finish">
		    <image class="icon " src="../../static/c10.png" ></image><text class="">交卷</text>
		  </view>
		  <view class="center-container ">{{'倒计时：'+countdown+''}}</view>
		  <view class="right-container ">{{'题目： '+currentQuestionIndex +"/"+questions.length+''}}</view>
		</view>
		<view class="exam-container ">
		  <view class="title-container ">
				  <text class="title " >{{''+currentQuestion.questionname+''}}</text>
		  </view>
		  <view class="answer-container ">
					<radio-group >
						<block v-for="(option, index) in options" :key="index">
						    <view class="answer-item ">
								<radio @click="selectOption(option)" :checked="option.text == currentOption"></radio>
								<text class="text ">{{option.text}}</text>
						    </view>
						</block>
					</radio-group>
					<block v-if="!completed">
						<button class="btn-submit " type="primary" @click="submit()">提交答案</button>
					</block>
					<block v-if="completed&&currentQuestionIndex<=questions.length">
						<button class="btn-next " type="warn" @click="nextQuestion()">下一题
						</button>
						<button @click="toggleFavorite(currentQuestion)">
							{{ isFavorite(currentQuestion) ? '取消收藏' : '收藏' }}
						</button>
					</block>
		  </view>
		  <block v-if="completed&&currentQuestionIndex<=questions.length">
		    <view class="tip-container ">
		      <view class="par ">答题结果：
					<block v-if="currentQuestion.answer==answer">
						<text class="text-blue ">正确</text>
					</block>
		      <block v-if="currentQuestion.answer!=answer">
						  <text class="text-red ">错误</text>
					</block>
		      </view>
		      <view class="par ">{{'本题答案：'+currentQuestion.answer+''}}</view>
		      <view class="par ">{{'您的答案是：'+answer+''}}</view>
		      <view class="par ">{{'题目分析：'+currentQuestion.analysis+''}}</view>
		    </view>
		  </block>
		</view>
		<ul> 
			<li v-for="(question, index) in favorites" :key="index">
				{{ question.question }}
				<button @click="removeFavorite(question)">
					取消收藏
				</button>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:[],
				questions: [],
				currentOption:'',
				answer:'',
				score: 0,
				completed: false,
				favorites: [],
				errors: [],
				count: 3600,
				intervalId:null,
				currentQuestionIndex : 1
			};
		},
		computed: {
			countdown() {
				var e = this.count
				return parseInt(e / 60) + "分钟" + parseInt(60 * (parseFloat(e / 60) - parseInt(e / 60))) + "秒" 
			},
			currentQuestion() {
				return this.questions[this.currentQuestionIndex - 1];
			}
		},
		onLoad() {
			this.getQuestions()
			this.startCountdown()
		},
		methods: {
			async getQuestions() {
				//paperid为1，2，3，4分别对应数据结构,计网，计组，系统
				const {data: res}= await uni.$http.get('examquestion/list?page=1&limit=99&paperid=3')
				
				if(res.code != 0) return uni.$showMsg
				this.questions = res.data.list
				this.options = JSON.parse(this.questions[this.currentQuestionIndex - 1].options)
			},
			selectOption(option) {
				this.answer = option.code
				this.currentOption = option.text

			},
			toggleFavorite(question) {
				question.isFavorited = !question.isFavorited;
				if (question.isFavorited) {
					this.favorites.push(question);
				} else {
					const index = this.favorites.findIndex(item => item.question === question.question);
					if (index !== -1) {
						this.favorites.splice(index, 1);
					}
				}
			},
			isFavorite(question) {
				return question.isFavorited;
			},
			removeFavorite(question) {
				question.isFavorited = false;
				const index = this.favorites.findIndex(item => item.question === question.question);
				if (index !== -1) {
					this.favorites.splice(index, 1);
				}
			},
			removeErrored(question) {
				question.isErrored = false;
				const index = this.errors.findIndex(item => item.question === question.question);
				if (index !== -1) {
					this.errors.splice(index, 1);
				}
			},
			//点击下一道题时的方法
			nextQuestion() {
				if(this.currentQuestionIndex == this.questions.length) {
					this.clearCountdown()
					return uni.showModal({
						title : '答题结束',
						content: '本次考试成绩为' + this.score,
						success: function (res) {
								if (res.confirm) {
									uni.switchTab({
										url: '/pages/exercise/exercise'
									})
								}
							}
				
					})
				}
				this.currentQuestionIndex ++
				this.options = JSON.parse(this.questions[this.currentQuestionIndex - 1].options)
				this.completed = false
			},
			startCountdown() {
				// 使用原生的 setInterval 函数启动计时器，并将计时器 ID 存储到 intervalId 属性中
				this.intervalId = setInterval(() => {
						this.count--
						if (this.count === 0) {
							this.clearCountdown() // 倒计时结束时清除计时器
							uni.showModal({
								title : '答题结束',
								content: '本次考试成绩为' + this.score,
								success: function (res) {
										if (res.confirm) {
											uni.switchTab({
												url: '/pages/exercise/exercise'
											})
										}
									}
							
							})
						}
				}, 1000)
			},
			clearCountdown() {
				// 清除计时器
				clearInterval(this.intervalId);
			},
			//做完一道题
			submit() {
				this.completed = true
				if(this.currentQuestion.answer==this.answer) this.score += this.currentQuestion.score
			},
			//提前交卷
			finish() {
				var score = this.score
				var that = this
				uni.showModal({
						title : '提示',
						content: '确定离开考试？',
						success: function (res) {
							if (res.confirm) {
								that.clearCountdown()
								uni.showModal({
									title : '答题结束',
									content: '本次考试成绩为' + score,
									showCancel:false,
									success: function (res) {
										if (res.confirm) {
										uni.switchTab({
										url: '/pages/exercise/exercise'
										})
									}
								}
									
							})
						}
					}
				
				})
			}
		}
	};
</script>

<style scoped>
.header-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  background: #fff;
  border-bottom: 1rpx solid #eee;
  border-top: 1rpx solid #eee;
  padding: 10rpx
}

.header-container .left-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin: 10rpx
}

.header-container .left-container .icon {
  margin-right: 10rpx;
  width: 40rpx;
  height: 40rpx
}

.header-container .center-container {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center
}

.header-container .right-container {
  margin: 10rpx
}

.exam-container {
  background: #fff;
  margin: 30rpx;
  border-radius: 20rpx;
  padding: 20rpx
}

.exam-container .title-container {
  padding: 20rpx
}

.exam-container .title-container .type {
  background: #eee;
  padding: 10rpx;
  border-radius: 10rpx
}

.exam-container .title-container .title {
  margin-left: 20rpx
}

.exam-container .answer-item {
  margin: 20rpx
}

.exam-container .answer-item .text {
  margin-left: 20rpx
}

.exam-container .tiankong-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin: 20rpx
}

.exam-container .tiankong-container .answer {
  border: 1rpx solid #eee;
  height: 60rpx;
  margin: 0 20rpx
}

.exam-container .btn-submit {
  height: 60rpx;
  font-size: 30rpx;
  line-height: 60rpx;
  margin-top: 60rpx;
  border-radius: 50rpx
}

.exam-container .btn-next {
  height: 60rpx;
  font-size: 30rpx;
  line-height: 60rpx;
  margin-top: 60rpx;
  border-radius: 50rpx
}

.tip-container {
  margin-top: 50rpx;
  border-top: 1rpx solid #eee;
  padding: 20rpx
}

.tip-container .par {
  margin-bottom: 20rpx
}
</style>
