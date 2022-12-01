<template>
    <div class="carousel" @mouseover="pauseAutoPlay" @mouseout="enabledAutoPlay">
        <slot :currentSlide="currentSlide"></slot>

        <div class="navigation" v-if="navigationEnabled">
            <button class="btn-icon btn-media icon-arrow-left" @click="prevSlide()"></button>
            <button class="btn-icon btn-media icon-arrow-right" @click="nextSlide()"></button>
        </div>

        <div class="pagination" v-if="paginationEnabled">
            <button :class="['btn-icon btn-pagination', { 'active': currentSlide == idx }]"
                    v-for="(slideBtn, idx) of slideAmount" :key="idx" @click="changeSlide(idx)">
            </button>
        </div>
    </div>
</template>
<script>

import { ref, computed, onMounted, provide } from 'vue';

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

        const navigationEnabled = computed(() => props.navigationEnabled ? props.navigationEnabled : true);
        const paginationEnabled = computed(() => props.paginationEnabled ? props.paginationEnabled : true);

        const prevSlide = () => {
            if(currentSlide.value == 0) {
                currentSlide.value = slideAmount.value -1;
                return;
            };

            currentSlide.value -= 1;
        };

        const nextSlide = () => {
            if(currentSlide.value == slideAmount.value - 1) {
                currentSlide.value = 0;
                return;
            };

            currentSlide.value += 1;
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

        onMounted(() => {
            slideElement.value = document.querySelectorAll('.slide');
            slideAmount.value = slideElement.value.length;

            if(props.autoPlay) {
                enabledAutoPlay();
            };
        });

        provide('carousel', { currentSlide, slideAmount });

        return {
            currentSlide, slideAmount,
            navigationEnabled, paginationEnabled,
            prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay
        };
    }
}
</script>
<style lang="scss" scoped src="./carousel.scss"></style>