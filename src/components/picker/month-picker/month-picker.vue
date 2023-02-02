<template src="./month-picker.html"></template>
<style lang="scss" src="@/styles/components/date-picker.scss" scoped></style>

<script>
import { ref, reactive, watch, computed, onMounted, getCurrentInstance } from 'vue';
import dayjs from 'dayjs';
import { picker } from '@/components/picker/picker.js';

export default {
    props: {
        modelValue: {
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
            default: '請選擇月份'
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
    emits: ['update:modelValue', 'callback'],
    setup(props, context) {
        const app = getCurrentInstance();
        const globalPlugins = app.appContext.config.globalProperties;

        const {
            open, pickerTypes, defaultFormat, yearSize, months, currentDatePicker, currentDate, currentValue,
            minDate, maxDate, month, year,
            verifyDateRange, getNewDate, getDisabledStatus, selectedMonthFormat, selectedYearFormat,
            isSelectedMonth, isSelectedYear
        } = picker({ props });

        // data
        defaultFormat.value = 'YYYY-MM';
        const selectedDate = ref(null);

        // watch
        watch(open, () => {
            if (open.value) {
                init();
                currentDatePicker.value = month.value;
            }
        });
        
        watch(() => props.modelValue, () => {
            if (open.value == false) {                
                displayValue(props.modelValue);
            }
        });

        // methods
        const init = () => {
            let _date = getNewDate(props.modelValue);

            if (_date != null && verifyDateRange(dayjs(_date)) == false) {
                _date = dayjs().startOf('month');
            }

            // 先看外面有沒有給選擇的日期，若有則使用，若沒有再看有沒有給開啟時的預設日期，若有則使用，否則為當天
            currentDate.value = _date != null ? dayjs(_date).startOf('month') : props.showDate ? dayjs(props.showDate).startOf('month') : dayjs().startOf('month');
            selectedDate.value = _date != null ? currentDate.value : null;
        };

        const sendSelectMonth = (year, month) => {
            selectedDate.value = dayjs().year(year).month(month).startOf('month');
            currentDate.value = currentDate.value.year(year).month(month);

            updateValue(selectedDate.value);
        };

        const sendSelectYear = (year) => {
            selectedDate.value = null;
            currentDate.value = currentDate.value.year(year);

            currentDatePicker.value = month.value;
        };

        const close = () => {
            if (open.value) {
                open.value = false;
            }
        };

        const updateValue = (value) => {
            selectedDate.value = value ? value : null;
            displayValue(value);
            context.emit('update:modelValue', globalPlugins.$toDateTimeOffset(value));
            context.emit('callback');
            open.value = false;
        };

        const displayValue = (date) => {
            currentValue.value = date != null ? globalPlugins.$toCustomDate(date, defaultFormat.value) : null;
        };

        onMounted(() => {
            if (props.modelValue) {
                displayValue(props.modelValue);
                context.emit('update:modelValue', globalPlugins.$toDateTimeOffset(props.modelValue));
            }

            currentDatePicker.value = month.value;
        });

        return {
            open, pickerTypes, defaultFormat, yearSize, months, currentDatePicker, currentDate, currentValue, selectedDate,
            month, year, minDate, maxDate, init, verifyDateRange, getNewDate, getDisabledStatus, selectedMonthFormat, selectedYearFormat,
            isSelectedMonth, isSelectedYear, sendSelectMonth, sendSelectYear, close, updateValue, displayValue
        };
    }
};
</script>
