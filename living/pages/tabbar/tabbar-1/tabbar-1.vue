<template>
			
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<view class="swiper-item" style="background-color: red;">A</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"style="background-color: green;">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" style="background-color: blue;">C</view>
			</swiper-item>
		</swiper>
		<view class="flex flex-wrap">
			<view class="list-item"	v-for="i in 10" :key="i" @click="openLive">
				<image src="../../../static/img/video.png" style="width: 365rpx;height: 365rpx;
				border-radius: 25rpx;" mode="aspectFill"></image>
				<!-- //左上角 -->
				<view style="position: absolute;left: 15rpx;top: 15rpx;
				padding-left: 20rpx;padding-right: 20rpx;
				padding-top:10rpx ;padding-bottom: 10rpx;
				border-radius: 20rpx;">
					<text class="iconfont icon-bizhongguanli"></text>
					<text style="color: white; font-size: 50%;>" class="font" >0</text>
					
				</view>
				<!-- 右上角 -->
				<view style="position: absolute;right: 15rpx;top: 15rpx;
				background-color: rgba(0,0,0,0,4);padding-left: 20rpx;padding-right: 20rpx;
				padding-top:10rpx ;padding-bottom: 10rpx;display: flex!important; flex-direction: row;
				border-radius: 20rpx;">
					<text class="font " style="color: white; font-size: 50%;" >人气：</text>
						<text style="color: white;  font-size: 50%;>" class="font">0</text>
					
				</view>
				<!-- 左下角 -->
				<view style="position: absolute;left: 15rpx;bottom: 15rpx;
				background-color: rgba(0,0,0,0,4);padding-left: 20rpx;
				padding-top:10rpx ;padding-bottom: 10rpx;display: flex!important; flex-direction: row;
				border-radius: 20rpx;">
					<text class="" style="color: white; font-size: 50%;>">标题</text>	
				</view>
				<!-- 右下角 -->
				<view style="position: absolute;right: 15rpx;bottom: 15rpx;
				background-color: rgba(0,0,0,0,4);padding-left: 20rpx;padding-right: 20rpx;
				padding-top:10rpx ;padding-bottom: 10rpx;display: flex!important; flex-direction: row;
				border-radius: 20rpx;">
					<text class="">
						<text style="color: white; font-size: 50%;" class="font" >已结束</text>
					</text>
				</view>
			</view>
			
			<view v-for="(item,index) in list" :key="index" >
				<text class="">
					房间名称：{{item.name}}
				</text>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//轮播图的参数
			background: ['color1', 'color2', 'color3'],
			            indicatorDots: true,
			            autoplay: true,
			            interval: 2000,
			            duration: 500,
			
			//拉流，房间id，用户id，用户名
			pullUrl:"",
			roomId:"",
			masterId:"",
			username:"",
			list:{
				name,type,
				img,type,
				id,content,
				status,number,
				starttime,
			}
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
	onLoad() {
		this.request({url:"/liveRoom/getAllLiveRoomToLook"}).then(res=>
			{
			this.list=res.data
			console.log(this.list)
			})
	},
	methods: {
		
		openLive(){
			uni.navigateTo({
				url:"/pages/live/live"
			})
		},
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
		},
		//轮播图的函数
		 changeIndicatorDots(e) {
		            this.indicatorDots = !this.indicatorDots
		        },
		        changeAutoplay(e) {
		            this.autoplay = !this.autoplay
		        },
		        intervalChange(e) {
		            this.interval = e.target.value
		        },
		        durationChange(e) {
		            this.duration = e.target.value
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
.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 250rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
.flex{
	display: flex!important; flex-direction: row;
}
.flex-wrap{
		flex-wrap: wrap;
}
.list-item{
	width: 365rpx;height: 365rpx;padding: 5rpx;position: relative;
}
</style>
