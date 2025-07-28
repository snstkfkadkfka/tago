<template>
  <section class="App">
    <TotalAll />
  </section>
</template>

<script>
import TotalAll from './sections/TotalAll.vue';

export default {
  name: 'App',
  components: {
    TotalAll
  }
}
</script>

<style lang="scss">
@import url(./assets/styles/common.scss);
.App{
  background: $beige_color;
  width: 100%;
  height: 100vh;
}
</style>
