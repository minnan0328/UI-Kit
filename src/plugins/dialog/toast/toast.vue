<template>
    <modal v-model:show="show" @backClick="close">
        <div class="toast" >
            <div class="header" v-if="showTitle">
                <h3 class="title">{{ showTitle }}</h3>
                <button class="btn-icon icon-close" @click="show = false"></button>
            </div>
            <div class="content">
                <p class="text">{{ showMessage }}</p>
                <p class="hint">稍後將自動返回頁面，或者您可以點選 [X] 關閉提示。</p>
            </div>
        </div>
    </modal>
</template>
<script>

import { ref, watch } from 'vue';
import modal from '@/components/modal/modal.vue';
import site from '@/services/site';

export default {
    components: { modal },
    setup() {

        // data
        const show = ref(false);
        const showTitle = ref(null);
        const showMessage = ref(null);

        // watch
        watch(show, (newValue, oldValue) => {
            // 由於此訊息彈窗會有跟一般彈窗一起使用的狀況，如果直接切換 scrollbar 會讓一般彈窗還在開啟時就出現 scrollbar
            // 故需要在開啟時判斷若 scrollbar 是顯示狀態，代表不是在彈窗內使用訊息視窗，此時才做 scrollbar 的切換
            newValue == true ? site.hideScrollbar() : site.showScrollbar();
        });

        // methods
        const open = (title = null , message) => {
            show.value = true;
            showTitle.value = title;
            showMessage.value = message;

            setTimeout(() => {
                close();
            }, 3000);
        };

        const close = () => {
            show.value = false;
        }


        return {
            show, showTitle, showMessage, open, close
        };
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/_var.scss';

.toast {
    width: 350px;
    min-height: 174px;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .title {
            color: $black;
            font-size: $font-size-20;
        }
    }

    .content {
        margin-bottom: 20px;
        .text {
            color: $black ;
            font-size: $font-size-14;
            overflow: hidden;
            word-break: break-all;
            text-align: justify;
            text-justify: inter-ideograph;
            font-weight: normal;
            font-size: $font-size-14;
        }

        .hint {
            color: $black;
            font-size: $font-size-12;
            margin-top: 6px;
        }
    }
}
</style>
