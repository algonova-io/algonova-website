<script setup lang="ts">
type Pt = { x: number; y: number }

// Props:
// - points: the inner “edge” polyline (at least 2 points). For a simple diagonal,
//   provide [{x: x1, y: y1}, {x: x2, y: y2}] in viewBox coordinates.
// - viewBoxW/H: logical canvas size. Stretches with preserveAspectRatio="none".
interface Props {
  points: Pt[]
  stroke?: string
  strokeWidth?: number
  viewBoxW?: number
  viewBoxH?: number
  class?: string
  fill?: string           // fill color
  fillOpacity?: number    // opacity for the fill only
}

const props = withDefaults(defineProps<Props>(), {
  stroke: 'currentColor',
  strokeWidth: 1,
  viewBoxW: 1000,
  viewBoxH: 1000,
  fill: '#ffffff',
  fillOpacity: 1,
})

function pathD(points: Pt[]): string {
  return points.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y}`).join(' ')
}

// Build the auto-closed fill polygon:
// [ (0, y0) -> ...inner points... -> (xN, H) -> (0, H) -> Z ]
const dStroke = pathD(props.points)
const dFill = [
  `M 0 ${props.points[0].y}`,              // project first point to left edge
  ...props.points.map(p => `L ${p.x} ${p.y}`),
  `L 0 ${props.viewBoxH}`,
  'Z'
].join(' ')
</script>

<template>
  <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-visible"
      :class="$props.class"
  >
    <svg
        class="w-full h-full"
        :viewBox="`0 0 ${viewBoxW} ${viewBoxH}`"
        preserveAspectRatio="none"
    >
      <!-- fill polygon (independent opacity) -->
      <path
          :d="dFill"
          :fill="fill"
          :fill-opacity="fillOpacity"
          stroke="none"
      />
      <!-- crisp hairline stroke along the inner edge -->
      <path
          :d="dStroke"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          fill="none"
          vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>