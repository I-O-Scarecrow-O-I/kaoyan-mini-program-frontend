<template>
	<view>
		<button id="loginHanle" @tap="goLogin">微信一键登录</button>
	</view>
</template>
<script>
	export default {
		methods: {
			// 登录按钮触发
			goLogin() {
			    // 获取临时登录凭证code。
			    uni.login({
			        provider: 'weixin',
			        success(res) {
                        console.log("这是" + res.code);
						// 调用后端接口，传入code
			            /* axios.post('http://localhost:8080/students/fastLogin',{code:res.code})
.then(res=>{
    // 登录成功后的逻辑处理
    ...
}) */
			        }
			    })
			}
		}
	}
</script>