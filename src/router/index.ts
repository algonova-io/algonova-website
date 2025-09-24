import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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
        meta: { title: 'Projects' },
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
];

const index = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_, __, saved) {
        return saved ?? { top: 0 };
    },
    linkActiveClass: 'index-active',
    linkExactActiveClass: 'index-exact',
});

index.beforeEach((to, _, next) => {
    if (to.meta?.title) document.title = `${to.meta.title} · App`;
    next();
});

export default index;
