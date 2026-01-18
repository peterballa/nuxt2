<template>
  <div class="plugins-page">
    <h1>Plugins Playground</h1>

    <p class="hint">Check the browser console to see logger output.</p>

    <section class="plugins-section">
      <h2>Validator & Logger custom plugins demo</h2>

      <div class="field-group">
        <label for="email">
          isEmail
        </label>
        <div class="field-with-status">
          <input
            id="email"
            v-model="email"
            type="text"
            :class="inputClass(isEmailValid)"
            placeholder="Type an email address"
          />
          <span class="status-emoji">{{ statusEmoji(isEmailValid) }}</span>
        </div>
      </div>

      <div class="field-group">
        <label for="between">
          isBetween (1 - 10)
        </label>
        <div class="field-with-status">
          <input
            id="between"
            v-model="betweenValue"
            type="number"
            :class="inputClass(isBetweenValid)"
            placeholder="Type a number between 1 and 10"
          />
          <span class="status-emoji">{{ statusEmoji(isBetweenValid) }}</span>
        </div>
      </div>

      <div class="field-group">
        <label for="empty">
          isEmpty
        </label>
        <div class="field-with-status">
          <input
            id="empty"
            v-model="emptyValue"
            type="text"
            :class="inputClass(isEmptyValid)"
            placeholder="Leave empty to be valid"
          />
          <span class="status-emoji">{{ statusEmoji(isEmptyValid) }}</span>
        </div>
      </div>

      <div class="field-group">
        <label for="alpha">
          isAlpha (only letters)
        </label>
        <div class="field-with-status">
          <input
            id="alpha"
            v-model="alphaValue"
            type="text"
            :class="inputClass(isAlphaValid)"
            placeholder="Only letters are valid"
          />
          <span class="status-emoji">{{ statusEmoji(isAlphaValid) }}</span>
        </div>
      </div>

      <div class="field-group">
        <label for="password">
          isStrongPassword (min 8 chars, letters & numbers)
        </label>
        <div class="field-with-status">
          <input
            id="password"
            v-model="passwordValue"
            type="password"
            :class="inputClass(isPasswordValid)"
            placeholder="Type a strong password"
          />
          <span class="status-emoji">{{ statusEmoji(isPasswordValid) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  useContext
} from '@nuxtjs/composition-api'
import type { Validator } from '~/plugins/validator'
import type { Logger } from '~/plugins/logger'

export default defineComponent({
  name: 'PluginsPage',
  setup() {
    const { $validator, $logger } = useContext() as unknown as {
      $validator: Validator
      $logger: Logger
    }

    const email = ref('')
    const betweenValue = ref('')
    const emptyValue = ref('')
    const alphaValue = ref('')
    const passwordValue = ref('')

    const validator = $validator
    const logger = $logger

    const isEmailValid = computed(() => validator.isEmail(email.value))
    const isBetweenValid = computed(() =>
      validator.isBetween(betweenValue.value, 1, 10)
    )
    const isEmptyValid = computed(() => validator.isEmpty(emptyValue.value))
    const isAlphaValid = computed(() => validator.isAlpha(alphaValue.value))
    const isPasswordValid = computed(() =>
      validator.isStrongPassword(passwordValue.value)
    )

    const logValidity = (
      fieldLabel: string,
      isValid: boolean,
      validatorName: string
    ) => {
      const baseMessage = `The ${fieldLabel} is ${
        isValid ? '' : 'not '
      }valid by ${validatorName} validator`
      if (isValid) {
        logger.info(baseMessage)
      } else {
        logger.error(baseMessage)
      }
    }

    watch(email, () => {
      if (email.value === '') return
      logValidity('email', isEmailValid.value, 'isEmail')
    })

    watch(betweenValue, () => {
      if (betweenValue.value === '') return
      logValidity('between value', isBetweenValid.value, 'isBetween')
    })

    watch(emptyValue, () => {
      logValidity('empty value', isEmptyValid.value, 'isEmpty')
    })

    watch(alphaValue, () => {
      if (alphaValue.value === '') return
      logValidity('alpha value', isAlphaValid.value, 'isAlpha')
    })

    watch(passwordValue, () => {
      if (passwordValue.value === '') return
      logValidity('password value', isPasswordValid.value, 'isStrongPassword')
    })

    const inputClass = (isValid: boolean) => {
      return {
        'input-field': true,
        'input-field--valid': isValid,
        'input-field--invalid': !isValid
      }
    }

    const statusEmoji = (isValid: boolean) => (isValid ? '✅' : '❌')

    return {
      email,
      betweenValue,
      emptyValue,
      alphaValue,
      passwordValue,
      isEmailValid,
      isBetweenValid,
      isEmptyValid,
      isAlphaValid,
      isPasswordValid,
      inputClass,
      statusEmoji
    }
  }
})
</script>

<style scoped>
.plugins-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.plugins-section {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-with-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-field {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.15s ease;
}

.input-field--valid {
  border-color: #22c55e;
}

.input-field--invalid {
  border-color: #ef4444;
}

.status-emoji {
  font-size: 1.25rem;
}

.hint {
  margin-top: 0.5rem;
  color: #555;
}
</style>
