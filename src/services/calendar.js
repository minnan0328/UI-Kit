import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isToday);
dayjs.extend(isoWeek);

// 取得特定日期所屬月份的日期資料
function getMonthDates(date) {
    const initDate = dayjs(date);
    const startDate = initDate.date(1).startOf('isoWeek'); // 起始為週一
    const count = 41;
    const dates = [];

    for (let idx = -1; idx < count; idx++) {
        const date = startDate.add(idx, 'day');

        dates.push({
            year: date.year(),
            month: date.month() + 1,
            day: date.date(),
            dateString: date.format('YYYY-MM-DD'),
            date: date,
            isToday: date.isToday(),
            isCurrentMonth: date.month() == initDate.month()
        });
    }

    return dates;
}

export default {
    getMonthDates
};
