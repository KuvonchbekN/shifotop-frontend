<template>
  <div id="app">
    <HomeViewComp /> //todo maybe we have to remove this after adding routing
    <router-view />
  </div>
</template>

<script>

import HomeViewComp from "@/components/mainPage/HomeComp.vue";

export default {
  name: 'App',
  components: {
    HomeViewComp
  }
};
</script>