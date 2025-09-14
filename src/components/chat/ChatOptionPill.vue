<script setup lang="ts">
const emit = defineEmits<{ (e: 'select'): void }>()
const props = withDefaults(defineProps<{
  label: string
  active?: boolean
}>(), {
  active: false
})
</script>

<template>
  <button
      type="button"
      class="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition
           hover:border-black/20 hover:shadow
           focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      :aria-pressed="active"
      @click="emit('select')"
  >
    {{ label }}
  </button>
</template>