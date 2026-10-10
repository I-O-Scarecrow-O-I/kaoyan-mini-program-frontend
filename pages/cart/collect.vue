<template>
	<div>
	<view class="header-container">
			  <view class="left-container " @click="finish">
				<image class="icon " src="../../static/c10.png" ></image><text class="">交卷</text>
			  </view>
			  <view class="center-container ">{{'答题时长：'+countdown+''}}</view>
			  <view v-if="len!=-1" class="right-container ">{{'题目： '+(currentQuestionIndex+1) +"/"+ (len === -1 ? 0 : len) +''}}</view>
			  <view v-else class="right-container ">{{'题目： '+"0/0" +''}}</view>
			</view>
	<view v-if="questions.length > 0" class="exam-container ">
		<view v-if="!completed">
			<view class="title-container ">
				<view class="title ">{{ currentQuestion.question }}</view>
			</view>
			<view class="answer-container ">
				<radio-group >
					<block v-for="(option, index) in currentQuestion.options" :key="index">
					    <view class="answer-item">
					        <radio @click="selectOption(index)" :checked="selectedAnswerIndex === index"></radio>
					        <text class="text" :class="{ active: selectedAnswerIndex === index }">{{option}}</text>
					    </view>
					</block>
				</radio-group>
			</view>				
			<button class="btn-next" :type="isErrored ? 'warn' : 'primary'" @tap="nextQuestion(currentQuestion)">下一题</button>
			<button @click="toggleFavorite(currentQuestion)">
			  {{ favoritesOrNot ? '取消收藏' : '收藏' }}
			</button>
			<button class="back-button" @tap="goBack">返回</button>
			<!-- <button v-if="showSolution" class="solution-button" @tap="showSolution = false">隐藏解析</button> -->
			<button v-if="isErrored" class="Discussion-button" @tap="showDiscussion = !showDiscussion">{{ showDiscussion ? '隐藏讨论区' : '显示讨论区' }}</button>
			<view v-if="showSolution" class="tip-container ">
				<view class="par ">答题结果：
				<block>
					  <text class="text-red ">错误</text>
				</block>
				</view>
				<view class="par ">{{'本题答案：'+ String.fromCharCode(65 + currentQuestion.correctAnswerIndex) +''}}</view>
				<view class="par ">{{'您的答案是：'+ String.fromCharCode(65 + selectedAnswerIndex) +''}}</view>
				<view class="par ">{{'题目分析：'+ currentQuestion.explanation +''}}</view>
				<view style="text-align:center;box-sizing:border-box;background:#FFFFFF;box-shadow:0 0 6rpx rgba(0,0,0,.3);margin:0;border-color:#fff;background-color:#fff;border-radius:0;border-width:0;width:100%;border-style:solid;height:auto">
							<video id="myVideo" :src="videoUrl"  enable-play-gesture="true" show-fullscreen-btn="false"></video>
				</view>
				<div v-if="showDiscussion" class="discussion-area">  
					<h2>讨论区</h2>
				    <div v-if="comments.length > 0" v-for="(commentData, index) in comments" :key="index">
				        <p>{{ commentData.userId }}</p> 
				    	<p>{{ commentData.comment }}</p>
				    </div>
					<div class="discussion-input-group">
					    <textarea :class="{'textarea-focused': isFocused,'textarea-default': !isFocused }" @focus="onFocus" @blur="onBlur"
						 v-model="newDiscussionContent" placeholder="发表你的观点..."></textarea>  
					    <button @click="addDiscussion">发表讨论</button>  
					</div>  
				</div>
			</view>
		</view>
		<view v-else>
			<view class="completion">
				<view>恭喜你完成了答题！</view>
				<view>你的得分是：{{ score }}</view>
				<button class="back-button" @tap="saveErrors">保存此次错题</button>
				<button class="back-button" @tap="removeErrors">清除此次答对的错题</button>
				<button class="back-button" @tap="goBack">返回</button>
			</view>
		</view>
		
	</view>
	<view v-else>
				<view>你还没有收藏数据结构的题目</view>
				<button @click="goToAnswer()">
					点击前去答题
				</button>
			</view>
	</div>
</template>

