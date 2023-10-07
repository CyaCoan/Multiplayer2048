<script setup lang="ts">
import ClassicGame from './components/ClassicGame.vue';
// import HealthPointBar from './components/HealthPointBar.vue';
// import Tile from './components/Tile.vue';
// import { ref, computed } from 'vue';
// import { useTransition } from '@vueuse/core';

// let hp = ref(0)
// let max = 1024
// const cur_hp = useTransition(computed(() => hp.value), { duration: 100 })
</script>

<template>
    <div>
        <ClassicGame></ClassicGame>

        <!-- test HP bar -->
        <!-- <HealthPointBar :hp="cur_hp" :max="max" :side="'left'" style="position: relative;"></HealthPointBar>
        <p>{{ cur_hp.toFixed(0) }} / {{ max }}</p>
        <button @click="hp += Math.floor(Math.random() * 128)+4; hp = hp > max ? max : hp">HP+</button>
        <button @click="hp -= Math.floor(Math.random() * 128)+4; hp = hp < 0 ? 0 : hp">HP-</button> -->

        <!-- test props -->
        <!-- <Tile :value="4" :status="'frozen'" :row="0" :col="0">4</Tile>
        <Tile :value="32" :status="'row'" :row="1" :col="0">32</Tile>
        <Tile :value="64" :status="'column'" :row="2" :col="0">64</Tile>
        <Tile :value="128" :status="'bomb'" :row="0" :col="1">128</Tile>
        <Tile :value="256" :status="'heal'" :row="1" :col="1">256</Tile>
        <Tile :value="8192" :status="'normal'" :row="2" :col="1">8192</Tile> -->
    </div>
</template>

<style lang="scss" scoped>

</style>