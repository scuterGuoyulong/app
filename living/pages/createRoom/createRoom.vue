<template>
	<view>
		<view style="width: 90%;margin: 200rpx auto;">
		<view style="margin-bottom: 70rpx; font-size: 60rpx; color: royalblue;
		text-align: center;">直播间信息</view>
		<uni-forms ref="form" :modelValue="form" :rules="rules">
			
				<uni-forms-item name="userName">
						<uni-easyinput v-model="form.userName" prefixIcon="person"
						placeholder="请输入登陆用户名"> </uni-easyinput>
				</uni-forms-item>
			
				<uni-forms-item name="password">
					<uni-easyinput v-model="form.password" prefixIcon="locked"
					placeholder="请输入密码"> </uni-easyinput>
				</uni-forms-item>
		</uni-forms>	
			
			<view >
			<button type="primary" @click="login">进入直播</button>	
			</view>
		
		
		<navigator url="/pages/register/register" style="margin: 40rpx 0; color: skyblue;">
			前往注册
		</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
