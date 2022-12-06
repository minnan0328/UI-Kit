<template>
    <transition :name="transitionName">
        <div class="slide" ref="slide">
            <slot></slot>
        </div>
    </transition>

</template>

<script>
import { ref, onMounted, inject  } from 'vue';

export default {
    name: "slide",
    setup() {
        
        const { toggleActive, transitionName } = inject('carousel');
        const slide = ref(null);

        onMounted(() => {
            slide.value.ontransitionend = () => toggleActive();
            slide.value.ontransitioncancel = () => toggleActive();
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