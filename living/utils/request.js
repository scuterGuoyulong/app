const BASE_URL='http://175.178.85.36:10010'

export const request=(options)=>{ //optiond={url=''method='',data:{}}
	return new Promise((resolve,reject)=>
	uni.request({
		url:BASE_URL+options.url,
		method:options.method||'GET',
		header:{authentication:uni.getStorageSync('authentication')?uni.getStorageSync('authentication'):''},
		data:options.data||{},
		success: (res) => {
			console.log(res)
			const data =res.data
			if(data.code === 401){//这里有点bug以后再来修
				uni.navigateTo({
					url:'/pages/login/login',
					
				})
				return
			}else if(data.code===-1){
				uni.showToast({
					icon:"none",
					title:data.msg
				})
			}
			else{
				uni.showToast({
					icon:"none",
					title:data.msg
				})
			}
			resolve(data)
		},
		fail: (error) => {
			console.log(error)
			uni.showToast({
				icon:"error",
				title:'系统错误'
			})
			reject(error)
		}
	})
	)
}