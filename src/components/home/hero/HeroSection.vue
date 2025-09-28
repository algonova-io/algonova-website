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
  <section>
    <div class="mx-auto flex flex-col max-w-6xl justify-space-between px-6" style="height: 90vh">
      <div style="height:50vh" class="flex flex-col justify-center">
        <div class="max-w-3xl">
          <h1 class="text-ink text-title-large">
            We turn your ideas into
          </h1>
          <p class="mt-2">
            <span class="text-accent text-title-large">market ready solutions.</span>
          </p>
        </div>

        <div class="vt-composer flex w-full flex-col items-center mt-14 justify-center">
          <ProjectInput @submit="onSubmit"/>
          <p class="text-body-large mt-6 font-semibold">Our Ai assistant will guide you to a quick project estimate
            ✨</p>
        </div>

      </div>
      <div class="flex-1"></div>
      <ScrollCue/>
      <div class="flex-1"></div>

    </div>
  </section>
</template>
