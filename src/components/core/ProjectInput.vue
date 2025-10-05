<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons/faCommentDots";
import { motion } from "motion-v"

const model = defineModel<string>({default: ''})
const emit = defineEmits<{ (e: 'submit', value: string): void }>()
watch(model, () => {
  console.log('model changed', model.value)
})
const inputRef = ref<HTMLInputElement | null>(null)

function handleSubmit(event?: Event)  {

  if (model.value.trim().length === 0) {
    return
  }
  emit('submit', model.value)
  model.value = ""
}

onMounted(() => {
  inputRef.value?.focus()
})

</script>

<template>
  <motion.div class="w-full"  layoutId="textInput">
    <form
        @submit.prevent="handleSubmit"
        class="flex w-full
         items-center
         rounded-lg
         bg-white
         shadow-[0_0_4px_0_#F2545B]
         backdrop-blur-lg ring-1 ring-accent">
      <input v-model="model"
             type="text"
             ref="inputRef"
             placeholder="Tell me your vision, I’ll show you the path"
             class="flex-1 rounded-lg bg-transparent px-8 py-4 text-lg outline-none placeholder:text-ink/40"/>
      <button type="submit"
              @click="handleSubmit"
              class="mr-2 rounded-lg grid h-10 w-10 place-items-center  bg-ink text-white transition hover:opacity-90">
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
            mode="out-in"
        >
        <span class="inline-block" v-if="model.trim().length > 0">
                  <font-awesome-icon
                      key="arrow"
                      :icon="faArrowUp"
                      class="w-4 h-4"
                  />
        </span>
          <span v-else
                key="comment"
                class="inline-block">
                  <font-awesome-icon
                      key="comment"
                      :icon="faCommentDots"
                      class="w-4 h-4"
                  />
        </span>
        </Transition>
      </button>
    </form>

  </motion.div>
</template>

<style scoped>
.buttonIcon {
  font-size: 18px;
}
</style>
