import {useIntersectionObserver} from "@vueuse/core";
import {fromSpy, shouldObserverBeActive} from "./useAutoScroll";
import {RouteLocation, Router} from "vue-router";
import {Ref} from "vue";

export const useScrollHandler = (router: Router, route: RouteLocation, isModalActive: Ref) => {
    const HEADER_OFFSET = 88

// tiny lock to avoid spy<->watch loops
    let lock = 0
    const lockSpy = (d = 1) => { lock = Math.max(0, lock + d) }
    const isLocked = () => lock > 0



    function scrollToHash(hash: string) {
        const el = document.querySelector<HTMLElement>(hash)
        if (!el) return
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        window.scrollTo({ top: y, behavior: 'smooth' })
    }

    /** ------- Observers (Vuetify) ------- */
    type StopFn = () => void
    const stops: StopFn[] = []


    function observeSection(selector: '#home'|'#about'|'#projects') {
        const el = document.querySelector(selector)
        if (!el) return


        // Vuetify returns { stop }
        const { stop } = useIntersectionObserver(
            el as any,
            (entries: any) => {
                if (!shouldObserverBeActive.value) {

                    setTimeout(() => {
                        shouldObserverBeActive.value = true
                    })

                    return
                }
                fromSpy.value = true
                const e = entries[0]
                if (!e?.isIntersecting) return
                const targetHash = selector

                if (isLocked()) return
                if ((route.hash || '') === targetHash) return

                // Update only the hash, tell scrollBehavior to skip
                lockSpy(+1)
                router.replace({ hash: targetHash,})
                    .finally(() => {
                        lockSpy(-1)
                    })
            },
            {
                threshold: [0, 0.15, 0.3],
                root: null,
                rootMargin: '-45% 0px -45% 0px',
            }
        )

        stops.push(stop)
    }

    function initObservers() {
        // if chat is open, layout height changes a lot—pause spying
        if (isModalActive.value) return
        observeSection('#home')
        observeSection('#about')
        observeSection('#projects')
    }

    function destroyObservers() {
        while (stops.length) {
            try { (stops.pop() as StopFn)() } catch {}
        }
    }


    return {
        initObservers,
        destroyObservers,
        scrollToHash,
        lock,
        lockSpy,
        isLocked,
        observeSection,
        stops,
    }
}
