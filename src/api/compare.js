import {Service} from '../utils/axios.utils'
export function compareCandidates(data) {
    return Service({
        url: '/compare_candidates',
        method: 'get',
        params: data
    })
}
export function compare(data) {
    return Service({
        url: '/compare',
        method: 'get',
        params:data
    })
}
