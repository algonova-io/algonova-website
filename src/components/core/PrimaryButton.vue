<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: string
  href?: string
}>(), {as: 'button'})
</script>

<template>
  <div class=" rounded-lg bg-accent">
    <component
        :is="as"
        :href="href"
        class="inline-flex items-center p-[1px]
        backdrop-blur
           [background:linear-gradient(45deg,rgba(255,255,255,0.8)_0%,transparent_50%,rgba(255,255,255,0.8)_100%)]
           rounded-lg
"
    >
    <span class=" bg-accent px-4 py-2 text-white font-semibold shadow-lg
                  text-body-medium
                  rounded-lg
                 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-accent/40">
      <slot/>
    </span>
    </component>

  </div>
</template>