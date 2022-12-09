import { ref, watch, onMounted  } from 'vue';

export function useSlide ({ autoPlay, timeDetention, carouselsInner }) {

    const slideElement = ref(null);
    const slideAmount = ref(0);
    const currentSlide = ref(0);
    const interval = ref(null);
    const transitionName = ref('carousel-slide-right');
    const isTransitionend = ref(true);

    /* 上一個 slide */
    const prevSlide = () => {
        if(isTransitionend.value) {
            currentSlide.value -= 1;
            isTransitionend.value = false;
        };
    };

    /* 下一個 slide */
    const nextSlide = () => {
        if(isTransitionend.value) {
            currentSlide.value += 1;
            isTransitionend.value = false;
        };
    };

    /*  change slide */
    const changeSlide = (count) => {
        currentSlide.value = count;
    };

    /*  判斷是否啟用自動播放 */
    const enabledAutoPlay = () => {
        if(autoPlay) {
            interval.value = setInterval(() => {
                nextSlide();
            }, timeDetention);
        };
    };

    /*  暫停自動播放 */
    const pauseAutoPlay = () => {
        clearInterval(interval.value);
    };

    /*  避免連續點擊控制 */
    const toggleActive = () => {
        isTransitionend.value = true;
    };

    watch(currentSlide, ( newValue, oldValue ) => {
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

        slideElement.value = [...carouselsInner.value.children].filter(carousel => carousel.className === 'slide');
        slideAmount.value = slideElement.value.length;

        /*  判斷是否啟用自動播放 */
        if(autoPlay) {
            enabledAutoPlay();
        };

    });

    return {
        currentSlide, slideAmount, transitionName, isTransitionend, 
        prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay, toggleActive
    };
};