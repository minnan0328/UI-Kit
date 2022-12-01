<template>
    <carousel v-slot:default="{ currentSlide }">
        <slide v-for="(option ,idx) of options" :key="idx" v-show="(idx ===currentSlide)" >
            <img :src="option.media" :alt="option.mediaText" />
        </slide>
    </carousel>
</template>

<script>
import { reactive  } from 'vue';
import carousel from '@/components/carousel/carousel.vue';
import slide from '@/components/slide/slide.vue';
import mediaType from '@/models/enum/media-type.js';

export default {
    components: { carousel, slide },
    setup(props, context) {

        const options = reactive([
            { url: '', media: new URL('@/assets/images/full-images/annie-spratt-S7viz8JWxwY-unsplash.jpg', import.meta.url).href, mediaText: 'annie', mediaType: mediaType.image },
            { url: '', media: new URL('@/assets/images/full-images/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg',import.meta.url).href, mediaText: 'daiga', mediaType: mediaType.image},
            { url: '', media: new URL('@/assets/images/full-images/josefin-WS5yjFjycNY-unsplash.jpg',import.meta.url).href, mediaText: 'daiga', mediaType: mediaType.image},
        ])

        return { options };
    }
}
</script>

<style lang="scss" scoped></style>

