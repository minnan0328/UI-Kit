import jsCookie from 'js-cookie';

// 此為前端判斷是否已登入用的標記，並非實際登入狀態
const tokenName = 'kpi_reporter_token';

// 設定登入 token
function set(token, expiredUTCTime = 1) {
    jsCookie.set(tokenName, token, { expires: expiredUTCTime });
}

// 取得登入 token
function get() {
    return jsCookie.get(tokenName);
}

export default {
    set,
    get
};
