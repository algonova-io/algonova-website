<script setup lang="ts">
interface Props {
  icon: string            // e.g. 'assets/icons/craft.svg'
  title: string           // uses text-title-small
  body: string            // uses text-body-medium
  alt?: string
}
const props = defineProps<Props>()
</script>

<template>
  <article
      class="group  bg-white ring-1 ring-black/5 drop-shadow-card py-4 px-6 h-full
           transition hover:shadow-md hover:ring-black/10"
  >
    <div class="flex flex-col justify-center items-center gap-4">
      <img
          :src="icon"
          :alt="alt || title"
          class="size-10 shrink-0 md:size-12"
          loading="lazy"
      />
      <div class="min-w-0 text-center">
        <h3 class="text-title-small tracking-tight text-ink">
          {{ title }}
        </h3>
        <p class="text-body-large text-ink mt-2">
          {{ body }}
        </p>
      </div>
    </div>
  </article>
</template>