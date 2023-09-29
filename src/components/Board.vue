<script setup lang="ts">
import { computed } from 'vue';
import Tile from './Tile.vue';

const props = defineProps<{
    board: ([number, number] | null)[][]
}>()

const flatBoard = computed(() => {
    return props.board.flat()
})
</script>

<template>
    <slot></slot>
    <div class="background">
        <div v-for="i of 16" :key="i" class="grid-cell"></div>
    </div>
    <Tile v-for="(item, index) in flatBoard" :key="item ? item[1] : `null-${index}`"
    :value="item ? item[0] : 0"
    :row="(index - index % 4) / 4"
    :col="index % 4">
        {{ item ? item[0] : 0 }}
    </Tile>
</template>

<style lang="scss" scoped>
.background {
    width: 560px;
    height: 560px;
    padding: 16px;
    background-color: #bbada0;
    border-radius: 8px;
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-template-rows: repeat(4, 128px);
    grid-template-columns: repeat(4, 128px);

    .grid-cell {
        width: 128px;
        height: 128px;
        border-radius: 8px;
        background-color: #ccc0b3;
    }
}
</style>