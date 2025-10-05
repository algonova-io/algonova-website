<template>
  <div v-bind="$attrs" class="fixed inset-0 overflow-y-auto">
  <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {onBeforeUnmount, onMounted, onUnmounted} from "vue";

  onMounted(() => {
    document.querySelector('body')?.classList.add('overflow-hidden')
  })

  onUnmounted(() => {
    document.querySelector('body')?.classList.remove('overflow-hidden')

  })

  onBeforeUnmount(() => {

  })

</script>