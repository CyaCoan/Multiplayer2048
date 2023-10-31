import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [{
    path: '/classic',
    component: () => import('../components/ClassicGame.vue')
}, {
    path: '/duel',
    component: () => import('../components/DuelGame.vue')
}, {
    path: '/index',
    component: () => import('../components-view/index.vue')
}, {
    path: '/details',
    component: () => import('../components-view/details.vue')
}, {
    path: '/achievement',
    component: () => import('../components-view/playachievement.vue')
}, {
    path: '/offline',
    component: () => import('../components-view/playLogin.vue')
}, {
    path: '/online',
    component: () => import('../components-view/successLogin.vue')
}, {
    path: '/register',
    component: () => import('../components-view/PlayerRegister.vue')
}, {
    path: '/login',
    component: () => import('../components-view/PlayerLogin.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router