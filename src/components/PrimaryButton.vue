
<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: string
  href?: string
}>(), { as: 'button' })
</script>

<template>
  <component :is="as" :href="href"
    class="inline-flex items-center rounded-xl bg-accent px-4 py-2 text-white font-semibold shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/40">
    <slot />
  </component>
</template>
