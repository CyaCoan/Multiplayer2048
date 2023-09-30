<script setup lang="ts">
import Board from './Board.vue';
import { use2048 } from '../utils/2048.ts';
import { ref, watch, computed } from 'vue';
import { onKeyStroke } from '@vueuse/core';

const emit = defineEmits<{
    (e: 'up'): void
    (e: 'down'): void
    (e: 'left'): void
    (e: 'right'): void
    (e: 'update:seed'): string
}>()

const game = use2048()
const showWonState = ref(false)
game.initialize()
// game.test()

game.onWon(() => {
    showWonState.value = true
})

watch(() => game.hasWon, () => {
    if (!game.hasWon)
        showWonState.value = false
})

const canMove = computed(() => {
    if (showWonState.value)
        return false

    if (game.isGameOver.value)
        return false

    return true
})

onKeyStroke(['ArrowUp', 'w'], () => {
    if (!canMove.value) {
        return
    }

    game.up()
    emit('up')
})

onKeyStroke(['ArrowDown', 's'], () => {
    if (!canMove.value) {
        return
    }

    game.down()
    emit('down')
})

onKeyStroke(['ArrowLeft', 'a'], () => {
    if (!canMove.value) {
        return
    }

    game.left()
    emit('left')
})

onKeyStroke(['ArrowRight', 'd'], () => {
    if (!canMove.value) {
        return
    }

    game.right()
    emit('right')
})
</script>

<template>
    <div>
        <Board :board="game.board.value">
        </Board>
    </div>
</template>

<style lang="scss" scoped>
</style>