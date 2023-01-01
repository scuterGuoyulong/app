<script>
export default {
	globalData(){
		return{
			list:{
				name,type,
				img,type,
				id,content,
				status,number,
				starttime,
			}
		}
	},
	onLaunch: function() {
		
		console.log('App Launch');
		const domModule=weex.requireModule('dom')
		domModule.addRule('fontFace',{
			'fontFamily':"iconfont",
			'src':"url('/static/iconfont.ttf')"
		});
		this.request({url:"/liveRoom/getAllLiveRoomToLook"}).then(res=>
			{
				
			}
		),

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	
	

};
</script>

<style>
/*每个页面公共css */ 
	/* #ifndef APP-PLUS-NVUE */

	@import url("/static/iconfont.css");
	
	/* #endif */
</style>
