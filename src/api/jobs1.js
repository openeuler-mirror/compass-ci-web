/**
 * @file jobs接口文档入口
 * */
import { service } from '../utils/axios1.utils';
export function getJobs() {
	console.log('deojdojeo')
    return service({
        url: '/result/rpmbuild/2023-01-12/vm-2p8g/openeuler-20.03-LTS-SP3-x86_64/x86_64/z9.24549440/meminfo.json.gz',
        method: 'get',
    });
}
