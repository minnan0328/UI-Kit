<template>

    <div class="images">
        <owlCarousel :autoPlay="false" :customItemHeight="400">
            <owlSlide v-for="(image ,idx) of images" :key="idx">
                <img :src="image.media" :alt="image.mediaText" />
            </owlSlide>
        </owlCarousel>
    </div>

    <div class="images">
        <owlCarousel :autoPlay="false" :perPage="1" :customItemHeight="400">
            <owlSlide v-for="(video ,idx) of videos" :key="idx">
                <video :src="video.media" :alt="video.mediaText" muted autoplay loop playsInline></video>
            </owlSlide>
        </owlCarousel>
    </div>

    <div class="images">
        <owlCarousel :autoPlay="false" :perPage="4" :customItemHeight="400">
            <owlSlide v-for="(image ,idx) of 12" :key="idx" >
                <img src="https://picsum.photos/400/400" alt="picsum" />
            </owlSlide>
        </owlCarousel>
    </div>

    <div class="images">
        <owlCarousel :autoPlay="false" :perPage="6" :customItemWidth="400" :customItemHeight="400">
            <owlSlide v-for="(image ,idx) of 12" :key="idx" >
                <img src="https://picsum.photos/400/400" alt="picsum" />
            </owlSlide>
        </owlCarousel>
    </div>

    <div class="images">
        <carousel v-slot:default="{ currentSlide }" :customHeight="400">
            <slide v-for="(image ,idx) of images" :key="idx" v-show="(idx === currentSlide)">
                <img :src="image.media" :alt="image.mediaText" />
            </slide>
        </carousel>
    </div>

    <p>不啟用自動輪播</p>
    <div class="images">
        <carousel v-slot:default="{ currentSlide }" :autoPlay="false" :navigationBtnSmall="true" :customHeight="200" :customWidth="200">
            <slide v-for="(image ,idx) of images" :key="idx" v-show="(idx === currentSlide)">
                <img :src="image.media" :alt="image.mediaText" />
            </slide>
        </carousel>
    </div>
    
    <p>影片</p>
    <div class="videos">
        <carousel v-slot:default="{ currentSlide }">
            <slide v-for="(video ,idx) of videos" :key="idx" v-show="(idx === currentSlide)">
                <a :href="video.url" target="_blank">
                    <video :src="video.media" :alt="video.mediaText" muted autoplay loop playsInline></video>
                </a>
            </slide>
        </carousel>
    </div>

</template>
<script>
import { reactive  } from 'vue';
import carousel from '@/components/carousel/carousel.vue';
import owlCarousel from '@/components/owl-carousel/owl-carousel.vue';
import slide from '@/components/slide/slide.vue';
import owlSlide from '@/components/slide/owl-slide.vue';

export default {
    components: { carousel, owlCarousel, slide, owlSlide },
    setup() {
        const images = reactive([
            { url: '', media: new URL('@/assets/images/full-images/annie-spratt-S7viz8JWxwY-unsplash.jpg', import.meta.url).href, mediaText: 'annie' },
            { url: '', media: new URL('@/assets/images/full-images/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg', import.meta.url).href, mediaText: 'daiga' },
            { url: '', media: new URL('@/assets/images/full-images/josefin-WS5yjFjycNY-unsplash.jpg', import.meta.url).href, mediaText: 'daiga' }
        ]);

        const videos = reactive([
            { url: 'https://www.pexels.com/video/black-and-white-video-of-people-853889/', media: new URL('@/assets/videos/Pexels-Videos-2670.mp4', import.meta.url).href, mediaText: '' },
            { url: 'https://www.pexels.com/video/people-watching-a-band-854054/', media: new URL('@/assets/videos/Pexels-Videos-2834.mp4', import.meta.url).href, mediaText: '' },
            { url: 'https://www.pexels.com/video/video-of-people-walking-855564/', media: new URL('@/assets/videos/Video-Of-People-Walking.mp4', import.meta.url).href, mediaText: '' }
        ]);


        return {
            images, videos
        };
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/_var';

    .images, .videos {
        padding: 16px 0 32px;
    }

</style>