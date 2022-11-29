<template>
    <div class="full-carousel">
        <div class="media">
            <slot name="media"></slot>
        </div>

        <template v-if="navigationEnabled">
            <button class="btn-icon btn-media icon-arrow-left"></button>
            <button class="btn-icon btn-media icon-arrow-right"></button>
        </template>

    </div>
</template>

<style lang="scss" scoped src="./full-carousel.scss"></style>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue';
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
    setup(props) {
        
    }
}
</script>
