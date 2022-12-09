<template>
    <div class="carousel" ref="carousels"
        :style="{ '--customItemWidth': customItemWidth ? `${customItemWidth}px` : `100vw`,
                  '--customItemHeight': customItemHeight ? `${customItemHeight}px` : `100vh`
                }">

        <div class="slide-inner" ref="carouselsInner"
            @mousedown="handleMouseDown"
            @mouseleave="handleMouseLeave"
            @mouseup="handleMouseUp"
            @mousemove="handleMouseMove"
            :style="{'--carouselLeft': carouselState.carouselLeft}">
            <slot :currentSlide="currentSlide"></slot>
        </div>

        <div :class="['navigation', { 'nav-small': navigationBtnSmall }]" v-if="navigationEnabled">
            <button class="btn-icon btn-navigation icon-arrow-left" @click.self="prevSlide()"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"
                    @touchstart="pauseAutoPlay" @touchend="enabledAutoPlay">
            </button>
            <button class="btn-icon btn-navigation icon-arrow-right" @click.self="nextSlide()"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"
                    @touchstart="pauseAutoPlay" @touchend="enabledAutoPlay">
            </button>
        </div>

        <div class="pagination" v-if="paginationEnabled">
            <button :class="['btn-icon btn-pagination', { 'active': currentSlide == idx }]"
                    v-for="(slideBtn, idx) of slideAmount" :key="idx" @click.self="changeSlide(idx)"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"
                    @touchstart="pauseAutoPlay" @touchend="enabledAutoPlay">
            </button>
        </div>
    </div>
</template>
<script>

import { ref, reactive, computed, onMounted, provide } from 'vue';
import { useSlide } from '@/components/smooth-carousel/hooks/sliding-hook.js';

export default {
    name: 'smooth-carousel',
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
        },
        /* 左右箭頭大小，預設為大 */
        navigationBtnSmall: {
            type: Boolean,
            default: false
        },
        customItemWidth: {
            type: Number,
            default: null
        },
        customItemHeight: {
            type: Number,
            default: null
        }
    },
    setup(props) {

        const carousels = ref(null);
        const carouselsInner = ref(null);
        const carouselState = reactive({
            isPressed: false,
            startX: 0,
            carouselLeft: '0px'
        });

        /* 取得自訂左右箭頭啟用或停用，當無自訂時預設為啟用 */
        const navigationEnabled = computed(() => props.navigationEnabled ? props.navigationEnabled : true);
        /* 取得自訂分頁功能啟用或停用，當無自訂時預設為啟用 */
        const paginationEnabled = computed(() => props.paginationEnabled ? props.paginationEnabled : true);

        const {
            currentSlide, slideAmount, transitionName, isTransitionend,
            prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay, toggleActive
        } = useSlide({...props, carouselsInner});

        const handleMouseDown = (e) => {
            carouselState.isPressed = true;
            carouselState.startX = e.pageX - carouselsInner.value.offsetLeft;
        };

        const handleMouseMove = (e) => {
            if(!carouselState.isPressed) {
                return
            };
            
            e.preventDefault();

            const currentPageX = e.pageX;
            carouselState.carouselLeft = `${currentPageX - carouselState.startX}px`;
            
            checkBoundary();

        };

        const handleMouseLeave = (e) => {
            carouselState.isPressed = false;
        };

        const handleMouseUp = (e) => {
            carouselState.isPressed = false;
        };

        const checkBoundary = () => {
            let outer = carousels.value.getBoundingClientRect();
            let inner = carouselsInner.value.getBoundingClientRect();

            if (outer.left < inner.left) {
                carouselState.isPressed = false;
                carouselState.carouselLeft = '0px';
            };

            if (inner.right < outer.right) {
                carouselState.isPressed = false;
                carouselState.carouselLeft = `-${inner.width - outer.width}px`;
            };

            return carouselState.isPressed;
        }

        provide('carousel', { toggleActive, transitionName });

        return {
            carousels, carouselsInner, carouselState, currentSlide, slideAmount, isTransitionend,
            navigationEnabled, paginationEnabled,
            handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove,
            prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay
        };
    }
}
</script>
<style lang="scss" scoped src="./smooth-carousel.scss"></style>