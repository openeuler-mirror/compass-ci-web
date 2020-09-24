let BASEURL = ""; //这里是一个默认的url，可以没有
let BASEURLRESULT = ""
let BASEURLTESTBOX = ""

switch (process.env.NODE_ENV) {
     case 'development':
        BASEURL = "https://api.compass-ci.openeuler.org:11320" //这里是本地的请求
        BASEURLRESULT = 'http://124.90.34.227:11304';
        BASEURLTESTBOX = "https://gitee.com/wu_fengguang/lab-z9/tree/master/hosts"
        break
    case 'production':
        BASEURL = "http://127.90.34.227:11320" //生产环境
        BASEURLRESULT = 'http://183.134.196.212:11300'
        BASEURLTESTBOX = "https://gitee.com/wu_fengguang/lab-z9/tree/master/hosts"
        break
}

module.exports = {BASEURL, BASEURLRESULT, BASEURLTESTBOX};
