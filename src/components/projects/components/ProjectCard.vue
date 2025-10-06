<script setup lang="ts">
/**
 * Reusable project banner card.
 * - Responsive 2-column layout (content left, brand/art right).
 * - Custom background via Tailwind classes or inline gradient (arbitrary value).
 * - Optional link wrapper for the whole card.
 */

import {useDateFormat} from "@vueuse/core";


type ProjectCardProps = {
  title: string
  description?: string
  tags?: string[]
  href?: string | null
  date?: Date | string
  client?: string
  artSrc?: string
  artAlt?: string
}

const props = withDefaults(defineProps<ProjectCardProps>(), {
  description: '',
  artSrc: '',
  date: '',
  client: '',
  artAlt: '',
  tags: () => [],
  href: null,
  target: '_self',
})

</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href || undefined" target="_blank"
             class="block w-full">
    <div class="relative w-full overflow-hidden rounded-2xl shadow-md">
      <div
          class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 bg-white  rounded-2xl p-6 md:p-8 overflow-hidden"
      >
        <!-- Left: image / media -->
        <div class="md:col-span-5">
          <slot name="media">
            <div class="overflow-hidden rounded-xl">
              <v-img v-if="artSrc"
                   :src="artSrc"
                   :alt="artAlt || `${title} cover`"
                   class="transition-transform duration-300 h-80 md:h-80 w-full pa-2 object-fit hover:scale-[1.02]"
                   loading="lazy"/>
              <div v-else class="flex items-center justify-center h-40 md:h-56 bg-soft text-secondaryText rounded-xl">
                <!-- fallback stub -->
                No image
              </div>
            </div>
          </slot>
        </div>

        <!-- Right: content -->
        <div class="md:col-span-7 flex flex-col gap-4">
          <h3 class="text-title-large text-ink">{{ title }}</h3>

          <p v-if="description" class="text-body-large text-secondaryText">
            {{ description }}
          </p>

          <div class="flex  gap-4">
            <div v-if="date" class="flex flex-col">
              <p class="text-body-medium text-secondaryText/70 mb-1">Project date</p>
              <p class="text-body-large text-secondaryText">{{ useDateFormat(date, 'MM/YYYY') }}</p>
            </div>
            <div v-if="client" class="flex flex-col">
              <p class="text-body-medium text-secondaryText/70 mb-1">Client</p>
              <p class="text-body-large text-secondaryText">{{ client }}</p>
            </div>
          </div>
          <!-- Tags -->
          <slot name="tags">
            <div
                v-if="tags?.length"
                class="flex flex-wrap gap-3 mt-auto pt-4 "
            >
              <span
                  v-for="(tag, i) in tags"
                  :key="i"
                  class="inline-flex items-center gap-2 rounded-xl  ring-1 ring-accent bg-transparent text-accent text-body-medium font-weight-medium px-3 py-2"
              >
                {{ tag }}
              </span>
            </div>
          </slot>
          <div class="pt-2">
            <slot name="actions"/>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>