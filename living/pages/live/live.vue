<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view>
               <video style="width: 100%;" :style="{height:app_height-90+'px'}" id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls="false"></video>
            </view>
            <!-- #ifndef MP-ALIPAY -->
		
            <view class="uni-list uni-common-mt" style="position: fixed;left: 0;right: 0;bottom: 100rpx;background-color: ; ">
                <view class="uni-list-cell">
                    <view class="uni-list-cell-db" style="background-color: aliceblue;">
                        <uni-easyinput  v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
                    </view>
                </view>
            </view>
			
            <view class="uni-btn-v" style="position: fixed;left: 0;right: 0;bottom: 0; ">
                <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
            </view>
            <!-- #endif -->
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            src: '',
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
            danmuValue: ''
        }
    },
    onReady: function(res) {
        // #ifndef MP-ALIPAY
        this.videoContext = uni.createVideoContext('myVideo')
		
        // #endif
    },
	onLoad() {
		
	let res=uni.getSystemInfoSync()
		this.statusBarHeight=res.statusBarHeight
		this.app_height=res.windowHeight
	},
    methods: {
        sendDanmu: function() {
            this.videoContext.sendDanmu({
                text: this.danmuValue,
                color: this.getRandomColor()
            });
            this.danmuValue = '';
        },
        videoErrorCallback: function(e) {
            uni.showModal({
                content: e.target.errMsg,
                showCancel: false
            })
        },
        getRandomColor: function() {
            const rgb = []
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        }
    }
}
</script>