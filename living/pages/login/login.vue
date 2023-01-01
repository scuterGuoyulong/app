<template>
	<view>
		<view style="width: 90%;margin: 200rpx auto;">
		<view style="margin-bottom: 70rpx; font-size: 60rpx; color: royalblue;
		text-align: center;">登录</view>
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
			<button type="primary" @click="login">登 录</button>	
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
				form:{userName:'1',password:'1'},
				rules:{
					//对name字段进行必填验证
					userName:{
						rules:[{
							required:true,
							errorMessage:'请输入用户名'
						}],
						label:'姓名'
						,
						validateTrigger:'bind'
					},
					password:{
						rules:[{
							required:true,
							errorMessage:'请输入密码'
						}],
						label:'密码'
						,
						validateTrigger:'bind'
					}
				}
			}
		},
		methods: {
			login(){
				this.$refs.form.validate().then(res=>{
					this.request({url:'/user/login',method:'POST',data:this.form})
						.then(res=>{
							if(res.code===1){
								uni.showToast({
									
									title:'登录成功'
								})
								//存储用户的数据到storage
								uni.setStorageSync('authentication',res.data)
								//跳转页面
								uni.switchTab({
									url:"/pages/tabbar/tabbar-1/tabbar-1"
								})
								
							}
						})
					}).catch(err=>{
					console.log("表单数据信息",err);
				})
				
				
			}
		}
	}

</script>

<style>

</style>
