<template>
  <slot></slot>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";

  onMounted(() => {
    document.querySelector('body')?.classList.add('overflow-hidden')
  })

  onUnmounted(() => {
    document.querySelector('body')?.classList.remove('overflow-hidden')

  })


</script>