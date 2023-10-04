<script setup lang="ts">
import { Status } from '../utils/2048duel';

const props = defineProps<{
    status: Status
}>()
</script>

<template>
    <div v-if="props.status === 'row'" class="arrow-left" style="top: 54px; left: 8px;"></div>
    <div v-if="props.status === 'row'" class="arrow-right" style="top: 54px; right: 8px;"></div>
    <div v-if="props.status === 'col'" class="arrow-up" style="top: 8px; left: 54px;"></div>
    <div v-if="props.status === 'col'" class="arrow-down" style="bottom: 8px; left: 54px;"></div>
</template>

<style lang="scss" scoped>
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