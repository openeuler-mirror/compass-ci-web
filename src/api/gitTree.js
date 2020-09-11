import {Service} from '../utils/axios.utils'
export function getJobs(data) {
    return Service({
        url: '/get_git_repo',
        method: 'post',
        data:JSON.stringify(data)
    })
}