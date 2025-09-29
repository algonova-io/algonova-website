import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter, type RouteRecordName } from 'vue-router';

export function useScrollPageRouter(order: RouteRecordName[], opts?: {
    thresholdPx?: number;      // tolerance for top/bottom detection
    debounceMs?: number;       // prevent rapid multi-nav
    enableKeys?: boolean;
}) {
    const route = useRoute();
    const router = useRouter();
    const thresholdPx = opts?.thresholdPx ?? 8;
    const debounceMs = opts?.debounceMs ?? 600;
    let locked = false;

    const atTop = () => window.scrollY <= thresholdPx;
    const atBottom = () =>
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - thresholdPx;

    const go = (dir: 'next' | 'prev') => {
        if (locked) return;
        const idx = order.findIndex(n => n === route.name);
        if (idx === -1) return;

        const target =
            dir === 'next' ? order[Math.min(idx + 1, order.length - 1)]
                : order[Math.max(idx - 1, 0)];

        if (target && target !== route.name) {
            locked = true;
            router.push({ name: target }).finally(() => {
                setTimeout(() => (locked = false), debounceMs);
            });
        }
    };

    const onWheel = (e: WheelEvent) => {
        // Only trigger when at extremes to avoid hijacking normal in-page scrolling
        if (e.deltaY > 0 && atBottom()) go('next');
        else if (e.deltaY < 0 && atTop()) go('prev');
    };

    // Touch support (simple vertical swipe)
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => (touchStartY = e.touches[0]?.clientY ?? 0);
    const onTouchEnd = (e: TouchEvent) => {
        const endY = e.changedTouches[0]?.clientY ?? touchStartY;
        const dy = endY - touchStartY;
        const minSwipe = 60; // px
        if (Math.abs(dy) < minSwipe) return;
        if (dy < 0 && atBottom()) go('next'); // swipe up
        if (dy > 0 && atTop()) go('prev');    // swipe down
    };

    const onKey = (e: KeyboardEvent) => {
        if (!opts?.enableKeys) return;
        if ((e.key === 'ArrowDown' || e.key === 'PageDown') && atBottom()) go('next');
        if ((e.key === 'ArrowUp' || e.key === 'PageUp') && atTop()) go('prev');
    };

    onMounted(() => {
        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        if (opts?.enableKeys) window.addEventListener('keydown', onKey);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
        if (opts?.enableKeys) window.removeEventListener('keydown', onKey);
    });
}