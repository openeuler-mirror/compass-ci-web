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

export function getJobsSummary(data) {
    return service({
        url: '/get_jobs_summary',
        // baseURL: 'http://124.160.11.57:10002',
        method: 'get',
        params: data
    });
}

export function getErrorList(data) {
    return service({
        url: '/get_job_error',
        method: 'get',
        params: data
    });
}