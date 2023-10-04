<script setup lang="ts">
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
    if (props.status && props.status === 'frozen') {
        return ['#70f3ff', 'black']
    }

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
        <div v-if="props.value && props.status && props.status === 'row'" class="arrow-left" style="top: 54px; left: 8px;"></div>
        <div v-if="props.value && props.status && props.status === 'row'" class="arrow-right" style="top: 54px; right: 8px;"></div>
        <div v-if="props.value && props.status && props.status === 'col'" class="arrow-up" style="top: 8px; left: 54px;"></div>
        <div v-if="props.value && props.status && props.status === 'col'" class="arrow-down" style="bottom: 8px; left: 54px;"></div>
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
        user-select: none;
    }
}

.arrow-left {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 4px solid white;
    border-left: 4px solid white;
    transform: rotate(-45deg);
    animation: arrow-move-left 0.75s infinite;
}

@keyframes arrow-move-left {
    0% {
        opacity: 0;
        transform: rotate(-45deg) translate(8px, 8px);
    }
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: rotate(-45deg) translate(-8px, -8px);
    }
}

.arrow-right {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 4px solid white;
    border-left: 4px solid white;
    transform: rotate(135deg);
    animation: arrow-move-right 0.75s infinite;
}

@keyframes arrow-move-right {
    0% {
        opacity: 0;
        transform: rotate(135deg) translate(8px, 8px);
    }
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: rotate(135deg) translate(-8px, -8px);
    }
}

.arrow-up {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 4px solid white;
    border-left: 4px solid white;
    transform: rotate(45deg);
    animation: arrow-move-up 0.75s infinite;
}

@keyframes arrow-move-up {
    0% {
        opacity: 0;
        transform: rotate(45deg) translate(8px, 8px);
    }
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: rotate(45deg) translate(-8px, -8px);
    }
}

.arrow-down {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 4px solid white;
    border-left: 4px solid white;
    transform: rotate(-135deg);
    animation: arrow-move-down 0.75s infinite;
}

@keyframes arrow-move-down {
    0% {
        opacity: 0;
        transform: rotate(-135deg) translate(8px, 8px);
    }
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: rotate(-135deg) translate(-8px, -8px);
    }
}
</style>