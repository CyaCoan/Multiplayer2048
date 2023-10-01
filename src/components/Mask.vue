<script setup lang="ts">

</script>

<template>
    <div class="container3">
        <div class="mask"></div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.mask {
    width: 592px;
    height: 592px;
    border-radius: 8px;
    position: absolute;
    background-color: white;
    opacity: 0.5;
}

.container3 {
    width: 592px;
    height: 592px;
    margin: 16px auto;
    position: absolute;
    top: 100px;
    z-index: 100;
}
</style>