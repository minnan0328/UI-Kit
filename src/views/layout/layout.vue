<template>
    <menus></menus>
    <router-view class="view"></router-view>
</template>

<script>
import menus from './menus/menus.vue';

export default {
    components: {menus}
}
</script>
<style lang="scss" scoped>
    .view {
        padding: 16px;
    }
</style>