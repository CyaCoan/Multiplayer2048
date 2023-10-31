<script setup lang="ts">
import Board from './Board.vue';
import Mask from './Mask.vue';
import { blur } from '../utils/button';
import { use2048 } from '../utils/2048';
import { computed } from 'vue';
import { onKeyStroke, useTransition } from '@vueuse/core';

const emit = defineEmits<{
    (e: 'up'): void
    (e: 'down'): void
    (e: 'left'): void
    (e: 'right'): void
    // (e: 'update:seed'): string
}>()

const game = use2048()
game.initialize()
// game.test()

const score = useTransition(computed(() => game.score.value), { duration: 100 })
const highScore = useTransition(computed(() => game.highScore.value), { duration: 100 })

const canMove = computed(() => {
    if (game.hasWon.value && game.firstWon.value) {
        return false
    }

    if (game.isGameOver.value) {
        return false
    }

    if (game.reachedLimit.value) {
        return false
    }

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
    <div class="container-game">
        <div class="container-header">
            <div class="text1">成绩</div>
            <div class="text2">最高成绩</div>
            <div class="score1">{{ score.toFixed(0) }}</div>
            <div class="score2">{{ highScore.toFixed(0) }}</div>
            <button primary @click="game.initialize(); blur(`new_game`);" class="new-game" id="new_game">重玩一局</button>
        </div>

        <transition>
            <Mask v-if="game.isGameOver.value" :color="'white'" style="position: absolute; bottom: 0px;">
                <p v-if="game.firstWon.value" class="mask-text" style="position: relative; top: 180px;">你输了</p>
                <p v-else class="mask-text" style="position: relative; top: 180px;">你输了，但你曾经赢过</p>
            </Mask>
        </transition>

        <transition>
            <Mask v-if="game.hasWon.value && game.firstWon.value" :color="'gold'" style="position: absolute; bottom: 0px;">
                <p class="mask-text" style="position: relative; top: 140px;">你赢了</p>
                <button primary @click="game.hasWon.value=false; game.firstWon.value=false" class="continue">继续</button>
            </Mask>
        </transition>

        <transition>
            <Mask v-if="game.reachedLimit.value" :color="'white'" style="position: absolute; bottom: 0px;">
                <p class="mask-text" style="position: relative; top: 180px;">你来到了游戏的尽头</p>
            </Mask>
        </transition>

        <Board :board="game.board.value" :score="game.score.value" style="bottom: 0px;"></Board>
    </div>
</template>

<style lang="scss" scoped>
.container-game {
    width: 592px;
    height: 708px;
    margin: 16px auto;
    position: relative;
}

.container-header {
    width: 592px;
    height: 100px;
    margin-bottom: 16px;
    position: relative;
}

.score1 {
    font-family: 'consolas';
    font-size: 80px;
    font-weight: bold;
    text-align: left;
    position: absolute;
    bottom: -32px;
    left: 0px;
    user-select: none;
}

.score2 {
    font-family: 'consolas';
    font-size: 24px;
    font-weight: bold;
    text-align: right;
    position: absolute;
    bottom: 50px;
    right: 0px;
    user-select: none;
}

.text1 {
    font-family: 'Microsoft YaHei';
    font-size: 32px;
    font-weight: bold;
    text-align: left;
    position: absolute;
    top: -8px;
    left: 0px;
    user-select: none;
}

.text2 {
    font-family: 'Microsoft YaHei';
    font-size: 16px;
    font-weight: bold;
    text-align: right;
    position: absolute;
    top: -2px;
    right: 0px;
    user-select: none;
}

.new-game {
    width: 144px;
    height: 50px;
    border-radius: 25px;
    font-family: 'Microsoft Yahei';
    font-size: 20px;
    font-weight: bold;
    padding: 4px;
    background-color: white;
    color: black;
    border-color: black;
    position: absolute;
    bottom: 0px;
    right: 0px;
}

.continue {
    width: 144px;
    height: 50px;
    border-radius: 25px;
    font-family: 'Microsoft Yahei';
    font-size: 20px;
    font-weight: bold;
    padding: 4px;
    background-color: white;
    color: black;
    border-color: black;
    position: relative;
    top: 106px;
}

.mask-text {
    font-family: 'Microsoft Yahei';
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    user-select: none;
}

.v-enter-from {
    opacity: 0;
}

.v-enter-active {
    transition: opacity 1s ease-out;
}

.v-enter-to {
    opacity: 1;
}

.v-leave-from {
    opacity: 1;
}

.v-leave-active {
    transition: opacity 0.1s ease-out;
}

.v-leave-to {
    opacity: 0;
}
</style>