<template>
  <Navbar v-if="$route.meta.showNavBar" />
  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>
<style scoped></style>