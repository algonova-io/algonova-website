<script setup lang="ts">
import {ref} from 'vue'
import ChatThread from './ChatThread.vue'
import ChatOptions from './ChatOptions.vue'
import {ChatMessage, ChatOption} from "../../models/Chat";
import ProjectInput from "../ProjectInput.vue";


/** Mock conversation to match your screenshot */
const messages = ref<ChatMessage[]>([
  {
    id: 'm1',
    sender: 'assistant',
    text:
        "Got it. Thanks for the context. To get started, could you tell me what type of project you're requesting a quote for? " +
        'You can select one from the options below, or type in another.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'I have an idea for an app I want to get developed, perhaps an MVP to start with.',
    createdAt: new Date().toISOString(),
  },
])

const options = ref<ChatOption[]>([
  { id: 'mobile', label: 'Mobile App' },
  { id: 'api', label: 'API or Backend service' },
  { id: 'web', label: 'Web App' },
  { id: 'desktop', label: 'Desktop software' },
  { id: 'integration', label: 'Integration with an existing system' },
  { id: 'cross', label: 'Cross platform' },
])

const activeOptionId = ref<string | null>(null)

function handleOptionSelect(opt: ChatOption) {
  activeOptionId.value = opt.id
  // push a user message for visibility
  messages.value = [
    ...messages.value,
    {
      id: crypto.randomUUID(),
      sender: 'user',
      text: opt.label,
      createdAt: new Date().toISOString(),
    },
  ]
}

function handleSubmit(text: string) {
  messages.value = [
    ...messages.value,
    { id: crypto.randomUUID(), sender: 'user', text, createdAt: new Date().toISOString() },
  ]
  // here you might call your API, then push an assistant response
}
</script>

<template>
  <section class="relative hero-background min-h-screen">
    <!-- Chat body -->
    <div class="mx-auto flex min-h-[80vh] max-w-6xl flex-col gap-6 px-6 pt-6">
      <!-- Thread -->
      <ChatThread :messages="messages" />

      <!-- Options row (assistant quick picks) -->
      <div class="mt-2">
        <ChatOptions
            :options="options"
            :active-id="activeOptionId"
            @select="handleOptionSelect"
        />
      </div>

      <!-- Spacer pushes composer down -->
      <div class="flex-1"></div>

      <!-- Composer -->
      <div class="pb-10 vt-composer sticky bottom-0 z-20 -mx-6 px-6 pt-3
               bg-gradient-to-t from-soft/90 to-soft/30
               ">
        <ProjectInput @submit="handleSubmit" />
      </div>
    </div>
  </section>
</template>