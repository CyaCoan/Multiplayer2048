import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [{
    path: '/classic',
    component: () => import('../components/ClassicGame.vue')
}, {
    path: '/duel',
    component: () => import('../components/DuelGame.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router