import { ref, reactive, computed } from 'vue';
import dayjs from 'dayjs';
import calendar from '@/services/calendar.js';

export function picker ({ props }) {

    let open = ref(false);

    const pickerTypes = reactive({
        Day: { id: 'day', format: 'YYYYMMDD' },
        Month: { id: 'month', format: 'YYYYMM' },
        Year: { id: 'year', format: 'YYYY' }
    });

    const defaultFormat = ref('YYYY-MM-DD');
    const yearSize = ref(12);
    const weekdays = reactive(['日', '一', '二', '三', '四', '五', '六']);
    const months = reactive(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']);
    const currentDatePicker = ref(null);
    const currentDate = ref(dayjs());
    const currentValue = ref(null);

    const minDate = computed(() => props.min == null ? dayjs('1912/1/1') : dayjs(props.min));
    const maxDate = computed(() => props.max == null ? null : dayjs(props.max));

    const day = computed(() => {
        return {
            type: pickerTypes.Day.id,
            date: () => currentDate.value,
            getDays: () => {
                const _date = currentDate.value;
                const _dates = calendar.getMonthDates(_date);

                _dates.forEach((day) => {
                    day.isDisabled = getDisabledStatus(day.date, pickerTypes.Day.format);
                });

                return { date: _date, dates: _dates };
            },
            toPrevDate: () => {
                currentDate.value = currentDate.value.add(-1, pickerTypes.Month.id);
            },
            toNextDate: () => {
                currentDate.value = currentDate.value.add(1, pickerTypes.Month.id);
            }
        }
    });
    const month = computed(() => {
        return {
            type: pickerTypes.Month.id,
            date: () => currentDate.value,
            getMonths: () => {
                const _year = currentDate.value.year();

                const _storageMonths = [];
                months.forEach((monthShort, month) => {
                    _storageMonths.push({
                        month: monthShort,
                        isDisabled: getDisabledStatus(dayjs().year(_year).month(month), pickerTypes.Month.format)
                    });
                });

                return { year: _year, months: _storageMonths };
            },
            toPrevDate: () => {
                currentDate.value = currentDate.value.add(-1, pickerTypes.Year.id);
            },
            toNextDate: () => {
                currentDate.value = currentDate.value.add(1, pickerTypes.Year.id);
            }
        }
    });
    const year = computed(() => {
        return {
            type: pickerTypes.Year.id,
            date: () => currentDate.value,
            getYears: () => {
                const _currentYear = currentDate.value.year();
                const _todayYear = dayjs().year();
                const _endYear = _todayYear - yearSize.value * Math.floor((_todayYear - _currentYear) / yearSize.value);
                const _startYear = _endYear - yearSize.value + 1;

                const _years = [];
                for (let _year = _startYear; _year <= _endYear; _year++) {
                    _years.push({ year: _year, isDisabled: getDisabledStatus(dayjs().year(_year), pickerTypes.Year.format) });
                }

                return { startYear: _startYear, endYear: _endYear, years: _years };
            },
            toPrevDate: () => {
                currentDate.value = currentDate.value.add(-yearSize.value, pickerTypes.Year.id);
            },
            toNextDate: () => {
                currentDate.value = currentDate.value.add(yearSize.value, pickerTypes.Year.id);
            }
        }
    });

    const verifyDateRange = (date, format) => {
        format = format || defaultFormat.value;
        if (date.format(format) >= dayjs(minDate.value).format(format) && date.format(format) <= dayjs(maxDate.value).format(format)) {
            return true;
        }
        return false;
    };

    const getNewDate = (date) => {
        const _newDate = date ? new Date(date) : null;
        return _newDate == null || _newDate == 'Invalid Date' || dayjs(_newDate).isValid() == false ? null : _newDate;
    };

    const getDisabledStatus = (date, format) => {
        let _isDisabled = true;

        if (verifyDateRange(date, format)) {
            _isDisabled = false;
        }

        return _isDisabled;
    };

    const selectedDateFormat = (dateRange) => {
        return dateRange != null
            ? dayjs().year(dateRange.year()).month(dateRange.month()).date(dateRange.date()).format(pickerTypes.Day.format)
            : '';
    };

    const selectedMonthFormat = (date) => {
        return date != null ? dayjs().year(date.year()).month(date.month()).format(pickerTypes.Month.format) : '';
    };

    const selectedYearFormat = (date) => {
        return date != null ? dayjs().year(date.year()).format(pickerTypes.Year.format) : '';
    };

    const isSelectedMonth = (year, month) => {
        return selectedMonthFormat(currentDate.value) == dayjs().year(year).month(month).format(pickerTypes.Month.format);
    };

    const isSelectedYear = (year) => {
        return selectedYearFormat(currentDate.value) == dayjs().year(year).format(pickerTypes.Year.format);
    };

    return {
        open, pickerTypes, defaultFormat, yearSize, weekdays, months, currentDatePicker, currentDate, currentValue,
        minDate, maxDate, day, month, year,
        verifyDateRange, getNewDate, getDisabledStatus, selectedDateFormat, selectedMonthFormat, selectedYearFormat,
        isSelectedMonth, isSelectedYear
    }
}