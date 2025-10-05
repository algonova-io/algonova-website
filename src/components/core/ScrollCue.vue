
<template>
  <button
      @click.prevent="scrollToHash('#about')"
      class="mt-24 flex flex-col items-center gap-6 text-ink/60">
    <span>Or get to know us first</span>
      <font-awesome-icon class="text-ink animate-float" :icon="faArrowDown" />
  </button>
</template>
<style scoped>
</style>
<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import {useScrollHandler} from "./compasebles/scrollHandler";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const router = useRouter()
const isModalOpen = ref(false)
const {scrollToHash} = useScrollHandler(router, route, isModalOpen)
</script>
