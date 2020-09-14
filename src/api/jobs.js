/**
 * @file jobs接口文档入口
 * */ 
import {service} from '../utils/axios.utils';
export function getJobs(data) {
    return service({
        url: '/get_jobs',
        method: 'get',
        params: data
    });
}