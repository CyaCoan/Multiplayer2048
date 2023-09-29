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
        256: ['#f300a6', 'white'],
        512: ['#003371', 'white'],
        1024: ['#065279', 'white'],
        2048: ['#177cb0', 'white'],
        4096: ['#44cef6', 'white'],
        8192: ['#b0a4e5', 'black'],
        16384: ['#d6ecf0', 'black'],
        32768: ['#f2ecde', 'black'],
        65536: ['#fffbf0', 'black'],
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
        'position': 'absolute',
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

<!-- 
    const tile_colors = {
    2: ['#f16528', 'white'],HTML
    4: ['#edd51e', 'black'],js
    8: ['#3592cb', 'white'],css
    16: ['#f23901', 'white'],Svelte
    32: ['#61dafb', '#13252a'],React
    64: ['#4f82bf', 'white'],Solid
    128: ['#ff4556', 'white'],Angular
    256: ['#0963a3', 'white'],jQuery
    512: ['rgb(255 208 40)', '#261f08'],Vite
    1024: ['rgb(99 108 255)', '#fff'],Vite
    2048: ['#40b883', '#34495e'],Vue
    4096: ['#cb3837', 'white'],NPM
    8192: ['#509640', 'white'],Node,
    16384: ['#2f71ba', 'white'],Typescript
    32768: ['white', 'black'],
    65536: ['black', 'white'],
}
 -->