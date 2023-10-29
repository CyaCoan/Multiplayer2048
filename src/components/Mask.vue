<script setup lang="ts">
const props = defineProps<{
    color: string | null
}>()
</script>

<template>
    <div class="container-mask">
        <div class="mask" :style="{
            'background-color': props.color ? props.color : 'white'
        }"></div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.mask {
    width: 592px;
    height: 592px;
    border-radius: 8px;
    position: absolute;
    opacity: 0.5;
}

.container-mask {
    width: 592px;
    height: 592px;
    z-index: 100;
}
</style>