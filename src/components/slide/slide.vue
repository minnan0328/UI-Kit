<template>
    <transition :name="transitionName">
        <div class="slide" ref="slide">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { ref, watch, onMounted, onUnmounted, inject  } from 'vue';

let transitionsType = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
};

export default {
    setup() {
        
        const { currentSlide, slideAmount, transitionName, isTransitionend } = inject('carousel');
        const slide = ref(null);
        const transitionEvent = ref(null);

        const currentTransitionsType = (el) => {
            for(let t in transitionsType) {
                if( el.style[t] !== undefined ){
                    return transitionsType[t];
                };
            };
        };

        const toggleActive = () => {
            isTransitionend.value = true;
        };

        onMounted(() => {
            transitionEvent.value = currentTransitionsType(slide.value);
            slide.value.addEventListener(transitionEvent.value, toggleActive);
        });

        onUnmounted(() => {
            slide.value.removeEventListener(transitionEvent.value, toggleActive);
        });


        return { slide, transitionName };
    }
}
</script>

<style lang="scss" scoped>
    .carousel-slide-right-enter-from,
    .carousel-slide-left-leave-to {
        left: 100%;
    }

    .carousel-slide-right-enter-active,
    .carousel-slide-right-leave-active,
    .carousel-slide-left-enter-active,
    .carousel-slide-left-leave-active  {
        transition: left 0.5s ease-in-out;
    }

    .carousel-slide-right-enter-to,
    .carousel-slide-right-leave-from,
    .carousel-slide-left-enter-to,
    .carousel-slide-left-leave-from {
        left: 0%;
    }

    .carousel-slide-right-leave-to,
    .carousel-slide-left-enter-from {
        left: -100%;
    }
</style>