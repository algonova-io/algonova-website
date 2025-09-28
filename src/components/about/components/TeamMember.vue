<script setup lang="ts">
interface Props {
  photo: string
  name: string
  role: string
  quote?: string
  bio: string
  alt?: string
}
const props = defineProps<Props>()
</script>

<template>
  <article class="grid grid-cols gap-4 md:gap-6 items-start">
    <div class="grid-cols grid">
      <figure class="relative">
        <img
            :src="photo"
            :alt="alt || name"
            class="object-cover grayscale w-full"
            style=" width: 200px"
            loading="lazy"
        />
      </figure>

      <div class="min-w-0">
        <h3 class="text-title-large leading-tight text-ink">
          {{ name }}
        </h3>
        <p class="text-title-small font-semibold text-ink mt-1">
          {{ role }}
        </p>
        <p v-if="quote" class="text-body-medium font-bold text-secondaryText  mt-2">
          “{{ quote }}”
        </p>

      </div>

    </div>

    <p class="text-body-large text-ink mt-5">
      {{ bio }}
    </p>

  </article>
</template>