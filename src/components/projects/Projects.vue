<script setup lang="ts">
import ProjectCard from "./components/ProjectCard.vue";

const taskaroundGradient =
    'linear-gradient(180deg, #F2545B 0%, #FF3232 50%, #FF0084 100%)'
const infitColor = '#005D7E'

</script>

<template>
  <section aria-labelledby="projects-heading"  id="projects" class="relative w-full">
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
      <div class="space-y-6 md:space-y-7 mt-12">
        <!-- Taskaround -->
        <ProjectCard
            title="Taskaround"
            :description="`A hyperlocal gig marketplace app. Designed and built end to end, available on on PlayStore and AppStore.`"
            :bgStyle="{ background: taskaroundGradient }"
            rounded="rounded"
            padding="px-6 py-8 md:px-10 md:py-10"
        >
          <template #art>
            <!-- Big brand lockup on the right -->
                  <img src="/src/assets/taskaround_mark.svg" alt="" class="fill-height"/>
          </template>
        </ProjectCard>

        <!-- InFit -->
        <ProjectCard
            eyebrow="InFit"
            title="InFit"
            :description="`A workout planner app, to stay on top of your health goals.`"
            :bg-style="{ background: infitColor }"
            rounded="rounded"
            padding="px-6 py-8 md:px-10 md:py-10"
            :titleClass="`text-white text-title-medium`"
            :descClass="`text-white/90 text-body-medium`"
            :eyebrowClass="`text-white/80`"
        >
          <template #art>
            <!-- Oversized right-side wordmark matching the reference -->
            <img src="../../assets/InFit.svg" alt="" class="fill-height"/>
          </template>
        </ProjectCard>
      </div>

    </div>
  </section>
</template>

<style scoped>

</style>