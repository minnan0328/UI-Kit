<template>
    <div class="container">
        <button class="btn-emerald btn-group" @click="toast">Toast</button>
        <button class="btn-emerald btn-group" @click="alert">Alert</button>
        <button class="btn-emerald btn-group" @click="confirm">Confirm</button>
    </div>

</template>
<script>
import { ref, getCurrentInstance } from 'vue';

export default {
    setup() {
        const app = getCurrentInstance();
        const globalPlugins = app.appContext.config.globalProperties;

        const toast = () => {
            globalPlugins.$toast('title', 'Before Moammar Long language string Long language string Long language string Long language string, there were the Phoenicians.');

        };

        const alert = () => {
            globalPlugins.$alert('title', 'Before Moammar Long language string Long language string Long language string Long language string, there were the Phoenicians.');
        };

        const confirm = () => {
            globalPlugins.$confirm({
                title: 'title',
                message: 'messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage',
                ok: () => {
                    console.log('ok');
                }
            });
        };

        return { toast, alert, confirm };
    }
}
</script>
<style lang="scss" scoped>
    
</style>