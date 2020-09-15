/**
 * @file axios拦截配置
 * */
import axios from 'axios';
import {Message, Loading} from 'element-ui';
const BASEURL = 'http://124.90.34.227:11320'; // 默认路径，这里也可以使用env来判断环境
let loadingInstance = null; // 这里是loading
// 使用create方法创建axios实例
export const service = axios.create({
    timeout: 20 * 1000, // 请求超时时间
    baseURL: BASEURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;'
    }
});
// 添加请求拦截器
service.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'loading...'
    });
    return config;
});
// 添加响应拦截器
service.interceptors.response.use(response => {
    loadingInstance.close();
    return response.data;
}, error => {
    // const MSG = error.Message !== undefined ? error.Message : ''
    // console.log(MSG);
    Message({
        // message: '网络错误' + msg,
        message: '网络错误,请稍后再试',
        type: 'error',
        duration: 3 * 1000
    });
    loadingInstance.close();
    return Promise.reject(error);
});