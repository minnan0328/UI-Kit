
/* 測試檔案，開發時請刪除或修改 */

import base from './_base';

const client = base.createAxios('test');

const test = {
    search(keyword) {
        return client.post('name',{ keyword: keyword });
    }
}

export default test;