<template>
	<div>
		<view v-if="favorites.length>0">
			<view class="container">
				<view v-if="!completed">
					<view class="question">{{ currentQuestion.question }}
						<view class="options">
							<button v-for="(option, index) in currentQuestion.options" :key="index"
												              :class="{ active: selectedAnswerIndex === index }" @tap="selectOption(index)">
												              <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span> <!-- 使用 String.fromCharCode() 方法生成字母 -->
												              <span class="option-text">{{ option }}</span>
												            </button>
						</view>
						<button @click="toggleFavorite(currentQuestion)">
							{{ isFavorite(currentQuestion) ? '取消收藏' : '收藏' }}
						</button>
					</view>
					<button class="next-button" @tap="nextQuestion">下一题</button>
				</view>
				<view v-else>
					<view class="completion">
						<view>恭喜你完成了答题！</view>
						<view>你的得分是：{{ score }}</view>
					</view>
				</view>
				<button v-if="showSolution" class="solution-button" @tap="showSolution = false">隐藏解析</button>
				<view v-if="showSolution" class="solution">
					<view>问题解析：</view>
					<view>{{ currentQuestion.explanation }}</view>
				</view>
				<button class="back-button" @tap="goBack">返回</button>
			</view>
			<h2>收藏夹</h2>
			<ul>
				<li v-for="(question, index) in favorites" :key="index">
					{{ question.question }}
					<button @click="removeFavorite(question)">
						取消收藏
					</button>
				</li>
			</ul>
		</view>
		<view v-else>
			<view>你还没有收藏计算机网络的题目</view>
			<button @click="goToAnswer_net()">
				点击前去答题
			</button>
		</view>
	</div>
</template>
<script>
	import {
		questions
	} from '@/pages/exam/questions_net.js';
	import {
		favorites
	} from '@/pages/exam/favorite_net.js';
	export default {
		data() {
			return {
				questions: favorites,
				currentQuestionIndex: 0,
				selectedAnswerIndex: null,
				score: 0,
				completed: false,
				showSolution: false,
				isAnswerChecked: false,
				trueorfalse: null,
				favorites: favorites
			};
		},
		computed: {
			currentQuestion() {
				return this.questions[this.currentQuestionIndex];
			}
		},
		methods: {
			selectOption(index) {
				this.selectedAnswerIndex = index;

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
			nextQuestion() {
				if (this.selectedAnswerIndex !== null) {
					if (this.selectedAnswerIndex === this.currentQuestion.correctAnswerIndex && this.trueorfalse ===
						null) {
						this.score++;
						this.trueorfalse = true;
					} else {
						this.showSolution = true;
					}
					if (this.trueorfalse === true) {
						if (this.currentQuestionIndex < this.questions.length - 1) {
							this.selectedAnswerIndex = null;
							this.showSolution = false;
							this.currentQuestionIndex++;
						} else {
							this.showSolution = false;
							this.completed = true;
						}
						this.trueorfalse = null;
						return;
					}
					this.trueorfalse = true;
				} else {
					wx.showToast({
						title: '请选择一个答案！',
						icon: 'none'
					});
				}
			},
			goBack() {
				wx.navigateBack();
			},
			goToAnswer_net() {
				console.log()
				wx.navigateTo({
					url: '/pages/exercise/answer_net'
				});
			}
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.question {
		font-size: 20px;
		margin-bottom: 20px;
	}

	  .options button {
	    position: relative;
	    padding-left: 20px; /* 调整按钮左边距以容纳圆圈 */
	  }
	  
	  .option-letter {
	    position: absolute;
	    left: 5px; /* 调整圆圈的位置 */
	    top: 50%; /* 将圆圈置于按钮垂直居中 */
	    transform: translateY(-50%);
	    width: 20px;
	    height: 20px;
	    border: 2px solid black; /* 设置圆圈轮廓颜色为黑色 */
	    border-radius: 50%; /* 将方形边框设置为圆形 */
	    display: inline-flex;
	    justify-content: center;
	    align-items: center;
	    font-size: 14px;
	  }


	.options button.active {
		background-color: #ff0;
		/* 修改为你想要的高亮颜色 */
	}

	.next-button {
		margin-top: 20px;
	}

	.back-button {
		margin-top: 20px;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 10px;
	}
</style>