/**
 * @file testMatrix接口文档入口
 * */
import { service } from '../utils/axios.utils';
export function testMatrix(data) {
    return service({
        url: '/web_backend/test_matrix',
        method: 'get',
        params: data
    });
}
