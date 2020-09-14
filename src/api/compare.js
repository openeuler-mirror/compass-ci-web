/**
 * @file compare接口文档入口
 * */ 
import { service } from '../utils/axios.utils';
export function compareCandidates(data) {
    return service({
        url: '/compare_candidates',
        method: 'get',
        params: data
    });
}
export function compare(data) {
    return service({
        url: '/compare',
        method: 'get',
        params: data
    });
}
