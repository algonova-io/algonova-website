import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {lockSpy} from "../components/core/utils";
import {fromSpy, shouldObserverBeActive} from "../components/core/compasebles/useAutoScroll";
import {ref} from "vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/home/Home.vue').then(m => m.default || m),
        meta: { title: 'Home' },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../components/about/About.vue'),
        meta: { title: 'About' },
    },
    {
        path: '/projects',
        name: 'projects',

        component: () => import('../components/projects/Projects.vue'),
        meta: { title: 'Projects'  },
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,

    linkActiveClass: 'index-active',
    linkExactActiveClass: 'index-exact',
});

router.beforeEach((to, _, next) => {
    if (to.meta?.title) document.title = `${to.meta.title} · App`;
    next();
});

export default router;
