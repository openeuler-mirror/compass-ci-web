/**
 * @file api文档入口
 * */
let BASEURL = '';
switch (process.env.NODE_ENV) {
    case 'development':
        BASEURL = 'https://api.compass-ci.openeuler.org:11320';
        break;
    case 'production':
        BASEURL = 'https://api.compass-ci.openeuler.org:11320';
        break;
}
module.exports = BASEURL;