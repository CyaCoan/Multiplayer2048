<script setup lang="ts">
        import navigation from './Navigation.vue';  
// import Login from './Login.vue';
// import LoginSuccess from './LoginSuccess.vue';
        // import PlayerChart from './PlayerChart.vue'
        import Detail from './Detail.vue'
        // import AchievementPlayer from './AchievementPlayer.vue'
        // import PlayerRegister from './PlayerRegister.vue'
        import end from './end.vue'
</script>

<template>
        <navigation></navigation>
        <Detail></Detail>
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