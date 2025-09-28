<script setup lang="ts">
/**
 * A responsive decorative diagonal line drawn with SVG.
 * It’s positioned absolutely by the parent.
 */
interface Props {
  strokeWidth?: number
  class?: string
}
const { strokeWidth = 1 } = defineProps<Props>()
</script>

<template>
  <svg
      viewBox="0 0 100 160"
      aria-hidden="true"
      class="pointer-events-none absolute -left-16 sm:-left-24 -top-8 sm:-top-10 text-accent/30"
      :class="$props.class"
  >
    <!-- Draw a long diagonal line that extends beyond the viewport -->
    <line
        x1="-40" y1="0"
        x2="140" y2="160"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        vector-effect="non-scaling-stroke"
    />
  </svg>
</template>