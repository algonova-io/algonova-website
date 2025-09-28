<script setup lang="ts">
/**
 * Reusable project banner card.
 * - Responsive 2-column layout (content left, brand/art right).
 * - Custom background via Tailwind classes or inline gradient (arbitrary value).
 * - Optional link wrapper for the whole card.
 */

interface Props {
  title: string                 // "Taskaround"
  description?: string          // short copy
  // For the small eyebrow (optional), e.g., a category tag
  eyebrow?: string

  // Background presentation. Provide either:
  // 1) bgClass: Tailwind classes (e.g., "bg-[#0e677b]") or arbitrary gradient
  // 2) bgStyle: inline CSS style for fine-grained gradients if you prefer
  bgClass?: string
  bgStyle?: Record<string, string>

  // Text color utilities (defaults optimized for dark backgrounds)
  titleClass?: string           // defaults to text-white text-title-medium
  descClass?: string            // defaults to text-white/90 text-body-medium
  eyebrowClass?: string         // defaults to text-white/70

  // Right-side artwork
  artSrc?: string               // optional image path
  artAlt?: string
  // If true, the outer wrapper is an anchor; otherwise it's a div
  href?: string | null

  // Appearance
  rounded?: string              // e.g. "rounded-md", defaults to "rounded"
  padding?: string              // e.g. "p-8 md:p-10", defaults below
}
const props = withDefaults(defineProps<Props>(), {
  description: '',
  eyebrow: '',
  bgClass: '',
  bgStyle: undefined,
  titleClass: 'text-white text-title-medium',
  descClass: 'text-white/90 text-body-medium',
  eyebrowClass: 'text-white/70',
  artSrc: '',
  artAlt: '',
  href: null,
  rounded: '0',
  padding: 'px-6 py-7 md:px-10 md:py-9',
})
</script>

<template>
  <component
      :is="href ? 'a' : 'div'"
      :href="href || undefined"
      class="block w-full"
  >
    <div
        class="relative w-full overflow-hidden  shadow-sm"
        :class="[ bgClass]"
        :style="bgStyle"
    >
      <div class="grid grid-cols-12 gap-6 md:gap-8 items-center" :class="padding">
        <!-- Left content -->
        <div class="col-span-6 md:col-span-6 gap-8	h-full flex flex-col">

          <h1 class="text-title-large text-white">
            {{ title }}
          </h1>

          <p v-if="description" class="text-white text-body-large">
            {{ description }}
          </p>
        </div>

        <!-- Right artwork/brand -->
        <div class="col-span-6 md:col-span-6 flex justify-end">
          <!-- Slot > artSrc fallback -->
          <slot name="art">
            <img
                v-if="artSrc"
                :src="artSrc"
                :alt="artAlt || `${title} logo`"
                class="max-h-[96px] md:max-h-[128px] object-cover"
                loading="lazy"
            />
          </slot>
        </div>
      </div>
    </div>
  </component>
</template>