<script setup lang="ts">
import {Directive, nextTick, onMounted, ref, watch} from 'vue'
import ChatThread from './ChatThread.vue'
import {httpsCallable} from 'firebase/functions';
import {ChatMessage} from "../../../models/Chat";
import ProjectInput from "../../core/ProjectInput.vue";
import {auth, db, functions} from "../../../main";
import {onSnapshot, collection} from "firebase/firestore";
import {signInAnonymously} from "firebase/auth";
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const sessionId = ref<string>();
const messages = ref<ChatMessage[]>([])
const isModelTyping = ref<boolean>(false)
const md = new MarkdownIt()
const props = withDefaults(defineProps<{
  initialMessage: string
}>(), {
  initialMessage: "",
})
onMounted(async () => {
  signInAnonymously(auth).then((data) => {
    console.log("Signed in as: ", data.user.uid, "")
    sessionId.value = data.user.uid;

    onSnapshot(collection(db, `chats/${sessionId.value}/messages`), (data) => {
          const update = data.docs.map((doc) => {
            return doc.data() as ChatMessage
          }).sort((a, b) => b.createdAt - a.createdAt)
          if (messages.value.length === 0) {
            messages.value = update.reverse();
          } else {
            messages.value.push(update[0])
          }
        }
    )
  }).catch((error) => {
    console.log(error)
  })
})

async function handleSubmit(text: string) {
  isModelTyping.value = true;

  const sendMessage = httpsCallable(functions, "chat", {})
  const responseId = crypto.randomUUID();
  const {stream, data} = await sendMessage.stream({
    prompt: text,
    messageId: responseId,
    sessionId: sessionId.value,
  });
  const newMessage: ChatMessage = {
    id: responseId,
    content: "",
    createdAt: Date.now(),
    role: "model",
  }
  messages.value.push(newMessage);
  for await (const messageChunk of stream) {
    // update the UI every time a new chunk is received
    // from the callable function
    const message = messageChunk as any
    if(!message.content)
      continue;
    updateUi(message.content, responseId);
  }
  isModelTyping.value = false;

}
function toText(content: unknown): string {
  if (Array.isArray(content)) {
    // Genkit Part[]—concatenate text parts; adjust if you store multiple parts
    return content.map((p: any) => p?.text ?? '').join('')
  }
  return String(content ?? '')
}

const vMarkdown: Directive<HTMLElement, unknown> = {
  mounted(el, binding) {
    const html = md.render(toText(binding.value))
    el.innerHTML = DOMPurify.sanitize(html)
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return
    const html = md.render(toText(binding.value))
    el.innerHTML = DOMPurify.sanitize(html)
  },
}

function updateUi(messageChunk: string, messageId: string) {
  // find the last element with given id and then edit its content by appending the new chunk
  messages.value = messages.value.map((message) => {
    if (message.id === messageId) {
      message.content = message.content + messageChunk;
    }
    return message
  })
}
</script>

<template>
  <section class="relative hero-background min-h-screen">
    <!-- Chat body -->
    <div class="mx-auto flex h-[90vh] max-w-6xl flex-col  px-6 pt-6">
      <!-- Thread -->
      <ChatThread :messages="messages" :is-model-typing="isModelTyping"/>

      <!-- Options row (assistant quick picks) -->
      <!--      <div class="mt-2">-->
      <!--        <ChatOptions-->
      <!--            :options="options"-->
      <!--            :active-id="activeOptionId"-->
      <!--            @select="handleOptionSelect"-->
      <!--        />-->
      <!--      </div>-->

      <!-- Spacer pushes composer down -->
<!--      <div class="flex-1"></div>-->

      <!-- Composer -->
      <div class="pb-10  sticky bottom-0 z-20 -mx-6 px-6 pt-3
               bg-gradient-to-t from-soft/90 to-soft/30
               ">
        <ProjectInput @submit="handleSubmit"/>
      </div>
    </div>
  </section>
</template>