<template>
    <menus></menus>
    <div class="view">
        <router-view></router-view>
    </div>
</template>

<script>
import menus from './menus/menus.vue';

export default {
    components: { menus }
}
</script>
<style lang="scss" scoped>
    .view {
        padding: 16px;
    }
</style>