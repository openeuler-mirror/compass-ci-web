/**
 * @file axios拦截配置
 * */
import axios from 'axios';
import {Message, Loading} from 'element-ui';
// const BASEURL = 'https://api.compass-ci.openeuler.org:11320';
import BASEURL from "../../vue.config"
let loadingInstance = null;
export const service = axios.create({
    timeout: 20 * 1000,
    baseURL: BASEURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;'
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