<script setup lang="ts">
import navigation from './Navigation.vue';
// import Login from './Login.vue';
// import LoginSuccess from './LoginSuccess.vue';
        import Gameplay from './Gameplay.vue'
        import Advertisement from './Advertisement.vue'
        // import PlayerChart from './PlayerChart.vue'
// import Detail from './Detail.vue'
        // import AchievementPlayer from './AchievementPlayer.vue'
        // import PlayerRegister from './PlayerRegister.vue'
import Achievement from './Achievement.vue';
        import end from './end.vue'
</script>

<template>
        <navigation></navigation>
        <Gameplay></Gameplay>
        <Advertisement></Advertisement>
        <Achievement></Achievement>
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