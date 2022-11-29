<template>
    <div>carousel</div>
    <fullCarousel :perPage="options.length">
        <template  v-slot:media>
                <img v-for="(option ,idx) in options" :key="idx" :src="option.media" :alt="option.mediaText">
        </template>
    </fullCarousel>
</template>
<script>
import { ref, reactive } from 'vue';
import fullCarousel from '@/components/full-carousel/full-carousel.vue';
import mediaType from '@/models/enum/media-type.js';

export default {
    components: { fullCarousel },
    setup() {

        const options = reactive([
            { url: '', media: new URL('@/assets/images/full-images/annie-spratt-S7viz8JWxwY-unsplash.jpg', import.meta.url).href, mediaText: 'annie', mediaType: mediaType.image },
            { url: '', media: new URL('@/assets/images/full-images/avinash-kumar-xT7OuIFew3Q-unsplash.jpg', import.meta.url).href, mediaText: 'avinash', mediaType: mediaType.image},
            { url: '', media: new URL('@/assets/images/full-images/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg',import.meta.url).href, mediaText: 'daiga', mediaType: mediaType.image},
            { url: '', media: new URL('@/assets/images/full-images/josefin-WS5yjFjycNY-unsplash.jpg',import.meta.url).href, mediaText: 'daiga', mediaType: mediaType.image},
        ])
        return { options };
    }
}
</script>
<style lang="scss" scoped>
    
</style>