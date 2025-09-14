
<script setup lang="ts">
import { ref } from 'vue'
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ (e: 'submit', value: string): void }>()

function handleSubmit() {
  emit('submit', model.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit"
        class=" flex w-full  items-center rounded-full bg-white shadow drop-shadow-card ring-1 ring-black/5">
    <input v-model="model"
           type="text"
           placeholder="Tell us about your project"
           class="flex-1 rounded-full bg-transparent px-8 py-4 text-lg outline-none placeholder:text-ink/40" />
    <button type="submit"
            class="mr-2 grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition hover:opacity-90">
      <font-awesome-icon class="buttonIcon"  :icon="faArrowUp" />
    </button>
  </form>
</template>

<style scoped>
.buttonIcon{
  font-size: 18px;
}
</style>
