<template>
  <div class="about-company">
    <h1>Proyekt haqida</h1>
    <p class="company-description">
      Bu yerda proyekt haqida malumot bolishi kerak
    </p>
    <router-link to="/" class="back-home">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'AboutCompany'
};
</script>

<style scoped>
.about-company {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.company-description {
  text-align: justify;
  margin-bottom: 20px;
}

.back-home {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  border: 1px solid #000;
  text-decoration: none;
  color: #000;
  transition: all 0.3s ease;
}

.back-home:hover {
  background-color: #000;
  color: #fff;
}
</style>
