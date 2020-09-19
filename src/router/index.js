/**
 * @file route 入口
 * */ 
import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Error',
        component: () => import('../components/error/error.vue')
    },{
        path: '/',
        name: 'Home',
        component: () => import('../views/home/home.vue')
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: () => import('../views/jobs/jobs.vue')
    },
    {
        path: '/tree',
        name: 'Tree',
        component: () => import('../views/tree/tree.vue')
    },
    {
        path: '/compare',
        name: 'Compare',
        component: () => import('../views/compare/compare.vue')
    },
    {
        path: '/repos',
        name: 'Repos',
        component: () => import('../views/repos/repos.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router