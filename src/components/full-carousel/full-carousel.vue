<template>
    <div class="full-carousel">
        <transition-group tag="div" class="medias" :name="transitionName" ref="medias">
            <!-- <div class="page" v-if="$slots.default">
            </div> -->
            <!-- <img v-for="(option ,idx) of options" :key="idx" :src="option.media" :alt="option.mediaText"  /> -->

            <!-- <slot name="default"></slot> -->


            <div class="page" v-for="(option ,index) of options" :key="index" v-show="(index === currentPage)">
                <img :src="option.media" :alt="option.mediaText" >
            </div>
        </transition-group>
        

        <template v-if="navigationEnabled">
            <button class="btn-icon btn-media icon-arrow-left"></button>
            <button class="btn-icon btn-media icon-arrow-right"></button>
        </template>

    </div>
</template>

<style lang="scss" scoped src="./full-carousel.scss"></style>

<script>
import { ref, reactive, computed, watch, onMounted, getCurrentInstance  } from 'vue';

export default {
    props: {
        options: {
            type: Object
        },
        perPage: {
            type: Number,
            default: 1
        },
        navigationEnabled: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {
        const app = getCurrentInstance();
        const globalPlugins = app.appContext.config.globalProperties;

        const transitionName = 'carousel-slide-right';
        const media = ref();
        const currentPage = ref(0);
        const numOfPages = ref(context.slots.default()[0].children.length - 1);


        return {
            transitionName, currentPage
        };
    }
}
</script>
