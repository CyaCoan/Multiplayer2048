<script setup lang="ts">
        import navigation from './Navigation.vue';
        import AchievementPlayer from './AchievementPlayer.vue'

        import end from './end.vue'
</script>

<template>
        <navigation></navigation>
        <AchievementPlayer></AchievementPlayer>
        <end></end>
   <!-- </div> -->
</template>

<style lang="scss" scoped>
*{
    padding: 0px;
    margin: 0px;
}
html,body,#app{
    width: 100%;
    height: 100%;
}

</style>