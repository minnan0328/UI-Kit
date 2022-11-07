const site = {
    // 現在是否為顯示 body 捲動條的狀態
    isShowScrollbar() {
        return document.body.style.overflow == 'visible';
    },
    // 顯示 body 的捲動條
    showScrollbar() {
        document.body.style.overflow = 'visible';
    },
    // 隱藏 body 的捲動條
    hideScrollbar() {
        document.body.style.overflow = 'hidden';
    }
};

export default site;
