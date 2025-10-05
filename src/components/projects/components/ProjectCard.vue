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
  target?: '_self' | '_blank'
  date?: Date | string
  client?: string
  artSrc?: string
  artAlt?: string
}

const props = withDefaults(defineProps<ProjectCardProps>(),  {
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
  <component :is="href ? 'a' : 'div'" :href="href || undefined" :target="href ? target : undefined"
             class="block w-full ">
    <div class="relative w-full overflow-hidden rounded-2xl shadow-2xl"  >
      <div
          class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 bg-white shadow-2xl rounded-2xl p-6 md:p-8 overflow-hidden"
      >
        <!-- Left: image / media -->
        <div class="md:col-span-5">
          <slot name="media">
            <div class="overflow-hidden rounded-xl">
              <img v-if="artSrc"
                   :src="artSrc"
                   :alt="artAlt || `${title} cover`"
                   class="transition-transform duration-300 h-80 md:h-80 w-full object-contain hover:scale-[1.02]"
                    loading="lazy" />
              <div v-else class="flex items-center justify-center h-40 md:h-56 bg-soft text-secondaryText rounded-xl">
                <!-- fallback stub -->
                No image
              </div>
            </div>
          </slot>
        </div>

        <!-- Right: content -->
        <div class="md:col-span-7 flex flex-col gap-3">
          <h3 class="text-title-medium text-ink">{{ title }}</h3>

          <p v-if="description" class="text-body-medium text-secondaryText">
            {{ description }}
          </p>

          <div class="flex  gap-2">
            <div v-if="date" class="flex flex-col">
              <p class="text-sm text-secondaryText/70 mb-1">Project date</p>
              <p class="text-body-medium text-secondaryText">{{ useDateFormat(date, 'DD-MM-YYYY') }}</p>
            </div>
            <div v-if="client" class="flex flex-col">
              <p class="text-sm text-secondaryText/70 mb-1">Client</p>
              <p class="text-body-medium text-secondaryText">{{ client }}</p>
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
                  class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-accent text-white text-xs font-bold px-3 py-1.5 shadow-sm hover:shadow-md transition"
              >
                {{ tag }}
              </span>
            </div>
          </slot>

          <!-- Optional CTA area -->
          <div class="pt-2">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </component>
</template>