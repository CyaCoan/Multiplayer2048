<script setup lang="ts">
import navigation from './Navigation.vue';
// import Login from './Login.vue';
import LoginSuccess from './LoginSuccess.vue';

        import end from './end.vue'
</script>

<template>
        <navigation></navigation>
        <LoginSuccess></LoginSuccess>
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