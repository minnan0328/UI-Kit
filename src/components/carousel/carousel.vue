<template>
    <div class="carousel">
        <slot :currentSlide="currentSlide"></slot>

        <div class="navigation" v-if="navigationEnabled">
            <button class="btn-icon btn-navigation icon-arrow-left" @click="prevSlide()"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"
                    @touchstart="pauseAutoPlay" @touchend="enabledAutoPlay">
            </button>
            <button class="btn-icon btn-navigation icon-arrow-right" @click="nextSlide()"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"
                    @touchstart="pauseAutoPlay" @touchend="enabledAutoPlay">
            </button>
        </div>

        <div class="pagination" v-if="paginationEnabled">
            <button :class="['btn-icon btn-pagination', { 'active': currentSlide == idx }]"
                    v-for="(slideBtn, idx) of slideAmount" :key="idx" @click="changeSlide(idx)"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"
                    @touchstart="pauseAutoPlay" @touchend="enabledAutoPlay">
            </button>
        </div>
    </div>
</template>
<script>

import { computed, provide } from 'vue';
import { useSlide } from '@/components/carousel/hooks/sliding-hook.js';

export default {
    name: 'carousel',
    props: {
        /* 自動播放 */
        autoPlay: {
            type: Boolean,
            default: true
        },
        /* 動畫過渡時間，單位豪秒 */
        timeDetention: {
            type: Number,
            default: 5000
        },
        /* 左右箭頭啟用或停用 */
        navigationEnabled: {
            type: Boolean,
            default: true
        },
        /* 分頁功能啟用或停用 */
        paginationEnabled: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {

        /* 取得自訂左右箭頭啟用或停用，當無自訂時預設為啟用 */
        const navigationEnabled = computed(() => props.navigationEnabled ? props.navigationEnabled : true);
        /* 取得自訂分頁功能啟用或停用，當無自訂時預設為啟用 */
        const paginationEnabled = computed(() => props.paginationEnabled ? props.paginationEnabled : true);

        const {
            currentSlide, slideAmount, transitionName, isTransitionend,
            prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay, toggleActive
        } = useSlide(props);

        provide('carousel', { toggleActive, transitionName });

        return {
            currentSlide, slideAmount, isTransitionend,
            navigationEnabled, paginationEnabled,
            prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay
        };
    }
}
</script>
<style lang="scss" scoped src="./carousel.scss"></style>