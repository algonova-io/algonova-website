<script setup lang="ts">
import ProjectInput from '../../core/ProjectInput.vue'
import ScrollCue from '../../core/ScrollCue.vue'
import TypeWriter from "../TypeWriter.vue";
import {useModalStore} from "../../modals/composable/useModalStore";

const {toggleChat, setData, chatActive} = useModalStore()

function onSubmit(value: string) {
    if (chatActive.value) return
    setData(value)
    toggleChat()
}
</script>

<template>
  <section id="home">
    <div class="mx-auto flex flex-col max-w-6xl  justify-space-between px-6" style="height: 90vh">
      <div style="height:50vh" class="flex flex-col justify-center">
        <div class="max-w-3xl">
          <h1 class="text-ink text-title-large home-text">
            We turn your ideas into
          </h1>
          <p class="mt-2">
            <span class="text-accent text-title-large">
              <TypeWriter
                  :words="[
                  'market ready solutions.',
                  'scalable digital products.',
                  'beautiful, functional apps.',
                  'beautiful web experiences.'
                ]"
                  :typeSpeed="80"
                  :deleteSpeed="45"
                  :pauseAfterType="4000"
                  :pauseAfterDelete="400"
              />
            </span>
          </p>
        </div>

        <div class="flex w-full flex-col items-start mt-14 gap-4 justify-center">
          <ProjectInput @submit="onSubmit"/>
          <div class="ms-2 flex flex-row justify-bottom items-start">
            <img src="/src/assets/Arrow_04.svg" style="height: 60px" class="me-4">
            <div class="mt-4 gap-0 flex-row flex items-start ">
              <span class="text-body-small md:text-body-large mt-6 font-semibold" >Our AI assistant will turn your idea into a clear plan — and a free estimate in minutes.
                </span>
            </div>
            <img class="mt-6 mx-6" src="/src/assets/smiley_drawing.svg" style="height: 60px">

          </div>
        </div>

      </div>
      <div class="absolute bottom-6 left-0 right-0  justify-center hidden md:flex">
        <ScrollCue />
      </div>

    </div>
  </section>
</template>
