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
  <article class=" d-flex flex-column gap-4 md:gap-6 items-start">
    <div class="grid-cols-12 grid gap-6 justify-start items-center">
      <div class="col-span-4">
        <figure class="relative  aspect-square w-full h-full ">
          <v-img
              :src="photo"
              :alt="alt || name"
              class="object-cover rounded-full w-full h-full"
              loading="lazy"
          />
        </figure>
      </div>
      <div class="col-span-8">
        <h3 class="text-title-large  text-ink" style="line-height: 40px">
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