/**
 * @file axios拦截配置
 * */
import axios from 'axios';
import {Message, Loading} from 'element-ui';
const BASEURL = 'https://api.compass-ci.openeuler.org';
let loadingInstance = null;
export const service = axios.create({
    timeout: 20 * 1000,
    baseURL: BASEURL,
    method: 'get',
    headers: {
			responseType: 'arraybuffer' // 指定响应数据类型为arraybuffer
    }
});
service.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'loading...'
    });
    return config;
});
service.interceptors.response.use(response => {
    loadingInstance.close();
    return response.data;
}, error => {
    Message({
        message: '网络错误,请稍后再试',
        type: 'error',
        duration: 3 * 1000
    });
    loadingInstance.close();
    return Promise.reject(error);
});
