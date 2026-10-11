<template>
	<div>
		<view v-if="errors.length>0">
	<view class="container">
		<view v-if="!completed">
			<view class="question">{{ currentQuestion.question }}
				<view class="options">
					<button v-for="(option, index) in currentQuestion.options" :key="index"
						:class="{ active: selectedAnswerIndex === index }" @tap="selectOption(index)">
						{{ option }}
					</button>
				</view>				
				<button @click="toggleFavorite(currentQuestion)">
				  {{ isFavorite(currentQuestion) ? '取消收藏' : '收藏' }}
				</button>
			</view>
			<button class="next-button" @tap="nextQuestion(currentQuestion)">下一题</button>
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
		<view>你还没有计算机网络的错题</view>
		<button @click="goToAnswer_net()">
			点击前去答题
		</button>
	</view>
	</div>
</template>

<script>
import { questions } from '@/pages/exam/questions.js';
import { favorites } from '@/pages/exam/favorite.js';
import { errors } from '@/pages/exam/errors_net.js';
	export default {
		data() {
			return {
				questions:errors,
				/*
				questions: [{
						question: '1 + 1 = ?',
						options: ['2', '3', '4'],
						correctAnswerIndex: 0,
						explanation: '1 + 1 等于 2。',
						isFavorited: false 
					},
					{
						question: '2 * 3 = ?',
						options: ['4', '6', '8'],
						correctAnswerIndex: 1,
						explanation: '2 * 3 等于 6。',
						isFavorited: false 
					},
					{
						question: '10 / 2 = ?',
						options: ['3', '5', '10'],
						correctAnswerIndex: 1,
						explanation: '10 / 2 等于 5。',
						isFavorited: false 
					}
				],
				*/
				currentQuestionIndex: 0,
				selectedAnswerIndex: null,
				score: 0,
				completed: false,
				showSolution: false,
				isAnswerChecked: false,
				trueorfalse: null,
				favorites: favorites,
				errors:errors
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
			removeErrored(question) {
			  question.isErrored = false;
			  const index = this.errors.findIndex(item => item.question === question.question);
			  if (index !== -1) {
			    this.errors.splice(index, 1);
			  }
			},
			nextQuestion(question) {
				if (this.selectedAnswerIndex !== null) {
					if (this.selectedAnswerIndex === this.currentQuestion.correctAnswerIndex && this.trueorfalse ===
						null) {
						this.score++;
						this.trueorfalse=true;
						if(question.isErrored===true){
							console.log('removeerror\n');
							this.removeErrored(question);
						}
					} else {
						this.showSolution = true;
						question.isErrored=true;
						const index = this.errors.findIndex(item => item.question === question.question);
						if (index === -1) {
							console.log('adderror\n');
							this.errors.push(question);
							}
					}
					if (this.trueorfalse === true) {
						if (this.currentQuestionIndex < this.questions.length - 1 ) {
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
					this.trueorfalse=true;
				}
				else {
					uni.showToast({
						title: '请选择一个答案！',
						icon: 'none'
					});
				}
			},
			goBack() {
				uni.navigateBack();
			},
			goToAnswer_net() {
				console.log()
				uni.navigateTo({
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
		margin-bottom: 10px;
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