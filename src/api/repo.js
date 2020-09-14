import {Service} from '../utils/axios.utils'
export function getAllRepos(data) {
    return Service({
        url: '/get_repos',
        method: 'get',
        params:data
    })
}