<script>
import { questions } from '@/pages/exam/questions.js';
import { favorites } from '@/pages/exam/favorite.js';
import { errors } from '@/pages/exam/errors.js';
	export default {
		data() {
			return {
				len:-1,
				count: 0,
				questions:[],
				comments: [],
				myFavorite:[],
				rights: [],
				errors: [],
				favoritesOrNot: false, //当前题目是否已经收藏
				/*
				questions: [{
						question: '数组和链表的主要区别是什么？',
						options: ['数组在内存中是连续存储的，而链表不是', '数组具有动态大小，链表大小固定', '数组只能存储基本数据类型，链表可以存储任意类型数据', '数组访问速度比链表快'],
						correctAnswerIndex: 0,
						explanation: '数组在内存中是连续存储的，而链表不是，这意味着在数组中查找元素的速度比链表快。',
						isFavorited: false,
						isErrored: false,
						discussions: [], // 讨论区内容数组  
						myDiscussions: [] // 新讨论的输入框内容 
					}
				*/
				currentQuestionIndex: 0,
				currentQuestionID: -1, //不知道什么原因, 初始化时fetchQuestions无法修改其值 //这是因为mounted()钩子函数中并没有严格执行顺序, 需要将后续函数放入fetchQuestions的回调函数中
				currentUserID: -1, //待接入登录信息
				selectedAnswerIndex: null,
				score: 0,
				completed: false,
				showSolution: false,
				showDiscussion: true,
				isAnswerChecked: false,
				isErrored:false,
				trueorfalse: null,
				//errors:errors,
				newDiscussionContent: '',
				isFocused: false,
				discussion: {
					id: -1,
					questionId: -1,
					comment: '',
					userId: -1,//待接入登录信息
				},
				videoUrl:'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4'
			};
		},
		mounted() {
				this.getCurUserID();
		},
		computed: {
			countdown() {
				var e = this.count
				return parseInt(e / 60) + "分钟" + parseInt(60 * (parseFloat(e / 60) - parseInt(e / 60))) + "秒" 
			},
			currentQuestion() {
				return this.questions[this.currentQuestionIndex];
			}
		},
		onLoad() {
			this.startCountdown();
		},
		watch: {
		    // 监听 currentQuestionIndex 的变化，当发生变化时重新加载题目数据
		    favoritesOrNot(newIndex) {
		        this.$forceUpdate();
		    },
		},
		methods: {
			startCountdown() {
				// 使用原生的 setInterval 函数启动计时器，并将计时器 ID 存储到 intervalId 属性中
				this.intervalId = setInterval(() => {
						this.count++
				}, 1000)
			},
			clearCountdown() {
				// 清除计时器
				clearInterval(this.intervalId);
			},
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
			},
			fetchQuestions() {
				uni.request({
					//url: `http://127.0.0.1:8081/answer/questions/${this.currentQuestionIndex}`, // 替换成你的后端接口地址
					url: `http://127.0.0.1:8081/answer/questions/myFavorite/${this.currentUserID}`, 
					method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
					success: (res) => {
						this.questions = res.data;
						//this.currentQuestionID = this.questions[this.currentQuestionIndex].id; //这一步无法为currentQuestionIndex赋值
						//console.log(this.questions[this.currentQuestionIndex].id);
						//console.log(currentQuestionID);
						//this.discussion.questionId = this.currentQuestionID;
						console.log('Fetching Questions Success!');
						this.setCurrentQuestionID();
						//console.log(this.questions.options);
					},
					fail: (err) => {
						console.error('Error fetching questions:', err);
					},
				});
			},
			fetchFavoritesID(){
				uni.request({
					url: `http://127.0.0.1:8081/answer/questions/myFavoriteID/${this.currentUserID}`, // 替换成你的后端接口地址
					method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
					success: (res) => {
						console.log(this.currentUserID);//
						console.log('Fetching Favorite Success!');
						console.log(res.data);//
						this.myFavorite = res.data;
						if (this.myFavorite.includes(this.questions[this.currentQuestionIndex].id))
						{
							this.favoritesOrNot = true;
							console.log('此题已收藏');
						}
						else
						{
							this.favoritesOrNot = false;
							console.log('未收藏');
							console.log(this.myFavorite);
						}
						this.fetchComments();
					},
					fail: (err) => {
						console.error('Error fetching favorite:', err);
					},
				});
			},
			fetchComments() {
				uni.request({
					url: `http://127.0.0.1:8081/answer/comment/getComment/${this.currentQuestionID}`, // 替换成你的后端接口地址
					method: 'GET',
					success: (res) => {
						this.comments = res.data;
						console.log('Fetching Comment Success!');
						//this.currentQuestionID = this.questions[this.currentQuestionIndex].id;//初始化时这一步也无法为currentQuestionIndex赋值
						//console.log(this.questions);
						this.$forceUpdate();
					},
					fail: (err) => {
						console.error('Error fetching comments:', err);
					},
				});
			},
			setCurrentQuestionID(){
				console.log('开始setCurrent');
				this.currentQuestionID = this.questions[this.currentQuestionIndex].id;
				this.len = this.questions.length;
				this.discussion.userId = this.currentUserID;
				console.log('currentQuetionIndex = ', this.currentQuestionIndex,'currentQuestionID= ',this.currentQuestionID,'currentUserID= ',this.currentUserID);
				console.log('完成setCurrent');
				this.fetchFavoritesID();
			},
			getCurUserID()
			{
				console.log("开始设置CurUserID");
				console.log(uni.getStorageSync('username'));
				uni.$http.get('students/session?username=' + uni.getStorageSync('username')).then(res => {
					console.log(parseInt(res.data.data.id));
					if(parseInt(res.data.data.id)> 0 )
					{
						this.currentUserID=parseInt(res.data.data.id);
						console.log('ID set:');
						console.log(this.currentUserID);
						this.fetchQuestions();
					}
				});
				console.log("完成设置CurUserID");
			},
			selectOption(index) {
				this.selectedAnswerIndex = index;

			},
			toggleFavorite(question) {
			  this.favoritesOrNot = !this.favoritesOrNot;
			  if (this.favoritesOrNot) {
			    console.log('to ',this.favoritesOrNot);
				uni.request({
					url: `http://127.0.0.1:8081/answer/questions/addFavorite/${this.currentUserID}/${this.currentQuestionID}`, // 替换成你的后端接口地址
					method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
					success: (res) => {
						console.log('Adding Favorite Success! : ',res.data);
						this.myFavorite.push(this.currentQuestionID);
						this.favoritesOrNot = true;
					},
					fail: (err) => {
						console.error('Error adding favorite:', err);
					},
				});
			  } else {
			    uni.request({
			    	url: `http://127.0.0.1:8081/answer/questions/deleteFavorite/${this.currentUserID}/${this.currentQuestionID}`, // 替换成你的后端接口地址
			    	method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
			    	success: (res) => {
			    		console.log('Deleting Favorite Success! : ',res.data);
						this.myFavorite.splice(this.currentQuestionID, 1);
			    		this.favoritesOrNot = false;
			    	},
			    	fail: (err) => {
			    		console.error('Error deleting favorite:', err);
			    	},
			    });
			  }
			},
			isFavorite() {
			  return this.favoritesOrNot;
			},
			removeFavorite(question) {
			  this.favoritesOrNot = false;
			  uni.request({
					url: `http://127.0.0.1:8081/answer/questions/deleteFavorite/${this.currentUserID}/${this.currentQuestionID}`, // 替换成你的后端接口地址
					method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
					success: (res) => {
						console.log('Deleting Favorite Success! : ',res.data);
						this.favorites.splice(this.currentQuestionID, 1);
						this.favoritesOrNot = false;
					},
					fail: (err) => {
						console.error('Error deleting favorite:', err);
					},
				});
			},
			nextQuestion(question) {
				if (this.selectedAnswerIndex !== null) {
					if (this.selectedAnswerIndex === this.currentQuestion.correctAnswerIndex && this.trueorfalse ===
						null) {
						this.score++;
						this.trueorfalse=true;
						this.isErrored=false;
						// if(question.isErrored===true){
						// 	console.log('removeerror\n');
						// 	this.removeErrored(this.currentQuestionID);
						// }
						console.log('addrights\n');
						this.rights.push(this.currentQuestionID);
					} else {
						this.showSolution = true;
						this.isErrored=true;
						const index = this.errors.findIndex(item=> item ===this.currentQuestionID);
						if (index === -1) {
							console.log('adderror\n');
							this.errors.push(this.currentQuestionID);
							}
					}
					if (this.trueorfalse === true) {
						if (this.currentQuestionIndex < this.questions.length - 1 ) {
							this.selectedAnswerIndex = null;
							this.showSolution = false;
							this.currentQuestionIndex++;
							this.currentQuestionID = this.questions[this.currentQuestionIndex].id;//增加下一题修正题目真实id的赋值
							if (this.myFavorite.includes(this.questions[this.currentQuestionIndex].id))
							{
								this.favoritesOrNot = true;
							}
							else
							{
								this.favoritesOrNot = false;
							}
							console.log("Fetching next comments, currentQuestionIndex = ",this.currentQuestionIndex,"currentQuestionID = ",this.currentQuestionID);
							this.fetchComments();
						} else {
							this.showSolution = false;
							this.completed = true;
						}
						this.trueorfalse = null;
						this.isErrored=false;
						return;
					}
					this.trueorfalse=true;
				}
				else {
					wx.showToast({
						title: '请选择一个答案！',
						icon: 'none'
					});
				}
			},
			goBack() {
				wx.navigateBack();
			},
			saveErrors(){
				uni.request({
					url: `http://127.0.0.1:8081/answer/questions/addErrors/${this.currentUserID}/${this.errors}`, // 替换成你的后端接口地址
					method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
					success: (res) => {
						console.log('Adding Errors Success! : ',res.data);
					},
					fail: (err) => {
						console.error('Error adding Errors:', err);
					}
				});
			},
			removeErrors(){
				uni.request({
					url: `http://127.0.0.1:8081/answer/questions/deleteErrors/${this.currentUserID}/${this.rights}`, // 替换成你的后端接口地址
					method: 'GET',
					header: {'Token': uni.getStorageSync('Token')},
					success: (res) => {
						console.log('Removeing Errors Success! : ',res.data);
					},
					fail: (err) => {
						console.error('Error removeing Errors:', err);
					}
				});
			},
			// // 添加新讨论的方法  
			// addDiscussion() {  
			// 	if (this.newDiscussionContent.trim() !== '') {  
			// 		const newDiscussion = {  
			// 			user: 'who',
			// 			content: this.newDiscussionContent,  
			// 			timestamp: new Date().toLocaleString(), // 使用当前时间作为时间戳  
			// 		};  
			// 		this.questions[this.currentQuestionIndex].discussions.push(newDiscussion); // 将新讨论添加到数组中  
			// 		this.newDiscussionContent = ''; // 清空输入框内容  
			// 	} else {  
			// 		// 提示用户输入内容不能为空  
			// 		wx.showToast({  
			// 			title: '请输入讨论内容！',  
			// 			icon: 'none',  
			// 		});  
			// 	}  
			// },
			// 发送POST请求
			addDiscussion() {
				if (this.newDiscussionContent.trim() !== '') {
					//this.discussion.id = 4; //待设置为自增
					this.discussion.questionId = this.currentQuestionID;
					if(this.currentUserID === -1)
					{
						console.log(this.currentQuestionID);
						uni.showModal({
							title : '请先登录',
							content: '是否跳转到登录',
							success: function (res) {
									if (res.confirm) {
										uni.switchTab({
											url: '/pages/My/My',
										});
									return;
									}
								}
						})
					}
					this.discussion.userId = this.currentUserID;
					this.discussion.comment = this.newDiscussionContent;
					this.newDiscussionContent = ''; // 清空输入框内容  
					uni.request({
						url: 'http://127.0.0.1:8081/answer/comment/makeComment',
						method: 'POST',
						header: {'Token': uni.getStorageSync('Token')},
						data: this.discussion,
						success: (res) => {
							console.log('Discussion数据发送成功:', res.data);
							this.fetchComments();
						},
						fail: (err) => {
							console.error('Discussion数据发送失败:', err);
						}
					});
				} else {
					// 提示用户输入内容不能为空  
					wx.showToast({
						title: '请输入讨论内容！',
						icon: 'none',
					});
				}
			},
			onFocus() {  
			  this.isFocused = true;  
			  console.log('Focused!');
			},  
			onBlur() {  
			  this.isFocused = false; 
			  console.log('not Focused!');
			  },
			goToAnswer() {
			  				console.log()
			  				wx.navigateTo({
			  					url: '/pages/exercise/answer'
			  				});
			}
		}
	};
</script>

<style scoped>
	
	.footer-container {
	  display: flex;
	  flex-direction: row; /* 设置子元素水平排列 */
	  justify-content: center; /* 水平居中对齐 */
	  align-items: center; /* 垂直居中对齐 */
	  background: #fff; /* 背景颜色 */
	  border-top: 1px solid #eee; /* 上边框 */
	  padding: 10px; /* 内边距 */
	}

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
	  text-align: center;
	  font-size:13px
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
	
	.active{
	  background-color: #ff0;	
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
	  
	.discussion-area {  
		position: relative; /* 确保定位是相对于此容器 */ 
		background-color: white;
		/* 其他样式 */
	}  
	  
	.discussion-input-group {  
	    position: sticky; /* 使用 sticky 定位 */  
	    bottom: 0; /* 粘贴在底部 */  
		background-color: white;
		border: 1px solid black;
	    /* 其他样式 */  
	}
	
	.textarea-default{
		height: 40px;
		transition: height 0.5s ease;
	}
	
	.textarea-focused{
		height: 150px ;
		transition: height 0.5s ease;
	}
	
	.discussion-input-group button{
		height: 40px;
	}
</style>