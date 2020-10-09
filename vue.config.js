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
    }
};
let BASE_URL = ""; //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        BASE_URL = "http://124.90.34.227:11304" //这里是本地的请求
        break
    case 'test':
        BASE_URL = "http://124.90.34.227:11304" // 自定义的测试环境
        break
    case 'production':
        BASE_URL = "https://api.compass-ci.openeuler.org:11320" //生产环境
        break
}

export default BASE_URL;