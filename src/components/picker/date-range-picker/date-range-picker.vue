<template src="./date-range-picker.html"></template>
<style lang="scss" src="@/styles/components/date-picker.scss" scoped></style>
<script>
import { reactive, watch, onMounted, getCurrentInstance } from 'vue';
import dayjs from 'dayjs';
import { picker } from '@/components/picker/picker.js';

export default {
    props: {
        startDate: {
            // sync 開始時間
            type: [Object, String],
            default: null
        },
        endDate: {
            // sync 結束時間
            type: [Object, String],
            default: null
        },
        showDate: {
            // 當 open 時，如有傳入日期，則 open時，以傳入日期的區間做顯示
            type: [Object, String],
            default: null
        },
        min: {
            type: [Object, String],
            default: null
        },
        max: {
            type: [Object, String],
            default: null
        },
        placeholder: {
            type: String,
            default: '請選擇日期'
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        invalid: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['update:startDate', 'update:endDate', 'callback'],
    setup(props, context) {
        const app = getCurrentInstance();
        const globalPlugins = app.appContext.config.globalProperties;

        const {
            open, pickerTypes, defaultFormat, yearSize, weekdays, months, currentDatePicker, currentDate, currentValue,
            minDate, maxDate, day, month, year,
            verifyDateRange, getNewDate, getDisabledStatus, selectedDateFormat, selectedMonthFormat, selectedYearFormat,
            isSelectedMonth, isSelectedYear
        } = picker({ props });

        //data
        defaultFormat.value = 'YYYY-MM-DD';
        const selectedDateRange = reactive({
            start: null,
            end: null
        });

        // watch
        watch(open, () => {
            if (open.value) {
                init();
                currentDatePicker.value = day.value;
            }
        });

        // methods
        const init = () => {
            let _startDate = getNewDate(props.startDate);
            let _endDate = getNewDate(props.endDate);

            if (_startDate != null && verifyDateRange(dayjs(_startDate)) == false) {
                _startDate = dayjs();
            }

            if (_endDate != null && verifyDateRange(dayjs(_endDate)) == false) {
                _endDate = dayjs();
            }

            // 先看外面有沒有給選擇的日期，若有則使用，若沒有再看有沒有給開啟時的預設日期，若有則使用，否則為當天
            if(_startDate != null && _endDate != null) {
                currentDate.value = dayjs(_endDate);
                selectedDateRange.start = _startDate != null ? dayjs(_startDate) : null;
                selectedDateRange.end = _endDate != null ? dayjs(_endDate) : null;
            } else {
                currentDate.value = props.showDate ? dayjs(props.showDate) : dayjs();
            }
        };

        const isSelectedStartDate = (date) => {
            return selectedDateFormat(selectedDateRange.start) == date.format(pickerTypes.Day.format);
        };

        const isSelectedEndDate = (date) => {
            return selectedDateFormat(selectedDateRange.end) == date.format(pickerTypes.Day.format);
        };

        const isSelectedDateRange = (date) => {
            return selectedDateRange.start && selectedDateRange.end && date.format(pickerTypes.Day.format) >= selectedDateRange.start.format(pickerTypes.Day.format)
                    && date.format(pickerTypes.Day.format) <= selectedDateRange.end.format(pickerTypes.Day.format);
        };

        const sendSelectDate = (date) => {

            if( selectedDateRange.start == null || selectedDateRange.start && selectedDateRange.end ) {
                selectedDateRange.start = date;
                selectedDateRange.end = null;

                displayValue(selectedDateRange);

            } else if(selectedDateRange.start && selectedDateRange.end == null) {
                selectedDateRange.end = date;
            };

            verificationDate(date);
        };

        const sendSelectMonth = (year, month) => {

            currentDate.value = currentDate.value.year(year).month(month);

            currentDatePicker.value = day.value;
        };

        const sendSelectYear = (year) => {

            currentDate.value = currentDate.value.year(year);

            currentDatePicker.value = month.value;

        };

        const close = () => {
            if (open.value) {
                open.value = false;

                if(selectedDateRange.start == null || selectedDateRange.end == null) {
                    selectedDateRange.start = null;
                    selectedDateRange.end = null;
                    
                    displayValue('');
                }
            }
        };

        const verificationDate = (date) => {
            if(selectedDateFormat(selectedDateRange.end) < selectedDateFormat(selectedDateRange.start)) {
                selectedDateRange.start = date;
                selectedDateRange.end = null;

                displayValue(selectedDateRange);
            } else {
                updateValue(selectedDateRange);
                currentDate.value = date;
            }
        };

        const updateValue = (dateRange) => {
            displayValue(dateRange);
            let startDate = dateRange ? dateRange.start : null;
            let endDate = dateRange ? dateRange.end : null;

            if(startDate == null || endDate == null ) {
                selectedDateRange.start = startDate;
                selectedDateRange.end = endDate;
            }

            context.emit('update:startDate', globalPlugins.$toDateTimeOffset(startDate));
            context.emit('update:endDate', globalPlugins.$toDateTimeOffset(endDate));
            context.emit('callback');
        };

        const displayValue = (dateRange) => {
            currentValue.value = dateRange ? `${globalPlugins.$toCustomDate(dateRange.start, defaultFormat.value)} 至 ${globalPlugins.$toCustomDate(dateRange.end, defaultFormat.value)}`  : null;
        };

        onMounted(() => {
            currentDatePicker.value = day.value;

            if (props.startDate && props.endDate) {
                let startDate = globalPlugins.$toCustomDate(props.startDate, defaultFormat.value);
                let endDate = globalPlugins.$toCustomDate(props.endDate, defaultFormat.value);
                selectedDateRange.start = dayjs(startDate);
                selectedDateRange.end = dayjs(endDate);
                    
                updateValue(selectedDateRange);
            };
            
            if(open == false) {
                watch(() => [props.startDate, props.endDate], ([startVal, endVal]) => {
                    if(startVal && endVal) {
                        selectedDateRange.start = dayjs(startVal);
                        selectedDateRange.end = dayjs(endVal);
                            
                        displayValue(selectedDateRange);
                    };
                })
            };
        })

        return {
            open, pickerTypes, defaultFormat, yearSize, weekdays, months, currentDatePicker, currentDate, currentValue, selectedDateRange,
            day, month, year, minDate, maxDate, init, verifyDateRange, getNewDate, getDisabledStatus, selectedDateFormat, selectedMonthFormat,
            selectedYearFormat, isSelectedStartDate, isSelectedEndDate, isSelectedDateRange, isSelectedMonth, isSelectedYear, sendSelectDate,
            sendSelectMonth, sendSelectYear, close, verificationDate, updateValue, displayValue
        }
    }
};
</script>
