<script setup lang="ts">
import Arrow from './Arrow.vue';
import Bomb from './Bomb.vue';
import { computed } from 'vue';
import { Status } from '../utils/2048duel';

const props = defineProps<{
    value: number | null,
    status: Status,
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
    if (props.status === 'frozen') {
        return '#70f3ff'
    }

    if (!props.value) {
        return 'transparent'
    }

    const tile_colors = {
        2: '#ffb035',
        4: '#ff8936',
        8: '#ff7000',
        16: '#ff4e20',
        32: '#db5a6b',
        64: '#cb3a56',
        128: '#dc3023',
        256: '#ba0400',
        512: '#b65f47',
        1024: '#a24d15',
        2048: '#8b3400',
        4096: '#6b1400',
        8192: '#677e44',
        16384: '#575e33',
        32768: '#473e22',
        65536: '#371e11',
    }

    if (props.value in tile_colors) {
        return (tile_colors as any)[props.value]
    }

    return 'transparent'
})

const tile_number_color = computed(() => {
    if (props.status == 'frozen') {
        return 'black'
    }

    return 'white'
})
</script>

<template>
    <div v-if="props.value"
        :style="{
            'background-color': tile_color,
            'color': tile_number_color,
            'box-shadow': `0 0 10px 0px ${tile_color}`,
            'top': top,
            'left': left,
            'z-index': z_index,
        }"
        class="tile"
    >
        <Arrow :status="props.status"></Arrow>
        <Bomb :value="props.value" :status="props.status"></Bomb>
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
    display: flex;
    align-items: center;
    justify-content: center;

    .tile-number {
        font-family: consolas;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        z-index: 100;
        user-select: none;
    }
}
</style>