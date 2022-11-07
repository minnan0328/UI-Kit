import { directive } from 'vue3-click-away';

// 點擊綁定元素的外部區塊時觸發事件。用於 dropdown、彈窗等點擊自身以外的地方時觸發關閉動作的元素
const install = function(Vue) {
    Vue.directive('clickaway', directive);
};

export default { install };
