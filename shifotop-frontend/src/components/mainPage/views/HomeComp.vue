<template>
  <div>
    <Header />
    <main>
      <StatsCardComp
          title="Doctors"
          :count="doctorCount"
          link="/doctors"
      />
      <!-- Repeat for Clinics, Services, Diagnostics -->
    </main>
    <Footer />
  </div>
</template>

<script>

import HeaderComp from "@/components/mainPage/HeaderComp.vue";
import StatsCardComp from "@/components/mainPage/StatsCardComp.vue";
import FooterComp from "@/components/mainPage/FooterComp.vue";

export default {
  components: {
    HeaderComp,
    StatsCardComp,
    FooterComp
  },
  data() {
    return {
      doctorCount: 107867,
      // Other counts
    };
  },
};
</script>

<style>
/* Global styles, if needed */
</style>
