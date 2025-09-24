
<script setup lang="ts">
import ProjectInput from '../../core/ProjectInput.vue'
import ScrollCue from '../../core/ScrollCue.vue'
import BackgroundLogo from "../../core/BackgroundLogo.vue";
import {ref} from "vue";
const emit = defineEmits<{
  (e: 'start-chat', text: string): void
}>()

function onSubmit(value: string) {
  emit('start-chat', value)
}
</script>

<template>
  <section class="relative hero-background ">
    <div class="mx-auto flex flex-col max-w-6xl min-h-screen px-6 pt-10 pb-24">
      <div class="mt-12 max-w-3xl">
        <h1 class="text-5xl font-extrabold leading-tight text-ink">
          We turn your ideas into
        </h1>
        <p class="mt-2 text-5xl font-extrabold leading-tight">
          <span class="text-accent">market ready solutions.</span>
        </p>
      </div>

      <div class="mt-20 vt-composer">
        <ProjectInput @submit="onSubmit" />
      </div>
      <div class="flex-1"></div>
      <ScrollCue class="mb-20"/>
    </div>
  </section>
</template>
