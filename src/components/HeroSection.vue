
<script setup lang="ts">
import ProjectInput from './ProjectInput.vue'
import ScrollCue from './ScrollCue.vue'
import BackgroundLogo from "./BackgroundLogo.vue";

function onSubmit(value: string) {
  console.log('Project idea:', value)
}
</script>

<template>
  <section class="relative hero-background">

    <div class="mx-auto max-w-6xl px-6 pt-10 pb-24">
      <div class="mt-12 max-w-3xl">
        <h1 class="text-5xl font-extrabold leading-tight text-ink">
          We turn your ideas into
        </h1>
        <p class="mt-2 text-5xl font-extrabold leading-tight">
          <span class="text-accent">market ready solutions.</span>
        </p>
      </div>

      <div class="mt-20">
        <ProjectInput @submit="onSubmit" />
      </div>

      <ScrollCue />
    </div>
  </section>
</template>
