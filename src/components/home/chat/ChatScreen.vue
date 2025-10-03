<script setup lang="ts">
import {onMounted, ref} from 'vue'
import ChatThread from './ChatThread.vue'
import {httpsCallable} from 'firebase/functions';
import {ChatMessage} from "../../../models/Chat";
import ProjectInput from "../../core/ProjectInput.vue";
import {functions} from "../../../main";

onMounted(() => {

})
/** Mock conversation to match your screenshot */
const messages = ref<ChatMessage[]>([])

async function handleSubmit(text: string) {
  const sendMessage = httpsCallable(functions, "chat")

  const { stream, data } = await sendMessage.stream({
    text: text,
    sessionId: "123456789"
  });

  for await (const messageChunk of stream) {
    // update the UI every time a new chunk is received
    // from the callable function
    updateUi(messageChunk);
  }
}

function updateUi(messageChunk: any) {
  messages.value = [
    ...messages.value,
    ...messageChunk.messages.map((m: any) => ({
      id: m.id,
      sender: m.sender,
      text: m.text,
      createdAt: m.createdAt,
    })),
  ]
}
</script>

<template>
  <section class="relative hero-background min-h-screen">
    <!-- Chat body -->
    <div class="mx-auto flex min-h-[80vh] max-w-6xl flex-col gap-6 px-6 pt-6">
      <!-- Thread -->
      <ChatThread :messages="messages" />

      <!-- Options row (assistant quick picks) -->
<!--      <div class="mt-2">-->
<!--        <ChatOptions-->
<!--            :options="options"-->
<!--            :active-id="activeOptionId"-->
<!--            @select="handleOptionSelect"-->
<!--        />-->
<!--      </div>-->

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