/**
 * @file repos 接口文档
 * */
import {service} from '../utils/axios.utils';
export function getAllRepos(data) {
    return service({
        url: '/get_repos',
        method: 'get',
        params: data
    });
}