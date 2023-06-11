<script setup>
import Welcome from '@/components/Welcome.vue';
import Shortener from '@/components/Shortener.vue';
</script>

<template>
  <header>
    <img
      alt="rebuy logo"
      class="logo"
      src="https://dyivx00f9izcg.cloudfront.net/images/rebuy-logo.rev-b3e2d3452ef085d.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <Welcome />
    </div>
  </header>

  <main>
    <Shortener />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

main {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  header .wrapper {
    margin-bottom: 2rem;
  }
}
</style>
