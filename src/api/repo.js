import {Service} from '../utils/axios.utils'
export function getAllRepos(data) {
    return Service({
        url: '/get_all_repos',
        method: 'post',
        data:JSON.stringify(data)
    })
}