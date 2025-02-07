<template>
  <div class="shortener-container">
    <form @submit.prevent="submitForm" class="url-shortener-form">
      <input
        type="text"
        v-model="url"
        placeholder="Feed me a URL!"
        class="url-input"
      />
      <button type="submit" class="submit-button">Shorten</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="shortenedUrl" class="result">
      Your shortened URL is:
      <a :href="shortenedUrl" class="shortened-url">{{ shortenedUrl }}</a>
      <button @click="copyToClipboard" class="copy-button">
        {{ copyMsg }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const url = ref('');
const shortenedUrl = ref('');
const errorMessage = ref('');
const copyMsg = ref('');

const validateUrl = (value) => {
  try {
    new URL(value);
  } catch (_) {
    return false;
  }

  return true;
};

watch(url, () => {
  shortenedUrl.value = '';
  copyMsg.value = '';
});

const submitForm = async () => {
  if (!validateUrl(url.value)) {
    errorMessage.value = 'Please enter a valid URL.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000); // Reset error message after 3 seconds
    return;
  }

  try {
    const response = await fetch('api/shorten', {
      method: 'POST',
      body: JSON.stringify({ fullUrl: url.value }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    /**
     * Represents the data returned from the server.
     * @typedef {Object} ServerResponseData
     * @property {string} shortUrl - The shortened URL.
     */
    /** @type {ServerResponseData} */
    const data = await response.json();
    copyMsg.value = 'Copy';
    shortenedUrl.value = data.shortUrl;
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000); // Reset error message after 3 seconds
  }
};

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(shortenedUrl.value);
  copyMsg.value = 'Copied';
};
</script>

<style scoped>
.shortener-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.6rem;
  border-radius: 8px;
  background: #f5f5f5;
  color: #333;
  margin: auto;
}

.url-shortener-form {
  display: flex;
  gap: 1rem;
}

.url-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.submit-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background: var(--color-primary);
  color: var(--color-text-inverted);
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.submit-button:hover {
  background: var(--color-primary-light);
}

.submit-button:active {
  background: var(--color-primary-dark);
}

.result {
  margin-top: 1rem;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shortened-url {
  color: #007bff;
  text-decoration: none;
}

.shortened-url:hover {
  color: #0056b3;
}

.copy-button {
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: none;
  background: var(--color-text);
  color: white;
  cursor: pointer;
}

.copy-button:hover {
  background: var(--color-primary);
}

.copy-button:active {
  background: var(--color-primary-dark);
}

.error {
  color: red;
  margin: 1rem 0;
}
</style>
