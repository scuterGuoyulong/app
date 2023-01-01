<template>
	<view>
		
	<!-- 动态绑定地址 -->
		<live-pusher id='livePusher' ref="livePusher" class="livePusher" 
		style="width: 750rpx;" :style="{height:app_height+'px'}"
		:url="pushUrl" 
        mode="SD" :muted="true" :enable-camera="true" :auto-focus="true" :beauty="beauty"
		 :whiteness="white"
        aspect="9:16" @statechange="statechange" @netstatus="netstatus" @error = "error"
         >
		 <cover-view style="left: 15rpx;width: 720rpx;height: 200rpx;top: 5%;
		 position: fixed;border-radius: 20rpx;background-color: rgba(0,0,0,0.4);
		 display: flex; flex-direction: row;">
		 <cover-image src="/static/bg1.jpg" style="width:300rpx;height:150rpx;left:30rpx;padding-left: 10rpx;
		 padding-top: 10rpx;">
		 </cover-image>
		 <cover-view style="flex-direction: column;display: flex;height: 200rpx;">
			 <cover-view style="width: 400rpx;height:50rpx;color: white;
			 background-color: rgba(0,0,0,0.6);">直播间标题:监督自己
			 </cover-view>
			 <cover-view style="width: 400rpx;height:50rpx;color: white;
			 background-color: rgba(0,0,0,0.6);">简介：努力学习</cover-view>
			 <cover-view style="width: 400rpx;height:50rpx;color: white;
			 background-color: rgba(0,0,0,0.6);">类别：学习</cover-view>
		 </cover-view>
		
		 </cover-view>
		 
		 
		 <!-- 开始直播 -->
		 <cover-view style="background-color:rgba(255,103,154,0.6);height:60rpx;width: 250rpx;position: fixed;top:61.8%;left: 250rpx;
		 border-radius: 40rpx;display: flex; flex-direction: row;" v-show="!pushState">
			 <cover-image style="width:50rpx;height:50rpx;padding-left: 20rpx;" @click="start"
			  src="/static/img/live/live.png" ></cover-image>
			 
			  <cover-view style="height: 50rpx;">开始直播</cover-view>
		 </cover-view>
		 
		  <!-- 结束直播 -->
		  <cover-view style="height:;flex-direction: row;flex: 1;position: fixed;top:80%;left: 10%;
		  border-radius: 20rpx;">
		  			 <cover-image style="height: 50rpx;width: 50rpx;flex-direction: row;flex: 1;"
		  			  src="/static/img/live//clo.png" @click="stop" ></cover-image>
					  <cover-view style="height: 50rpx;color: white;" >结束</cover-view>
		  </cover-view>
		  
		  <!-- 美颜 -->
		  <cover-view style="height:;flex-direction: row;flex: 1;position: fixed;top:80%;left: 25%;
		  border-radius: 20rpx;">
		  			 <cover-image style="height: 50rpx;width: 50rpx;flex-direction: row;flex: 1;color: white;"
		  			  src="/static/img/live///beautiful.png"  @click="addbeauty"></cover-image>
		  			<cover-view style="height: 50rpx;color: white;">美颜</cover-view>
		  </cover-view>
		  
		  <!-- 美白 -->
		  <cover-view style="height:100rpx;flex-direction: row;flex: 1;position: fixed;top:80%;left: 40%;
		  border-radius: 20rpx;">
		  			 <cover-image style="height: 50rpx;width: 50rpx;flex-direction: row;flex: 1;"
		  			  src="/static/img/live//white.png" @click="changewhite()"></cover-image>
		  			  <cover-view style="height: 50rpx;color: white;">美白</cover-view>
		  </cover-view>
		  
		  <!-- 翻转 -->
		  <cover-view style="height:100rpx;flex-direction: row;flex: 1;position: fixed;top:80%;left: 55%;
		  border-radius: 20rpx;">
		  			 <cover-image style="height: 50rpx;width: 50rpx;flex-direction: row;flex: 1;"
		  			  src="/static/img/live//switch.png"  @click="switchCamera"></cover-image>
		  			  <cover-view style="height: 50rpx;color: white;">翻转</cover-view>
		  </cover-view>
		  
		  <cover-view v-show="pushState">
			  <!-- 暂停直播 -->
			  <cover-view style="height:;flex-direction: row;flex: 1;position: fixed;top:80%;left: 70%;
			  border-radius: 20rpx;" v-show="!stopstate">
			  			 <cover-image style="height: 50rpx;width: 50rpx;flex-direction: row;flex: 1;;"
			  			  src="/static/img/live//stop.png" @click="pause()"></cover-image>
			  					  <cover-view style="height: 50rpx;color: white;">暂停</cover-view>
			  </cover-view>
			  <!-- 恢复直播 -->
			  <cover-view style="height:;flex-direction: row;flex: 1;position: fixed;top:80%;left: 70%;
			  border-radius: 20rpx;" v-show="stopstate">
			  			 <cover-image style="height: 50rpx;width: 50rpx;flex-direction: row;flex: 1;;"
			  			  src="/static/img/live/resume.png" @click="resume()"></cover-image>
			  					  <cover-view style="height: 50rpx;color: white;">恢复</cover-view>
			  </cover-view>
		  </cover-view>
		  
		  
		 </live-pusher>
		
		
		
    </view>
