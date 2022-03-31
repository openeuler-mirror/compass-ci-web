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
    productionSourceMap: false
};