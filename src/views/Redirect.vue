<template>
  <div>
    <h1>Redirecting...</h1>
    <p>{{ id }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  try {
    window.location.href = `/api/${props.id}`;
  } catch (error) {
    console.error(error);
  }
});
</script>
