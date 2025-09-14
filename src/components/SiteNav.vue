
<script setup lang="ts">
import LogoMark from './LogoMark.vue'
import NavLink from './NavLink.vue'
import PrimaryButton from './PrimaryButton.vue'
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
defineProps<{
  chatActive:boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

</script>

<template>
  <header class="sticky top-0 z-20 bg-gradient-to-t from-soft/10 to-accent/10">
    <nav class="mx-auto grid max-w-6xl   grid-cols-2 items-center px-6 py-5 rounded">
      <div class="flex items-center">
        <LogoMark :size="180" />
      </div>
      <!-- Right cell: nav links + CTA -->

      <div v-if="!chatActive" class="flex items-center justify-end gap-6">

        <div  class="hidden md:flex items-center gap-2">
          <NavLink class="text-[21px]" href="#" active>Home</NavLink>
          <NavLink class="text-[21px]" href="#">About</NavLink>
          <NavLink class="text-[21px]" href="#">Projects</NavLink>
        </div>
        <div class="flex-1"></div>
        <PrimaryButton as="a" href="#">Get in touch</PrimaryButton>
      </div>
      <div v-else class="flex items-center justify-end">
              <button
                  type="button"
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white
                   hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  aria-label="Close"
                  @click = "emit('close')"
              >
                <FontAwesomeIcon :icon="faXmark" class="h-4 w-4" />
              </button>
      </div>
    </nav>
  </header>
</template>
