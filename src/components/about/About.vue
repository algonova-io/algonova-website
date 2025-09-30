<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
import DecorativeStroke from './DecorativeStroke.vue'
import IllustrationSpace from './components/IllustrationSpace.vue'
import BackgroundShape from "../core/BackgroundShape.vue";
import Team from "./Team.vue";

type Feature = {
  icon: string
  title: string
  body: string
  alt?: string
}

const features: Feature[] = [
  {
    icon: '/src/assets/craft.svg',
    title: 'End to end craft',
    body:
        'Product, design, mobile & cloud handled by one accountable expert.',
    alt: 'Craft icon'
  },
  {
    icon: '/src/assets/empathy.svg',
    title: 'Founder empathy',
    body:
        'We think like owners and optimize for learning and traction.',
    alt: 'Empathy icon'
  },
  {
    icon: '/src/assets/shipping.svg',
    title: 'Bias for shipping',
    body:
        'Lean cycles, tight feedback, visible progress every week.',
    alt: 'Shipping icon'
  },
  {
    icon: '/src/assets/growth.svg',
    title: 'Built to grow',
    body:
        'Clean architecture, scalable infrastructure, maintainable code.',
    alt: 'Growth icon'
  }
]
const ribbonInitial =
    'M -100 200 L 380 320 L 340 950'; // similar to your “left vertical-ish line”
const ribbonTeam =
    'M 60 450 L 540 330 L 1020 650 L 880 980'; // used on the team page demo
const ribbonWork =
    'M 160 180 L 420 320 L 520 980'; // used on the projects page demo

</script>

<template>
  <div class="relative w-full">
<!--    <BackgroundShape class="text-accent -z-10"-->
<!--                     :d="ribbonInitial"-->
<!--                     :morphTargets="[ribbonInitial]"-->
<!--                     :strokeWidth="1"-->
<!--                     fill="white"-->
<!--                     :points="[-->
<!--        { x: 0,   y: 260 },  // start of your diagonal/polyline-->
<!--        { x: 300, y: 440 },  // end (or add more points for a bent line)-->
<!--        { x: 240, y: 1200 },  // end (or add more points for a bent line)-->
<!--      ]"-->

<!--                     :autoMorph="true"-->
<!--    />-->

    <div
        aria-labelledby="about-heading"
        class="relative w-full"
    >


      <!-- Decorative diagonal stroke -->
      <!--    <DecorativeStroke class="hidden md:block" :strokeWidth="1" />-->

      <div class=" mx-auto max-w-6xl px-6 py-14">
        <div class="grid items-start gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
          <!-- Left: Hero text -->
          <div class="d-flex flex-column">
            <h2 id="about-heading" class="text-title-large  text-ink">
              Ship the first version people
              <span class="text-accent">love</span>.
            </h2>
            <div class="flex-1"></div>
            <p class="text-body-large font-weight-medium text-ink mt-14 max-w-prose">
              Algonova partners with non-technical founders to design and build beautiful, market-ready mobile & web
              apps
              fast. We handle product, design, and development end-to-end so you can validate sooner and grow with
              confidence. </p>
            <div class="flex-1"></div>

          </div>

          <!-- Right: Illustration -->
          <div class="d-flex flex-column items-end justify-self-end">
            <IllustrationSpace/>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-10">
          <!-- Heading -->
          <div
              class="md:col-span-4 order-1 md:order-none
           flex md:items-start md:justify-end
           mt-4 md:mt-14"
          >
            <h1 class="text-title-large text-center md:text-left md:w-[220px]">
              Why Algonova
            </h1>
          </div>

          <!-- Feature grid -->
          <div
              class="md:col-span-8 order-2
           mt-6 md:mt-10
           grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12"
          >
            <FeatureCard
                v-for="(f, i) in features"
                :key="i"
                :icon="f.icon"
                :alt="f.alt"
                :title="f.title"
                :body="f.body"
            />
          </div>
        </div>
      </div>
    </div>
    <Team/>

  </div>

</template>