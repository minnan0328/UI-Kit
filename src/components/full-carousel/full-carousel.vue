<template>
    <carousel v-slot:default="{ currentSlide }">
        <slide v-for="(option ,idx) of options" :key="idx" v-show="(idx === currentSlide)">
            <img :src="option.media" :alt="option.mediaText" />
        </slide>
    </carousel>
</template>

<script>
import { reactive  } from 'vue';
import carousel from '@/components/carousel/carousel.vue';
import slide from '@/components/slide/slide.vue';

export default {
    components: { carousel, slide },
    setup(props, context) {

        const options = reactive([
            { url: '', media: new URL('@/assets/images/full-images/annie-spratt-S7viz8JWxwY-unsplash.jpg', import.meta.url).href, mediaText: 'annie' },
            { url: '', media: new URL('@/assets/images/full-images/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg',import.meta.url).href, mediaText: 'daiga' },
            { url: '', media: new URL('@/assets/images/full-images/josefin-WS5yjFjycNY-unsplash.jpg',import.meta.url).href, mediaText: 'daiga' },
        ]);

        return { options };
    }
}
</script>

<style lang="scss" scoped></style>

