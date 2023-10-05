<script setup lang="ts">
import { Status } from '../utils/2048duel';

const props = defineProps<{
    value: number,
    status: Status,
}>()
</script>

<template>
    <div v-if="props.status === 'bomb'" class="container4">
        <img src="../assets/bomb-white.svg" class="bomb" style="top: 0px; left: 16px;"/>
        <p class="bomb-number">{{ props.value }}</p>
    </div>
</template>

<style lang="scss" scoped>
.container4 {
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
}

.bomb-number {
    font-family: consolas;
    font-size: 40px;
    font-weight: bolder;
    color: black;
    text-shadow: 1px 1px white, -1px -1px white, 1px -1px white, -1px 1px white;
    text-align: center;
    z-index: 101;
    user-select: none;
}
</style>