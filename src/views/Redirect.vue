<template>
  <div>
    <h1>Redirect Component</h1>
    <p>The ID is: {{ id }}</p>
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

onMounted(() => {
  console.log('ID:', props.id);
});
</script>
