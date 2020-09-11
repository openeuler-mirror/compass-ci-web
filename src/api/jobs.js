import {Service} from '../utils/axios.utils'

// export function getJobs(upstream_repo, page_size, page_num) {
//     return Service({
//         url: '/get_jobs?upstream_repo='+upstream_repo+';page_size='+page_size+';page_num='+page_num ,
//         method: 'get'
//     })
// }
export function getJobs(data) {
    return Service({
        url: '/get_jobs',
        method: 'get',
        params:data
    })
}