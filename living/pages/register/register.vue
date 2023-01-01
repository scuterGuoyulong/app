<template>
	<view>
		<view style="width: 90%;margin: 200rpx auto;"></view>
		<view style="margin-bottom: 70rpx; font-size: 60rpx; color: orange;
		text-align: center;">注册</view>
		<uni-forms ref="form" :modelValue="form" :rules="rules">
			
				<uni-forms-item name="userName">
						<uni-easyinput v-model="form.userName" prefixIcon="person"
						placeholder="请输入用户名"> </uni-easyinput>
				</uni-forms-item>
			
				<uni-forms-item name="password">
					<uni-easyinput v-model="form.password" prefixIcon="locked"
					placeholder="请输入密码"> </uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="confirm">
					<uni-easyinput v-model="form.confirm" prefixIcon="locked"
					placeholder="请确认密码"> </uni-easyinput>
				</uni-forms-item>
		</uni-forms>	
		<view>
		<button type="default" @click="register">注 册</button>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{userName:'',password:''},
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
					},
					confirm:{
						rules:[{
							required:true,
							errorMessage:'请确认密码'
						}],
						label:'密码'
						,
						validateTrigger:'bind'
					}
				}
			}
		},
		methods: {
			register(){
				this.$refs.form.validate().then(res=>{
					if(this.form.password!==this.form.confirm){
							uni.showToast({
								icon:'none',
								title:"两次输入密码不一致"
							})
							return
						}
						// console.log(this.form)
						const baseUrl="http://175.178.85.36:10010"
						uni.request({
							
							url:baseUrl+"/user/register",
							method:"POST",
							data:this.form,
							success:(res) =>{
								const data=res.data
								if(data.code!==1){
									uni.showToast({
										icon:'none',
										title:data.msg
									})
								}else{
									uni.showToast({
										
										title:'注册成功'
									})
									//存储用户的数据到storage
									uni.setStorageSync('user',data.data)
									//跳转页面
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
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
