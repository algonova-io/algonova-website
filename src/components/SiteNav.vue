
<script setup lang="ts">
import LogoMark from './LogoMark.vue'
import NavLink from './NavLink.vue'
import PrimaryButton from './PrimaryButton.vue'
</script>

<template>
  <header class="sticky top-0 z-20">
    <nav class="mx-auto grid max-w-6xl grid-cols-2 items-center px-6 py-5">
      <div class="flex items-center">
        <LogoMark :size="180" />
      </div>
      <!-- Right cell: nav links + CTA -->
      <div class="flex items-center justify-end gap-6">
        <div class="hidden md:flex items-center gap-2">
          <NavLink class="text-[21px]" href="#" active>Home</NavLink>
          <NavLink class="text-[21px]" href="#">About</NavLink>
          <NavLink class="text-[21px]" href="#">Projects</NavLink>
        </div>
        <div class="flex-1"></div>
        <PrimaryButton as="a" href="#">Get in touch</PrimaryButton>
      </div>
    </nav>
  </header>
</template>
