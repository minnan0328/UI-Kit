<template>
    <div class="menus">
        <div class="menu-left">
            
        </div>
        <div class="menu-right">
            <router-link :class="['menu-item', { 'active': currentMenu == menu.name }]" v-for="(menu, idx) in menus" :key="idx" :to="{name: menu.name}">{{ menu.meta.title }}</router-link>
        </div>
    </div>
</template>
<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import url from '@/router/url';


export default {
    setup() {
        const route = useRoute();

        const menus = reactive([ url.home, url.dialog, url.carousel, url.picker ]);

        const currentMenu = computed(() => route.name);

        return { menus, currentMenu };
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/_var';
.menus {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: 2;
    background-color: rgba($white, .5);

    .menu-item {
        display: inline-block;
        padding: 8px 16px;
    }
}
</style>