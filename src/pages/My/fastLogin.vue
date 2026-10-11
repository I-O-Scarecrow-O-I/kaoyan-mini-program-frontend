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
				// #ifdef H5
				return uni.$showMsg('快捷登录仅支持微信小程序')
				// #endif
				// #ifdef MP-WEIXIN
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
				// #endif
			}
		}
	}
</script>
