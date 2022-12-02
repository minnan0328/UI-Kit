<template>
    <div class="carousel">
        <slot :currentSlide="currentSlide"></slot>

        <div class="navigation" v-if="navigationEnabled">
            <button class="btn-icon btn-media icon-arrow-left" @click="prevSlide()" @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"></button>
            <button class="btn-icon btn-media icon-arrow-right" @click="nextSlide()" @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay"></button>
        </div>

        <div class="pagination" v-if="paginationEnabled">
            <button :class="['btn-icon btn-pagination', { 'active': currentSlide == idx }]"
                    v-for="(slideBtn, idx) of slideAmount" :key="idx" @click="changeSlide(idx)"
                    @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay">
            </button>
        </div>
    </div>
</template>
<script>

import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue';

export default {
    props: {
        autoPlay: {
            type: Boolean,
            default: true
        },
        timeDetention: {
            type: Number,
            default: 5000
        },
        navigationEnabled: {
            type: Boolean,
            default: true
        },
        paginationEnabled: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {

        const slideElement = ref(null);
        const slideAmount = ref(0);
        const currentSlide = ref(0);
        const interval = ref(null);
        const transitionName = ref('carousel-slide-right');
        const isTransitionend = ref(true);

        const navigationEnabled = computed(() => props.navigationEnabled ? props.navigationEnabled : true);
        const paginationEnabled = computed(() => props.paginationEnabled ? props.paginationEnabled : true);

        const prevSlide = () => {
            if(isTransitionend.value) {
                currentSlide.value -= 1;
                isTransitionend.value = false;
            };
        };

        const nextSlide = () => {
            if(isTransitionend.value) {
                currentSlide.value += 1;
                isTransitionend.value = false;
            };
        };

        const changeSlide = (count) => {
            currentSlide.value = count;
        };

        const enabledAutoPlay = () => {
            if(props.autoPlay) {
                interval.value = setInterval(() => {
                    nextSlide();
                }, props.timeDetention);
            };
        }

        const pauseAutoPlay = () => {
            clearInterval(interval.value);
        };

        watch(currentSlide, (newValue, oldValue) => {
            if(newValue < 0) {
                currentSlide.value = slideAmount.value - 1;
            } else if(newValue > slideAmount.value - 1) {
                currentSlide.value = 0;
            } else {
                transitionName.value = oldValue < 0
                    ? 'carousel-slide-left'
                    : oldValue > slideAmount.value - 1
                    ? 'carousel-slide-right'
                    : newValue > oldValue
                    ? 'carousel-slide-right'
                    : 'carousel-slide-left';
            };
        });

        onMounted(() => {
            slideElement.value = document.querySelectorAll('.slide');
            slideAmount.value = slideElement.value.length;

            if(props.autoPlay) {
                enabledAutoPlay();
            };
        });

        provide('carousel', { currentSlide, slideAmount, transitionName, isTransitionend });

        return {
            currentSlide, slideAmount,
            navigationEnabled, paginationEnabled,
            prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay
        };
    }
}
</script>
<style lang="scss" scoped src="./carousel.scss"></style>