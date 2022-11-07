import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// 將時間轉為日期格式
function toDate(value) {
    return convert(value, 'YYYY-MM-DD');
}

// 將時間區間轉為日期格式
function toDateRange(startValue, endValue) {
    return `${convert(startValue, 'YYYY-MM-DD')} ~ ${convert(endValue, 'YYYY-MM-DD')}`;
}

// 將時間轉為日期加時間格式
function toDateTime(value) {
    return convert(value, 'YYYY-MM-DD HH:mm');
}

// 將時間轉為不帶秒的時間格式
function toTime(value) {
    return convert(value, 'HH:mm');
}

// 將時間轉為自訂日期格式
function toCustomDate(value, format = 'YYYY-MM-DD HH:mm:ss') {
    return convert(value, format);
}

// 將時間區間轉為自訂日期格式
function toCustomDateRange(startValue, endValue, format = 'YYYY-MM-DD HH:mm:ss') {
    return `${convert(startValue, format)} ~ ${convert(endValue, format)}`;
}

// 將時間轉為時間加時區格式
function toDateTimeOffset(value) {
    return convert(value);
}

// 將時間轉為 ISO 日期時間格式
function toISODateTime(value) {
    return convert(value, 'YYYY-MM-DD[T]HH:mm:ss');
}

// 將時間字串(HH:mm:ss)轉為時間格式(HH:mm)
function toShortTime(value) {
    return convertShortTime(value);
}

// 若傳入日期有帶時間（非 00），轉為日期加時間，否則僅顯示日期
function toDateOrDateTime(value) {
    const date = toDate(value);
    const dateTime = toDateTime(value);

    return dayjs(dateTime).isSame(dayjs(date)) ? date : dateTime;
}

function convert(value, format) {
    if (!value) {
        return '';
    }

    return dayjs(value).format(format);
}

function convertShortTime(value) {
    if (!value) {
        return '';
    }

    return dayjs(value, 'HH:mm:ss').format('HH:mm');
}

const install = function(app) {
    app.config.globalProperties.$toDate = toDate;
    app.config.globalProperties.$toDateRange = toDateRange;
    app.config.globalProperties.$toDateTime = toDateTime;
    app.config.globalProperties.$toTime = toTime;
    app.config.globalProperties.$toCustomDate = toCustomDate;
    app.config.globalProperties.$toCustomDateRange = toCustomDateRange;
    app.config.globalProperties.$toDateTimeOffset = toDateTimeOffset;
    app.config.globalProperties.$toISODateTime = toISODateTime;
    app.config.globalProperties.$toShortTime = toShortTime;
    app.config.globalProperties.$toDateOrDateTime = toDateOrDateTime;
};

export default { install };
