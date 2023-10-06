<script setup lang="ts">
import ClassicGame from './components/ClassicGame.vue';
import Tile from './components/Tile.vue';
</script>

<template>
    <div>
        <ClassicGame></ClassicGame>
        <!-- test props -->
        <Tile :value="4" :status="'frozen'" :row="0" :col="0">4</Tile>
        <Tile :value="32" :status="'row'" :row="1" :col="0">32</Tile>
        <Tile :value="64" :status="'column'" :row="2" :col="0">64</Tile>
        <Tile :value="128" :status="'bomb'" :row="0" :col="1">128</Tile>
        <Tile :value="256" :status="'heal'" :row="1" :col="1">256</Tile>
        <Tile :value="8192" :status="'normal'" :row="2" :col="1">8192</Tile>
    </div>
</template>

<style lang="scss" scoped>

</style>