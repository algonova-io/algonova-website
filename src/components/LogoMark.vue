
<script setup lang="ts">
defineProps<{ size?: number }>()
</script>

<template>
  <img
    :width="size || 160"
    :height="(size || 160) * 0.35"
    src="/src/assets/algonova_logo_black.svg"
    alt="Algonova Logo"
    class="object-contain"
  />
</template>
