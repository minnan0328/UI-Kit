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

@import '@/styles/_var';
    .full-carousel {
        min-height: 400px;
        height: 100%;
    }

    @include phone {
        .full-carousel {
            min-height: 200px;
        }
    }
</style>