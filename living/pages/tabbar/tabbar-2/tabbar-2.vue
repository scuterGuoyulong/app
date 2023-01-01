<template>
	<view class="content">
		<!-- #ifdef APP-PLUS --> 
		<video :src= "pullUrl"
		class="uni-video-container" controls="true" danmu-list="" danmu-btn="true"
		enable-danmu="true" play-strategy="2" style="width: 100%; height: 90%;"
		></video>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<live-player
		  :src= "pullUrl"
		  autoplay
		  @statechange="statechange"
		  @error="error"
		  style="width: 100%; height: 90%;"
		/>
		<!-- #endif -->
		<button @click="watch" style="bottom: 0; width: 100%;position: fixed;">观看直播</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
			pullUrl:"",
			roomId:"",
			masterId:"",
			username:"",
		};
	},
	onShow() {
		let userMsg=uni.getStorageSync('userMsg');
		let masterId=userMsg.userId;
		uni.setStorageSync('masterId',masterId);
		console.log(userMsg)
		this.pullUrl=uni.getStorageSync('pullUrl')
		console.log(this.pullUrl)
		
	},
	methods: {
		watch(){
			let _this=this;
			let baseUrl='http://175.178.85.36:10010'
			uni.request({
				url:baseUrl+'/user/getPullUrl?masterId='+uni.getStorageSync('masterId'),
				method:"GET",
				header:{authentication:uni.getStorageSync('authentication'),masterId:this.masterId},	
				data:this.masterId,
				success: (res) => {
						console.log(res)
						uni.setStorageSync('pullUrl',res.data.data);
						let pull=uni.getStorageSync('pullUrl')
						_this.pullUrl = pull.pullUrl;
						console.log(this)
						console.log("storage success")
					
				}
			})
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
