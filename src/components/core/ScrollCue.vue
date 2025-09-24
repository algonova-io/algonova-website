
<template>
  <div class="mt-24 flex flex-col items-center gap-3 text-ink/60">
    <span>Or get to know us first</span>
    <div class="grid h-9 w-9 place-items-center rounded-full border border-accent">
      <font-awesome-icon class="text-accent" :icon="faChevronDown" />
    </div>
  </div>
</template>
<style scoped>
</style>
<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
</script>
