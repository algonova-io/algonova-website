<template>
  <motion.div  class="min-h-screen flex items-center justify-center overflow-auto bg-soft px-4 py-2">
    <div class="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 overflow-auto">
      <h1 class="text-title-large text-ink mb-6 text-center">Contact Us</h1>
      <form  @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-secondaryText">Name</label>
            <input
                v-model.trim="form.name"
                @blur="markTouched('name')"
                @input="markTouched('name')"
                id="name"
                name="name"
                type="text"
                autocomplete="given-name"
                :aria-invalid="!!validationErrors.name.err"
                :aria-describedby="validationErrors.name.err ? 'err-name' : undefined"
                class="mt-1 p-1.5 w-full rounded-lg border border-white/20 bg-white/40 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                required
            />
            <p v-if="validationErrors.name.err" id="err-name" class="mt-1 text-sm text-accent/80">{{
                validationErrors.name.err
              }}</p>
          </div>

        <div>
          <label for="email" class="block text-sm font-medium text-secondaryText">Email</label>
          <input
              v-model.trim="form.email"
              id="email"
              @blur="markTouched('email')"
              @input="markTouched('email')"

              name="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              :aria-invalid="!!validationErrors.email.err"
              :aria-describedby="validationErrors.email.err ? 'err-email' : undefined"
              class="mt-1 p-1.5 w-full rounded-lg border border-white/20 bg-white/40 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              required
          />
          <p v-if="validationErrors.email.err" id="err-email" class="mt-1 text-sm text-accent/80">{{
              validationErrors.email.err
            }}</p>
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-secondaryText">Message</label>
          <textarea
              v-model.trim="form.message"
              @blur="markTouched('message')"
              @input="markTouched('message')"

              id="message"
              name="message"
              rows="4"
              :aria-invalid="!!validationErrors.message.err"
              :aria-describedby="validationErrors.message.err ? 'err-message' : undefined"
              class="mt-1 w-full p-1.5 rounded-lg border resize-none border-white/20 bg-white/40 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              required
              minlength="10"
          />
          <p v-if="validationErrors.message.err" id="err-message" class="mt-1 text-sm text-accent/80">{{
              validationErrors.message.err
            }}</p>
        </div>

        <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full bg-accent text-white font-semibold py-2 rounded-lg hover:bg-accent/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Send Message</span>
          <span v-else>Sending…</span>
        </button>
      </form>
    </div>
  </motion.div>
</template>
<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {toast} from "vue-sonner";
import {motion} from "motion-v";

type ContactForm = {
  name: string
  surname: string
  email: string
  message: string
}

const validationErrorsBase = {
  name: {
    touched: false,
    err: ''
  },
  surname: {
    touched: false,
    err: ''
  },
  email: {
    touched: false,
    err: ''
  },
  message: {
    touched: false,
    err: ''
  },
}

const contactFormBase = {
  name: '',
  surname: '',
  email: '',
  message: '',
}
const form = reactive<ContactForm>({...contactFormBase})
const isSubmitting = ref(false)
const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

const validationErrors = reactive<Record<keyof ContactForm, { touched: boolean, err: string }>>(structuredClone(validationErrorsBase))

const hasErrors = computed(() => Object.values(validationErrors).map(x => x.err).some(Boolean))
const isTouched = computed(() => Object.values(validationErrors).every(x => x.touched))

const canSubmit = computed(() => {
  return !isSubmitting.value && !hasErrors.value && isTouched.value
})



function validateForm() {
  if (validationErrors.name.touched) {
    validationErrors.name.err = form.name.trim() ? '' : 'Name is required'
  }
  if (validationErrors.surname.touched) {
    validationErrors.surname.err = form.surname.trim() ? '' : 'Surname is required'
  }
  if (validationErrors.email.touched) {
    validationErrors.email.err = form.email.trim()
        ? (isValidEmail(form.email) ? '' : 'Enter a valid email')
        : 'Email is required'
  }
  if (validationErrors.message.touched) {
    validationErrors.message.err = form.message.trim().length >= 10
        ? ''
        : 'Message must be at least 10 characters'
  }

  return !hasErrors.value && isTouched.value
}

async function handleSubmit() {
  try {
    console.log('Submitting form:', form)
    console.log('Validation errors:', validationErrors)
    isSubmitting.value = true
    if (!validateForm()) {
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1000)) //todo API call
    toast.success('Message sent successfully!')
    Object.assign(validationErrors, structuredClone(validationErrorsBase))
    Object.assign(form, {...contactFormBase})
    validateForm()
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error('An error occurred while submitting the form. Please try again later.')
  } finally {
    isSubmitting.value = false
  }
}



function markTouched(field: keyof ContactForm) {
  if (validationErrors[field].touched) return

  validationErrors[field].touched = true
  validateForm()
}

watch(form, ()  => {
  validateForm()
})


</script>