</template>
<script>
    export default {
        data() {
			return {
				pushState:false,
				stopstate:false,
				state:true,
				w_state:true,
				white:1,
				beauty:1,
				
				app_height:0,
				//推流地址
				pushUrl: "",
				//房间id号
				roomId: "",
				//用户名id号的别称
				masterId:"",
										
				//视频的宽高
				pusherClass:{
					width:'750rpx',
					
				},
				form:{"roomName":'',
				"roomContent":'',
				"roomType":'',
				"startTime":'2022-11-06 02:37:06',
				"roomImage":''},
				rules:{
					//对name字段进行必填验证
					roomName:{
						rules:[{
							required:true,
							errorMessage:'请输入直播间名字'
						}],
						label:'姓名'
						,
						validateTrigger:'bind'
					},
					roomContent:{
						rules:[{
							required:true,
							errorMessage:'请输入简介'
						}],
						label:'密码'
						,
						validateTrigger:'bind'
					}
				},
				
			}
        },
		
		onLoad() {
			let res=uni.getSystemInfoSync()
				this.statusBarHeight=res.statusBarHeight
				this.app_height=res.windowHeight
			 

		},
		//页面每一次加载的时候都获取存储的房间信息
		onShow() {
			let push = uni.getStorageSync('pushUrl');
			
			// //问题可能出在这里，data里的推流地址没被设置成功？或者是组件不支持动态绑定？
			this.pushUrl = push.pushUrl+"/"+push.key;
			uni.setStorageSync('push',this.pushUrl)
			console.log(this.pushUrl)
			
		},
        onReady() {
            // 注意：需要在onReady中 或 onLoad 延时
            this.context = uni.createLivePusherContext("livePusher", this);
        },
        methods: {
			
			addbeauty(){
				
				if(this.beauty>=9){
					this.state=false
					uni.showModal({
					    title: '提示',
					    content: '已经到达最高美颜程度，开始减少',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
				}
				if(this.beauty<=0){
					this.state=true
					uni.showModal({
					    title: '提示',
					    content: '已经到达最低美颜程度，开始增加',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
				}
					if(this.state===true){
						this.beauty++
					}else{
						this.beauty--
					}
					uni.showModal({
					    title: '提示',
					    content: '当前美颜程度'+this.beauty,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					console.log(this.beauty)
					
			},
			changewhite(){
				
				if(this.white>=9){
					this.w_state=false
					uni.showModal({
					    title: '提示',
					    content: '已经到达最高美白程度，开始减少',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
				}
				if(this.white<=0){
					this.w_state=true
					uni.showModal({
					    title: '提示',
					    content: '已经到达最低美白程度，开始增加',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
				}
					if(this.w_state===true){
						this.white++
					}else{
						this.white--
					}
					uni.showModal({
					    title: '提示',
					    content: '当前美白程度'+this.white,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					console.log(this.white)
					
			},
			get(){
				const _this=this;
				let baseUrl="http://175.178.85.36:10010";
				uni.request({
					url:baseUrl+'/user/getUserMessage',
					method:"GET",
					header:{authentication:uni.getStorageSync('authentication')?uni.getStorageSync('authentication'):''},
					success: (res) => {
						
				
							uni.setStorageSync('userMsg',res.data.data)
							console.log("storage usermsg success")
							
						
					}
				})
				uni.request({
					url:baseUrl+'/user/getKeyAndWord',
					method:"GET",
					header:{authentication:uni.getStorageSync('authentication')?uni.getStorageSync('authentication'):''},
					success: (res) => {
						
							uni.setStorageSync('pushUrl',res.data.data);
							
							_this.pushUrl=res.data.data.pushUrl+"/"+res.data.data.key;
							
							console.log(_this.pushUrl)
							console.log(res);
							console.log("storage success")
						
					}
				});
				
			},
			startPush(){
				let _form=this.form;
				this.start();
				this.$refs.form.validate().then(res=>{
								
					//确认用户的登录状态
					this.request({url:'/user/keepLogin',method:'GET',data:this.form
					})
					.then(con=>{
						if(con.code===1){
							
							//发起直播的请求，获得后端的数据
							this.request({url:'/liveRoom/createRoom',method:'POST',
							data:this.form,})
							.then(res=>{
								if(res.code===1){
									this.start();
									uni.showToast({						
										title:'创建成功'
									})
									//存储用户的数据到storage
									uni.setStorageSync(roomName,res.data)	
									//跳转页面
									// uni.switchTab({
									// 	url:"/pages/tabbar/tabbar-1/tabbar-1"
									// })
								};
								
							}).catch(err=>{
								console.log("表单数据信息",err);
							})
						}
					 })
				})
			},
			closeRoom(){
				let _this = this;
				let user=uni.getStorageSync('user');
				let roomId = user.roomId;
				
				this.request({url:'/liveRoom/deleteRoom?roomId='+roomId, method:'DELETE', data:roomId})
				.then(res => {
					if(res.code == 1){
						_this.close();
						// uni.clearStorage('user');
						console.log(res);
						uni.showToast({
							title:'删除成功'
						})
					}
				});
			},

            statechange(e) {
                console.log("statechange:" + JSON.stringify(e));
            },
            netstatus(e) {
				
                console.log("netstatus:" + JSON.stringify(e));
            },
            error(e) {
                console.log("error:" + JSON.stringify(e));
            },
            start: function() {	
			//开始直播，
			this.pushState=!this.pushState
			this.context.start({
			    success: (a) => {
			        console.log("livePusher.start:" + JSON.stringify(a));
			    }
			});
            },
            close: function() {
			   this.context.close({
				   success: (a) => {
					   console.log("livePusher.close:" + JSON.stringify(a));
				   }
			   });
		   },
            snapshot: function() {
                this.context.snapshot({
                    success: (e) => {
                        console.log(JSON.stringify(e));
                    }
                });
            },
            // 恢复直播
			resume: function() {
				this.stopstate=!this.stopstate
                this.context.resume({
                    success: (a) => {
                        console.log("livePusher.resume:" + JSON.stringify(a));
                    }
                });
            },
			// 停止直播
            pause: function() {
				this.stopstate=!this.stopstate
                this.context.pause({
                    success: (a) => {
                        console.log("livePusher.pause:" + JSON.stringify(a));
                    }
                });
            },
           // 结束直播
			stop: function() {
				this.pushState=!this.pushState
                this.context.stop({
                    success: (a) => {
                        console.log(JSON.stringify(a));
                    }
                });
            },
            switchCamera: function() {
                this.context.switchCamera({
                    success: (a) => {
                        console.log("livePusher.switchCamera:" + JSON.stringify(a));
                    }
                });
            },
            startPreview: function() {
                this.context.startPreview({
                    success: (a) => {
                        console.log("livePusher.startPreview:" + JSON.stringify(a));
                    }
                });
            },
            stopPreview: function() {
                this.context.stopPreview({
                    success: (a) => {
                        console.log("livePusher.stopPreview:" + JSON.stringify(a));
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
	.shop-list-list {
		position: relative;
		margin-top: 25rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		align-items: flex-start;
		flex-direction: row;
		border-bottom-width: 1rpx;
		border-style: solid;
		border-color: #F7F7F7;
	}

	.shop-list-but-box {
		position: absolute;
		bottom: 26px;
		right: 10px;
		align-items: center;
		justify-content: flex-end;
		flex-direction: row;
	}

	.shop-list-but {
		color: white;
		border-radius: 20px;
		font-size: 13px;
		background-color: rgba(255, 65, 0, 1);
		padding: 10rpx 20rpx;
		margin-right: 10px;
	}


	.shop-list-img {
		margin-right: 20rpx;
		margin-left: 20rpx;
		width: 150rpx;
		height: 150rpx;
	}

	.shop-list-title {
		font-size: 16px;
		margin-bottom: 10rpx;
		color: rgba(51, 51, 51, 1);
		/* color: #333333; */
	}

	.shop-list-price {
		font-size: 16px;
		color: #FF4100;
		line-height: 30px;
	}

	.scroll-Ys {
		background-color: #ffffff;
		height: 650rpx;
		width: 100%;
	}

	.scroll-Yss {
		background-color: #ffffff;
		height: 800rpx;
		width: 100%;
	}

	.shop-list-box {
		position: relative;
		background-color: white;
		width: 100%;
		height: 380px;
		border-radius: 10rpx;
	}

	.mark-title {
		height: 80rpx;
		font-size: 20px;
		align-items: flex-start;
		justify-content: center;
	}

	.mark-tui {
		/* position:relative; */
		height: 20rpx;
		font-size: 20px;
		line-height: 100rpx;
		right: 0;
		border-bottom-width: 1rpx;
		border-style: solid;
		border-color: #F7F7F7;
	}

	.fanhui {
		width: 30rpx;
		height: 30rpx;
		margin-top: 40rpx;
		text-align: center;
		margin-right: 25rpx;
	}

	.zengjia {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
		margin-top: 34rpx;
		margin-bottom: 10px;
	}

	.add-shop {
		font-size: 16px;
		color: #333333;
		left: 20rpx;
		z-index: 10;
		margin-left: 5px;
	}

	.meiyanbut {

		height: 80rpx;
		width: 80rpx;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
		text-align: center;

	}

	.but-img {
		width: 38rpx;
		height: 34rpx;
	}

	.id {
		font-size: 14px;
		color: white;
	}

	.text-box {
		font-size: 12px;
		color: white;
	}

	.mark-text {
		color: white;
		font-size: 20px;
	}

	.mark {
		position: fixed;
		top: 0px;
		background-color: #9FA3A7;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.but {
		position: fixed;
		bottom: 0px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 160rpx;
	}

	.commodyti-box {
		align-items: center;
		justify-content: center;
	}

	.tui {
		width: 200px;
		height: 200px;

	}

	.arrow-box {
		position: fixed;
		top: 80rpx;
		right: 30rpx;
		z-index: 10;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
		height: 80rpx;
		width: 80rpx;
		align-items: center;
		justify-content: center;
	}

	.tui-img {
		width: 36rpx;
		height: 36rpx;

	}

	.arrow-boxs {
		padding: 1%;
		align-items: center;
		flex-direction: row;
		position: fixed;
		padding-right: 20rpx;
		top: 80rpx;
		left: 30rpx;
		z-index: 10;
		border-radius: 30px;
		background-color: rgba(0, 0, 0, 0.2);
		/* background-color: #FFFFFF; */
	}

	.user-img {
		margin-right: 5px;
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}

	.jieshao {
		flex-direction: column;
	}

	.jiesu {
		padding: 10px 20px 10px 20px;
		color: white;
		font-size: 16px;
	}

	.arrow {
		width: 15px;
		height: 15px;
	}

	.model {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.model-pup {
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
	}

	.model-body {
		width: 550rpx;
		padding: 30rpx;
		background-color: white;
		border-radius: 20rpx;
	}

	.model-cont {
		font-size: 35rpx;
		color: #333333;

	}

	.model-bot {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.model-btn {
		width: 200rpx;
		height: 80rpx;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #F8F8F8;
		border-width: 1rpx;
		border-color: #E6E6E6;
		border-style: solid;
		border-radius: 40rpx;
	}

	.model-btn1 {
		width: 200rpx;
		height: 80rpx;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #0462E8;
		border-width: 1rpx;
		border-color: #E6E6E6;
		border-style: solid;
		border-radius: 40rpx;
	}
	
.example-body {
	padding: 10px;
}
.scroll-view {
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	flex:1
}
// 处理抽屉内容滚动
.scroll-view-box {
	flex: 1;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.info {
	padding: 15px;
	color: #666;
}

.info-text {
	font-size: 14px;
	color: #666;
}
.info-content {
	padding: 5px 15px;
}
.close {
	padding: 10px;
}
</style>

