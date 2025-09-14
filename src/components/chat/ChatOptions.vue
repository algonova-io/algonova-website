<script setup lang="ts">
import ChatOptionPill from './ChatOptionPill.vue'
import {ChatOption} from "../../models/Chat";

const emit = defineEmits<{ (e: 'select', option: ChatOption): void }>()
const props = defineProps<{
  options: ChatOption[]
  activeId?: string | null
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-3">
    <ChatOptionPill
        v-for="opt in options"
        :key="opt.id"
        :label="opt.label"
        :active="opt.id === activeId"
        @select="emit('select', opt)"
    />
  </div>
</template>