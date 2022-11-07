<template>
    <div>
        home
        <router-link :to="{ name: urlPath.dialog.name }">{{ urlPath.dialog.meta.title }}</router-link>
    </div>
</template>
<script>
import { ref } from 'vue';
import url from '@/router/uri';

export default {
    setup() {
        const urlPath = ref(url);

        return { urlPath };
    }
}
</script>
<style lang="scss" scoped>
    
</style>