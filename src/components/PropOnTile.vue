<script setup lang="ts">
import { Status } from '../utils/2048duel';

const props = defineProps<{
    status: Status
}>()
</script>

<template>
    <div v-if="props.status === 'row'" class="arrow-left" style="top: 54px; left: 8px;"></div>
    <div v-if="props.status === 'row'" class="arrow-right" style="top: 54px; right: 8px;"></div>

    <div v-if="props.status === 'column'" class="arrow-up" style="top: 8px; left: 54px;"></div>
    <div v-if="props.status === 'column'" class="arrow-down" style="bottom: 8px; left: 54px;"></div>

    <div v-if="props.status === 'bomb'" class="container-prop">
        <img src="../assets/bomb-white.svg" class="bomb" style="top: 0px; left: 16px;"/>
    </div>

    <div v-if="props.status === 'frozen'" class="container-prop">
        <img src="../assets/ice-cube-white.svg" class="ice-cube" style="top: 8px; left: 8px; transform: rotate(-2deg);"/>
    </div>

    <div v-if="props.status === 'heal'" class="container-prop">
        <img src="../assets/health-white.svg" class="health" style="top: 2px; left: -1px;"/>
    </div>
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

.container-prop {
    width: 128px;
    height: 128px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bomb {
    position: absolute;
    height: 112px;
    animation: flicker 1.5s infinite;
}

.ice-cube {
    position: absolute;
    height: 112px;
}

.health {
    position: absolute;
    height: 130px;
    animation: flicker 1.5s infinite;
}

@keyframes flicker {
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.6;
    }
}
</style>