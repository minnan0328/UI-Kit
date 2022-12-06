<template>
    <div class="images full-images">
        <carousel v-slot:default="{ currentSlide }">
            <slide v-for="(image ,idx) of images" :key="idx" v-show="(idx === currentSlide)">
                <img :src="image.media" :alt="image.mediaText" />
            </slide>
        </carousel>
    </div>

    <p>不啟用自動輪播</p>
    <div class="images small-images">
        <carousel v-slot:default="{ currentSlide }" :autoPlay="false" :navigationBtnSmall="true">
            <slide v-for="(image ,idx) of images" :key="idx" v-show="(idx === currentSlide)">
                <img :src="image.media" :alt="image.mediaText" />
            </slide>
        </carousel>
    </div>
    
    <p>影片</p>
    <div class="videos small-video">
        <carousel v-slot:default="{ currentSlide }">
            <slide v-for="(video ,idx) of videos" :key="idx" v-show="(idx === currentSlide)">
                <a :href="video.url" target="_blank">
                    <video :src="video.media" :alt="video.mediaText" muted autoplay loop></video>
                </a>
            </slide>
        </carousel>
    </div>
</template>
<script>
import { reactive  } from 'vue';
import carousel from '@/components/carousel/carousel.vue';
import slide from '@/components/slide/slide.vue';

export default {
    components: { carousel, slide },
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

    .full-images {
        max-height: 400px;
    }
    .small-images {
        max-height: 200px;
        max-width: 200px;
    }
    .small-video {
        max-width: 720px;
        max-height: 480px;
    }

    @include phone {

        .full-images {
            max-height: 200px;
        }
        .small-images {
            max-height: 200px;
            max-width: 320px;
        }
    }
</style>