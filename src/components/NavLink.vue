
<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  active?: boolean
}>(), { href: '#', active: false })
</script>

<template>
  <a :href="href"
     class="px-3 py-2 text-sm font-semibold transition-opacity"
     :class="active ? 'text-ink' : 'text-ink/60 hover:text-ink'">
    <slot />
  </a>
</template>
