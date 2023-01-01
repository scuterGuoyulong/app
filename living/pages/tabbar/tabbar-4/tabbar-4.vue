
<template>
	<view class="page" >
		<video :style="{height:app_height+'px'}" id="myvideo" class="flex-1" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4" 
		:controls="true" autoplay="false" :danmu-list="danmu-list" enable-danmu="" danmu-btn=""></video>
		
		<!-- 头部 -->
		<!-- 好像app端不行 -->
		<view style="position: fixed;left: 0;right: 0;top:0%;" >
			<!-- 个人信息|观看详细信息 -->
			<view style="height: 80rpx; background-color: ;"></view>
			<!-- 金币 -->
			<view style="height: 80rpx; background-color: ;"></view>
			<!-- 收到礼物 -->
			<view style="height: 500rpx; ">
				<view style="width: 520rpx;height: 500rpx;background-color: ;"></view>
			</view>
		</view>
	
		<!-- 弹幕 -->
		<view style="position: fixed;left: 0;right: 0;bottom: 120rpx;width: 520rpx;height: 300rpx; 
		background-color: ;"></view>
		
		
		<!-- 底部 -->
		<view style="position: fixed;left: 0;right: 0;bottom: 0;height: 120rpx; 
		" class="flex ql-align-center ql-align-justify">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:0,
				app_height:0,
				danmuList: [{
				                    text: '第 1s 出现的弹幕',
				                    color: '#ff0000',
				                    time: 1
				                },
				                {
				                    text: '第 3s 出现的弹幕',
				                    color: '#ff00ff',
				                    time: 3
				                }
				            ],
			}
		},
		onReady:function(){
		

		},
		onLoad() {
			
		let res=uni.getSystemInfoSync()
			this.statusBarHeight=res.statusBarHeight
			this.app_height=res.windowHeight
		},
		methods: {
			fullscreenchange (e){
				if(!e.detail.fullScreen){
					this.videoContext.stop()
				}
			}

		}
	}
</script>

<style>
.page{
	flex:1;
	
}
.flex-1{
	width: 100%;
	height:/* 1380rpx */ ;
	
	
}
</style>
