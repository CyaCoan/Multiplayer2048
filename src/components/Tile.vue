<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    value: number | null,
    row: number,
    col: number,
}>()

const top = computed(() => {
    return `${16 + 144 * props.row}px`
})

const left = computed(() => {
    return `${16 + 144 * props.col}px`
})

const z_index = computed(() => {
    if (props.value) {
        return Math.log2(props.value)
    }
    return 0
})

const tile_color = computed(() => {
    if (!props.value) {
        return ['transparent', 'transparent']
    }

    const tile_colors = {
        2: ['#ffb035', 'white'],
        4: ['#ff8936', 'white'],
        8: ['#ff7000', 'white'],
        16: ['#ff4e20', 'white'],
        32: ['#db5a6b', 'white'],
        64: ['#cb3a56', 'white'],
        128: ['#dc3023', 'white'],
        256: ['#ba0400', 'white'],
        512: ['#b65f47', 'white'],
        1024: ['#a24d15', 'white'],
        2048: ['#8b3400', 'white'],
        4096: ['#6b1400', 'white'],
        8192: ['#677e44', 'white'],
        16384: ['#575e33', 'white'],
        32768: ['#473e22', 'white'],
        65536: ['#371e11', 'white'],
    }

    if (props.value in tile_colors) {
        return (tile_colors as any)[props.value]
    }

    return ['transparent', 'transparent']
})
</script>

<template>
    <div :style="{
        'background-color': tile_color[0],
        'color': tile_color[1],
        'box-shadow': `0 0 10px 0px ${tile_color[0]}`,
        'top': top,
        'left': left,
        'z-index': z_index,
    }"
    class="tile">
        <p class="tile-number">
            <slot></slot>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.tile {
    width: 128px;
    height: 128px;
    border-radius: 8px;
    position: absolute;

    .tile-number {
        font-family: consolas;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        transform: translateY(-10%);
        user-select: none;
    }
}
</style>