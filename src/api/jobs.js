/**
 * @file jobs接口文档入口
 * */
import { service } from '../utils/axios.utils';
export function getJobs(data) {
    return service({
        url: '/get_jobs',
        method: 'get',
        params: data
    });
}

export function getSrpms(data) {
    return service({
        url: '/srpm_info',
        method: 'get',
        params: data
    });
}

export function getTestbox(data) {
    return service({
        url: '/testbox_status',
        method: 'get',
        params: data
    });
}

export function queryTestbox(data) {
    return service({
        url: '/query_testbox_info',
        method: 'get',
        params: data
    });
}

export function getJobsSummary(data) {
    return service({
        url: '/get_jobs_summary',
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
export function getPerformanceResult(data) {
    return service({
        url: '/performance_result',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export function QueryField(data) {
    return service({
        url: '/query_field',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export function getHostInfo(data) {
    return service({
        url: '/host_info',
        method: 'get',
        params: data
    });
}
