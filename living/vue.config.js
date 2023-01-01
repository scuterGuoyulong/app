module.exports = {
	devServer:{
		
		disableHostCheck:true,
		proxy:{
			'/dpc':{
				target:'http://175.178.85.36:10010',
				changeOrigin:true,
				pathRewrite:{
					'^/dpc': ''
				}
			}
		}
	}
}