import { ref, reactive, watch, onMounted  } from 'vue';

export function useSlide ({ props, carouselsInner }) {

    const slideElement = ref(null);
    const slideAmount = ref(0);
    const currentSlide = ref(0);
    const interval = ref(null);
    const isTransitionend = ref(true);
    const towingRange = ref(10);

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
        } else if( newValue > slideAmount.value - 1 ) {
            currentSlide.value = slideAmount.value - 1;
            toggleActive();
        } else {
            distanceTraveled();
        };
    });

    const handleMouseDown = (e) => {
        carouselState.isPressed = true;
        carouselState.startX = e.pageX;
        carouselState.offsetLeft = carouselsInner.value.offsetLeft;
        carouselState.offsetWidth = carouselsInner.value.offsetWidth;
    };

    const handleMouseMove = (e) => {
        if(!carouselState.isPressed) {
            return;
        };
        
        e.preventDefault();

        /* 目前移動距離：根據 (滑鼠每次移動 x 值 - (滑鼠點擊 x 值 - carousel-inner 的 offsetLeft) / carousel-inner 的 offsetWidth) * 總頁數) * 100 */
        const _currentPageX = (((e.pageX - (carouselState.startX - carouselState.offsetLeft)) / carouselState.offsetWidth) * slideAmount.value) * 100;

        /* 滑鼠點下時重新計算「滑鼠移動距離」:((滑鼠點擊 x 值 - 滑鼠每次移動 x 值) / (carousel-inner 的 offsetWidth / 總頁數)) * 100 */
        const _movingRange = ((carouselState.startX - e.pageX) / (carouselState.offsetWidth / slideAmount.value)) * 100;

        if(e.pageX < carouselState.startX && _movingRange > 0 && _movingRange > towingRange.value) {
            e.preventDefault();
            nextSlide();
            carouselState.isPressed = false;
            isTransitionend.value = false;
        } else if(e.pageX > carouselState.startX && _movingRange < 0 && _movingRange < -towingRange.value) {
            e.preventDefault();
            prevSlide();
            carouselState.isPressed = false;
            isTransitionend.value = false;
        } else {
            carouselState.carouselLeft = `${ _currentPageX }%`;
        };
    };

    const handleMouseLeave = (e) => {
        carouselState.isPressed = false;
    };

    const handleMouseUp = (e) => {
        carouselState.isPressed = false;
        
        /* 滑鼠點下時重新計算「滑鼠移動距離」:((滑鼠點擊 x 值 - 滑鼠每次移動 x 值) / (carousel-inner 的 offsetWidth / 總頁數)) * 100 */
        const _movingRange = (( carouselState.startX - e.pageX ) / ( carouselState.offsetWidth / slideAmount.value )) * 100;

        if(e.pageX < carouselState.startX && _movingRange > 0 && _movingRange < towingRange.value || e.pageX > carouselState.startX && _movingRange < 0 && _movingRange > -towingRange.value) {
            distanceTraveled();
        }
    };

    const distanceTraveled = () => {
        /* 每個 cell 8px 間距 */
        let _space = 8;

        /* 計算每頁總間距：總頁數 * 間距 */
        let _totalSpacing = props.perPage * _space;

        /* 移動偏移距離：當前頁面 * 總間距 */
        let _offset = currentSlide.value * _totalSpacing;

        /* 每次移動距離：(當前頁面 * 100%) + (-移動偏移距離)px */
        carouselState.carouselLeft = `calc(-${ currentSlide.value * 100 }% + -${ _offset }px)`;
    };

    onMounted(() => {
        
        /* 取得目前 owl-slide 數量 */
        slideElement.value = [...carouselsInner.value.children].filter(carousel => carousel.className === 'owl-slide');
        /* 計算分頁數量：owl-slide 數量 / 每頁幾個 */
        slideAmount.value = Math.ceil(slideElement.value.length / props.perPage);

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