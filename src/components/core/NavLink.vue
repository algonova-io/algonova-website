
<script setup lang="ts">
import {onMounted} from "vue";

const props = withDefaults(defineProps<{
  href?: string
  active?: boolean
}>(), { href: '#', active: false })

onMounted(() => {
  console.log(props.href)
})
</script>

<template>
  <RouterLink :to="href"
     class="px-3 py-2  font-semibold transition-opacity text-body-large"
     :class="active ? 'text-ink' : 'text-ink/60 hover:text-ink'">
    <slot />
  </RouterLink>
</template>
