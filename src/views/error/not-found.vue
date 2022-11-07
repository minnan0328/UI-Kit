<template>
    <div class="error">
        <div class="head">
            <router-link :to="{ name: urlPath.home.name }">{{ urlPath.home.meta.title }}</router-link>
        </div>
        <div class="content">
            <div>
                <div>
                    <h3>很抱歉，找不到該頁面...</h3>
                    <p class="font-body mt-3">您想瀏覽的頁面出現錯誤，請重新確認你所輸入的網址。</p>
                </div>

                <div>
                    <img src="@/assets/images/error/not-found.png" alt="not found">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import url from '@/router/url';

export default {
    setup() {
        const urlPath = ref(url);

        return { urlPath };
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_var';

.error {
    display: flex;
    flex-direction: column;
}

.content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    transition: all .02s ease-in-out;
    min-height: calc(100vh - 70px);

    > div {
        display: flex;
        align-items: center;

        > div {
            padding: 80px;
        }
    }
}

</style>
