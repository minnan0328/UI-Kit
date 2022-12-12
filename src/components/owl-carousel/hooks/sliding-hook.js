import { ref, reactive, watch, onMounted  } from 'vue';

export function useSlide ({ props, carouselsInner }) {

    const slideElement = ref(null);
    const slideAmount = ref(0);
    const currentSlide = ref(0);
    const interval = ref(null);
    const isTransitionend = ref(true);

    const carouselState = reactive({
        isPressed: false,
        startX: 0,
        offsetLeft: null,
        carouselLeft: '0%',
        offsetWidth: 0
    });

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
        if(props.autoPlay) {
            interval.value = setInterval(() => {
                nextSlide();
            }, props.timeDetention);
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
            currentSlide.value = 0;
            toggleActive();
        } else if(newValue > slideAmount.value - 1) {
            currentSlide.value = slideAmount.value - 1;
            toggleActive();
        } else {
            carouselState.carouselLeft = `-${currentSlide.value * 100}%`;
        }
    });

    const handleMouseDown = (e) => {
        carouselState.isPressed = true;
        carouselState.startX = e.pageX;
        carouselState.pageX = e.pageX - carouselsInner.value.offsetLeft;
        carouselState.offsetWidth = carouselsInner.value.offsetWidth;
    };

    const handleMouseMove = (e) => {
        if(!carouselState.isPressed) {
            return
        };
        
        e.preventDefault();

        const currentPageX = (((e.pageX - carouselState.pageX) / carouselState.offsetWidth) * slideAmount.value) * 100;
        const movingRange = ((carouselState.startX - e.pageX) / (carouselState.offsetWidth / slideAmount.value)) * 100;
        
        if(e.pageX < carouselState.startX && movingRange > 0 && movingRange > 30) {
            e.preventDefault();
            nextSlide();
            isTransitionend.value = false;
        } else if(e.pageX > carouselState.startX && movingRange < 0 && movingRange < -10) {
            e.preventDefault();
            prevSlide();
            isTransitionend.value = false;
        } else {
            carouselState.carouselLeft = `${currentPageX}%`;
        }

    };

    const handleMouseLeave = (e) => {
        carouselState.isPressed = false;
    };

    const handleMouseUp = (e) => {
        carouselState.isPressed = false;
        const movingRange = ((carouselState.startX - e.pageX) / (carouselState.offsetWidth / slideAmount.value)) * 100;

        if(e.pageX < carouselState.startX && movingRange > 0 && movingRange < 30 || e.pageX > carouselState.startX && movingRange < 0 && movingRange > -10)  {
            carouselState.carouselLeft = `-${currentSlide.value * 100}%`;
        }
    };

    onMounted(() => {
        
        slideElement.value = [...carouselsInner.value.children].filter(carousel => carousel.className === 'owl-slide');
        slideAmount.value = slideElement.value.length;

        /*  判斷是否啟用自動播放 */
        if(props.autoPlay) {
            enabledAutoPlay();
        };

    });

    return {
        currentSlide, slideAmount, isTransitionend, carouselState,
        prevSlide, nextSlide, changeSlide, enabledAutoPlay, pauseAutoPlay, toggleActive,
        handleMouseDown, handleMouseMove ,handleMouseLeave, handleMouseUp
    };
};