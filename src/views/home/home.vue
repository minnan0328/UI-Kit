<template>
    <fullCarousel class="full-carousel"></fullCarousel>
</template>
<script>
import { ref } from 'vue';
import url from '@/router/url';
import fullCarousel from '@/components/full-carousel/full-carousel.vue';

export default {
    name: url.home.name,
    components: { fullCarousel },
    setup() {
        const urlPath = ref(url);


        return { urlPath };
    }
}
</script>
<style lang="scss" scoped>
    .full-carousel {
        position: absolute;
        top: 0;
    }
</style>