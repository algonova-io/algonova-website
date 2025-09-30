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
    scrollBehavior(to, from, saved) {
        if (saved) return saved

        // If the spy updated the hash, do NOT scroll again.
        console.log("is from spy", fromSpy.value)
        if (fromSpy.value) {
            fromSpy.value = false
            return false
        }

        if (to.hash) {
            return new Promise(resolve => {
                requestAnimationFrame(() => {
                    const el = document.querySelector(to.hash) as HTMLElement | null
                    if (!el) return resolve({ top: 0 })

                    const headerOffset = 88 // your sticky header height
                    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset

                    // Lock the spy while we scroll
                    lockSpy()

                    window.scrollTo({ top: y, behavior: 'smooth' })

                    // Best-effort unlock if scrollend isn’t supported
                    window.addEventListener('scrollend', () => lockSpy(0), { once: true })
                    setTimeout(() => lockSpy(0), 800) // fallback timeout

                    resolve(false) // we handled it manually
                })
            })
        }

        return { top: 0, behavior: 'smooth' }

    },
    linkActiveClass: 'index-active',
    linkExactActiveClass: 'index-exact',
});

router.beforeEach((to, _, next) => {
    if (to.meta?.title) document.title = `${to.meta.title} · App`;
    next();
});

export default router;
