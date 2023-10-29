<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
    seconds: number,
    stop: boolean,
}>()

const emit = defineEmits<{
    (e: 'time-up', state: boolean): void
}>()

const remainingSeconds = ref(props.seconds)

watchEffect(() => {
    const timer = setInterval(() => {
        if (!props.stop && remainingSeconds.value > 0){
            remainingSeconds.value--
            if (remainingSeconds.value === 0) {
                emit('time-up', true)
            }
        }
    }, 1000)
    return () => {
        clearInterval(timer)
    }
})

const fillZero = (num: number) => {
    return Array.from({length: 2 - num.toString().length}).fill(0).join('') + num
}

const time = computed(() => {
    const sec = fillZero(remainingSeconds.value % 60)
    const min = fillZero(Math.floor(remainingSeconds.value / 60))

    return [sec, min]
})
</script>

<template>
    <div class="timer-box">
        <p class="timer-text">{{ time[1] }}:{{ time[0] }}</p>
    </div>
</template>

<style lang="scss" scoped>
.timer-box {
    width: 256px;
    height: 100px;
    border-radius: 6px;
    background-color: wheat;
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;

    .timer-text {
        font-family: consolas;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        z-index: 100;
        user-select: none;
    }
}
</style>