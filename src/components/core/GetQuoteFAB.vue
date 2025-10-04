<script setup lang="ts">

import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <button type="submit" class="fixed transition hover:opacity-90 right-4 bottom-4 md:right-8 md:bottom-8 flex flex-row justify-center items-center gap-4 backdrop-blur rounded-s-md"
           :style="{
      paddingBottom: 'max(0px, env(safe-area-inset-bottom))'
    }"
  >
    <span class="text-body-large">Get a free quote in 2 minutes</span>
    <span
            class="mr-2 rounded-lg grid h-10 w-10 place-items-center  bg-ink text-white ">
            <span class="inline-block">
                  <font-awesome-icon
                      key="arrow"
                      style="rotate: 45deg"
                      :icon="faArrowUp"
                      class="w-4 h-4"
                  />
        </span>
    </span>

  </button>

</template>

<style scoped>

</style>