<template>
    <div class="full-carousel">
        <transition-group tag="div" class="media" :name="transitionName">
            <slot name="media" :key="4"></slot>
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
import mediaType from '@/models/enum/media-type.js';

export default {
    props: {
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
    setup(props,context) {
        const app = getCurrentInstance();
        const globalPlugins = app.appContext.config.globalProperties;

        const transitionName = 'carousel-slide-left';


        return {
            transitionName
        };
    }
}
</script>
