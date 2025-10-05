<template>
  <div class="min-h-screen flex items-center justify-center overflow-auto bg-soft px-4 py-2">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-md p-8 overflow-auto">
      <h1 class="text-title-large text-ink mb-6 text-center">Contact Us</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="name" class="block text-sm font-medium text-secondaryText">Name</label>
            <input
                v-model.trim="form.name"
                id="name"
                name="name"
                type="text"
                autocomplete="given-name"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                required
            />
            <p v-if="errors.name" id="err-name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>
          <div>
            <label for="surname" class="block text-sm font-medium text-secondaryText">Surname</label>
            <input
                v-model.trim="form.surname"
                id="surname"
                name="surname"
                type="text"
                autocomplete="family-name"
                :aria-invalid="!!errors.surname"
                :aria-describedby="errors.surname ? 'err-surname' : undefined"
                class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                required
            />
            <p v-if="errors.surname" id="err-surname" class="mt-1 text-sm text-red-600">{{ errors.surname }}</p>

          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-secondaryText">Email</label>
          <input
              v-model.trim="form.email"
              id="email"
              name="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'err-email' : undefined"
              class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
          />
          <p v-if="errors.email" id="err-email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-secondaryText">Message</label>
          <textarea
              v-model.trim="form.message"
              id="message"
              name="message"
              rows="5"
              :aria-invalid="!!errors.message"
              :aria-describedby="errors.message ? 'err-message' : undefined"
              class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              required
              minlength="10"
          />
          <p v-if="errors.message" id="err-message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
        </div>

        <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full bg-accent text-white font-semibold py-2 rounded-lg hover:bg-accent/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="!submitting">Send Message</span>
          <span v-else>Sending…</span>
        </button>

        <p v-if="successMessage" class="text-green-600 text-center mt-3">
          ✅ {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, reactive, ref} from "vue";

type ContactForm = {
  name: string
  surname: string
  email: string
  message: string
}
const form = reactive<ContactForm>({
  name: '',
  surname: '',
  email: '',
  message: '',
})
const isSubmitting = ref(false)
const successMessage = ref('')
const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

const errors = reactive<Record<keyof ContactForm, string>>({
  name: '',
  surname: '',
  email: '',
  message: '',
})

function validateForm() {
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.surname = form.surname.trim() ? '' : 'Surname is required'
  errors.email = form.email.trim()
      ? (isValidEmail(form.email) ? '' : 'Enter a valid email')
      : 'Email is required'
  errors.message = form.message.trim().length >= 10
      ? ''
      : 'Message must be at least 10 characters'

  return !Object.values(errors).some(Boolean)
}

async function handleSubmit() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) //todo API call
    successMessage.value = ''
    if (!validateForm()) {
      successMessage.value = 'Thank you! Your message has been sent.'
      Object.assign(form, {name: '', surname: '', email: '', message: ''})
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

const canSubmit = computed(() => {
  return !isSubmitting.value && Object.values(errors).some(Boolean)
})
</script>