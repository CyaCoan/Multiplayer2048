<script setup lang="ts">
const props = defineProps<{
    hp: number,
    max: number,
    side: 'left' | 'right',
}>()
</script>

<template>
    <div class="container-hp">
        <div :style="{
            'background-color': `${(hp / max) > 0.2 ? '#2add9c' : '#dc3023'}`,
            'width': `${(hp < max ? (hp / max) : 1) * 560}px`,
            'height': '32px',
            'float': `${props.side}`,
        }"></div>

        <div class="border"></div>
    </div>
</template>

<style lang="scss" scoped>
.container-hp {
    width: 560px;
    height: 32px;
    position: relative;
    margin: 16px;
}

.border {
    width: 560px;
    height: 32px;
    border-radius: 8px;
    border: 6px solid black;
    position: absolute;
    top: -6px;
    left: -6px;
}
</style>