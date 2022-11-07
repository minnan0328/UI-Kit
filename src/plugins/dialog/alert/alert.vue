<template>
    <modal v-model:show="show">
        <div class="dialog">
            <div class="header" v-if="showTitle">
                <h3 class="title">{{ showTitle }}</h3>
            </div>
            <div class="content">
                <p class="text">{{ showMessage }}</p>
            </div>
            <div class="footer">
                <button class="btn-emerald btn-md" @click="show = false">確認</button>
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
        };

        const close = () => {
            show.value = false;
        }


        return {
            show, showTitle, showMessage, open, close
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/_var.scss';

.dialog {
    width: 350px;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
}

.header {
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
}

.footer {
    display: flex;
    justify-content: flex-end;
}
</style>
