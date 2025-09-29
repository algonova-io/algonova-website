
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
              :activeClass=" 'text-ink' "
              custom v-slot="{ href, isActive, navigate }"
     >
    <a
        :href="href"
        @click="navigate"
        :class="[
      'px-3 py-2 text-m font-semibold transition-opacity',
      isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
    ]"
    >
      <slot />
    </a>
  </RouterLink>
</template>
