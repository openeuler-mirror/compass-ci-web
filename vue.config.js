/**
 * @file api文档入口
 * */
module.exports = {
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    },
    pwa: {
        iconPaths: {
            favicon32: null,
            favicon16: null,
            appleTouchIcon: null,
            maskIcon: null,
            msTileImage: null
        }
    },
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            './cptable': 'var cptable'
        },
    },
		devServer: {
			proxy: {  //配置跨域
				'/getJson': {
					target: 'https://api.compass-ci.openeuler.org/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
					changOrigin: true,  //允许跨域
					pathRewrite: {
						'^/getJson': '' 
					}
				},
			}
		},
};
