<script setup lang="ts">

import TeamMember from "./components/TeamMember.vue";
import BackgroundShape from "../core/BackgroundShape.vue";

type Member = {
  photo: string
  name: string
  role: string
  quote?: string
  bio: string
  alt?: string
}

const members: Member[] = [
  {
    photo: '/src/assets/vitalii.png',
    name: 'Kenidiid',
    role: 'Product Engineer',
    quote: "If it doesn’t feel good to use, it’s not finished",
    bio: `Kenidiid is our Product Engineer. Over his career, he’s helped multiple small companies bring new
products to life from the ground up. Entirely self-taught and an entrepreneur at heart, he not only codes
and designs but also drives the business side — from winning clients to shaping the vision. He cares deeply
about the details — not just how software works, but how it feels. From subtle design touches to the small
joys in an interaction, Kenidiid is driven by creating products that delight as much as they deliver.`,
    alt: 'Portrait of Kenidiid'
  },
  {
    photo: '/src/assets/vitalii.png',
    name: 'Vitalii',
    role: 'Software Engineer',
    quote: 'Challenges are what make building fun',
    bio: `Vitalii is our Software Engineer. He’s worked on technically demanding projects across multiple domains —
from Augmented Reality applications to video conferencing platforms and beyond. Analytical by nature, he approaches
problems with precision and curiosity, a trait that once earned him top honors in math olympiads back home in Ukraine.
Whether it’s mastering a new tech stack or untangling complex systems, Vitalii thrives on the challenges that push
technology to its limits.`,
    alt: 'Portrait of Vitalii'
  }
]

</script>

<template>
  <section aria-labelledby="team-heading"  class="relative w-full ">
    <BackgroundShape class="text-accent -z-10"
                     :d="ribbonInitial"
                     :morphTargets="[ribbonInitial]"
                     :strokeWidth="1"
                     fill="white"
                     :points="[
        { x: 0,   y: 500 },  // start of your diagonal/polyline
        { x: 400, y: 130 },  // end (or add more points for a bent line)
        { x: 740, y: 420 },  // end (or add more points for a bent line)
        { x: 440, y: 1200 },  // end (or add more points for a bent line)
      ]"

                     :autoMorph="true"
    />

    <div class="mx-auto max-w-6xl px-6  py-14 " style="height: 100vh">
      <!-- Heading -->
      <header class="max-w-6xl">
        <h2 id="team-heading" class="text-title-large text-ink">
          The Team
        </h2>
        <p class="text-body-large text-secondaryText mt-4">
          We are a small team of two with big ideas, and a passion for crafting thoughtful software.
        </p>
      </header>

      <!-- Members -->
      <div class="mt-10 md:mt-12 grid gap-12 md:gap-16 md:grid-cols-2">
        <TeamMember
            v-for="(m, i) in members"
            :key="i"
            :photo="m.photo"
            :name="m.name"
            :role="m.role"
            :quote="m.quote"
            :bio="m.bio"
            :alt="m.alt"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>