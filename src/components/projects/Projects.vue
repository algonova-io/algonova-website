<script setup lang="ts">
import ProjectCard from "./components/ProjectCard.vue";

const taskaroundGradient =
    'linear-gradient(180deg, #F2545B 0%, #FF3232 50%, #FF0084 100%)'
const infitColor = '#005D7E'

const projectCards = [
  {
    title: 'Taskaround',
    artSrc: 'assets/taskaround_mark.svg',
    description: `A hyperlocal gig marketplace app. Designed and built end to end, available on on PlayStore and AppStore`,
    href: `https://taskaround.io/`,
    projectDate: '2025-07',
    client: 'Taskaround',
    tags: ['android', 'ios', 'marketplace', 'MVP']
  },
  {
    title: 'InFit',
    artSrc: 'assets/InFit.svg',
    description: `A workout planner app, to stay on top of your health goals.`,
    href: `https://github.com/KenAli77/InFit/tree/master`,
    projectDate: '2023-05',
    client: 'InFit',
    tags: ['android', 'ios', 'marketplace', 'MVP']
  },
]
</script>

<template>
  <div aria-labelledby="projects-heading" class="relative w-full">
    <div class="mx-auto max-w-6xl px-6  py-14 " style="height: 100vh">
      <!-- Heading -->
      <header class="max-w-6xl">
        <h2 id="team-heading" class="text-title-large text-ink">
          Our Work
        </h2>
        <p class="text-body-large text-secondaryText mt-4">
          We design and build digital products that are simple, scalable, and delightful to use.
          Each project tells a story of how we solved real problems with thoughtful design and solid engineering.
        </p>
      </header>
      <div class="space-y-6 md:space-y-7 mt-12 mb-12 pb-11">
        <!-- Taskaround -->
        <ProjectCard
            v-for="card in projectCards"
            :title="card.title"
            :artSrc="card.artSrc"
            :artAlt="card.title"
            :date="card.projectDate"
            :client="card.client"
            :tags="card.tags"
            :description="card.description"
            :href="card.href"

        >
        </ProjectCard>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>