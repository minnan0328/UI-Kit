<template>
    <div  class="full-carousel">
        <fullCarousel></fullCarousel>
    </div>
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
        max-height: 400px;
    }

    @include phone {
        .full-carousel {
            max-height: 200px;
        }
    }
</style>