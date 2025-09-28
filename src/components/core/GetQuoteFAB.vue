<script setup lang="ts">

import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="fixed right-4 bottom-4 md:right-8 md:bottom-8 flex flex-row justify-center items-center gap-4 backdrop-blur"
           :style="{
      paddingBottom: 'max(0px, env(safe-area-inset-bottom))'
    }"
  >
    <span class="text-body-large">Get a free quote in 2 minutes</span>
    <button type="submit"
            class="mr-2 grid h-10 w-10 place-items-center  bg-ink text-white transition hover:opacity-90">
            <span class="inline-block">
                  <font-awesome-icon
                      key="arrow"
                      style="rotate: 45deg"
                      :icon="faArrowUp"
                      class="w-4 h-4"
                  />
        </span>
    </button>

  </div>

</template>

<style scoped>

</style>