let BASEURL = ""; //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
     case 'development':
        BASEURL = "https://api.compass-ci.openeuler.org:11320" //这里是本地的请求
        break
    case 'production':
        BASEURL = "https://api.compass-ci.openeuler.org:11320" //生产环境
        break
}

module.exports = BASEURL
