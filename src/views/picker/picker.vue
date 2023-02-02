<template>
    <div class="container">
        <div class="picker">
            <datePicker v-model="selectedDate" @callback="datePickerCallback"></datePicker>
            <p class="picker-message">{{ datePickerCallbackMessage }}：{{ selectedDate }}</p>
        </div>
    
        <div class="picker">
            <dateRangePicker v-model:startDate="selectedRangeDate.startDate" v-model:endDate="selectedRangeDate.endDate" @callback="dateRangePickerCallback"></dateRangePicker>
            <p class="picker-message">{{ dateRangePickerCallbackMessage }}：{{ selectedRangeDate.startDate }} <span v-if="selectedRangeDate.startDate">至</span> {{ selectedRangeDate.endDate }}</p>
        </div>
    
        <div class="picker">
            <monthPicker v-model="selectedMonth" @callback="monthPickerCallback"></monthPicker>
            <p class="picker-message">{{ monthPickerCallbackMessage }}：{{ selectedMonth }}</p>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import url from '@/router/url';
import datePicker from '@/components/picker/date-picker/date-picker.vue';
import monthPicker from '@/components/picker/month-picker/month-picker.vue';
import dateRangePicker from '@/components/picker/date-range-picker/date-range-picker.vue';

export default {
    name: url.picker.name,
    components: { datePicker, monthPicker, dateRangePicker },
    setup() {
        let selectedDate = ref(null);
        let selectedMonth = ref(null);
        let selectedRangeDate = reactive({
            startDate: null,
            endDate: null
        });

        let datePickerCallbackMessage = ref("尚未選擇日期");
        let monthPickerCallbackMessage = ref("尚未選擇月份");
        let dateRangePickerCallbackMessage = ref("尚未選擇日期區間");

        const datePickerCallback = () => {
            datePickerCallbackMessage.value = selectedDate.value ? "已選擇日期" : "尚未選擇日期";
        };

        const monthPickerCallback = () => {
            monthPickerCallbackMessage.value = selectedMonth.value ? "已選擇月份" : "尚未選擇月份";
        };

        const dateRangePickerCallback = () => {
            dateRangePickerCallbackMessage.value = (selectedRangeDate.startDate && selectedRangeDate.endDate) ? "已選擇日期區間" : "尚未選擇日期區間";
        };

        return{
            selectedDate, selectedMonth, selectedRangeDate,
            datePickerCallbackMessage, dateRangePickerCallbackMessage, monthPickerCallbackMessage,
            datePickerCallback, monthPickerCallback, dateRangePickerCallback
        }
    }
}

</script>

<style lang="scss" scoped>

    .picker {
        margin-bottom: 5rem;
    }

    .picker-message {
        margin-top: 8px;
    }
</style>