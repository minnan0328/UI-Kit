<template src="./modal.html"></template>
<style lang="scss" src="./modal.scss" scoped></style>
<script>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import site from '@/services/site';

export default {
    props: {
        // 顯示/關閉 modal
        show: {
            type: Boolean,
            required: true,
            default: false
        },
        // 啟用 modal。如果設為 false 則其他選項無效，slot 的內容將會以原本樣式呈現，不會受到 modal 樣式影響
        // 主要用於跟其他組件搭配，例如在 pc 版型要用一般樣式，但到了 phone 要用彈窗樣式，則可以在 pc 時設為 false，在 phone 時設為 true
        enable: {
            type: Boolean,
            default: true
        },
        enableBackground: {
            // 預設為白色背景，當不需要背景時請設定為 false
            type: Boolean,
            default: true
        }
    },
    emits: ['update:show', 'backClick'],
    setup(props, context) {
        const modal = ref(null);

        // watch
        watch(() => props.show ,() => {
            if (props.enable) {
                nextTick(() => {
                    props.show == true ? site.hideScrollbar() : site.showScrollbar();
                });
            }
        }, { immediate: true });

        // methods
        const backClick = (event) => {
            // 只有點擊事件發生的區塊為 modal（背景區塊）時才執行動作
            if (modal.value == event.target) {
                context.emit('backClick');
            };
        };

        onBeforeUnmount(() => {
            site.showScrollbar();
        });

        return {
            modal, backClick
        };
    }
};
</script>
