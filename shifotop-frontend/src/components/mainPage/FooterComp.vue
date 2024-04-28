<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>ShifoTop</h4>
        <ul class="footer-links">
          <li><router-link to="/about-company">Kompaniya haqida</router-link></li>
          <li><router-link to="/about-project">Loyiha haqida</router-link></li>
          <li><router-link to="/press">Biz haqimizda</router-link></li>
          <li><router-link to="/performances">Natijalarimiz</router-link></li>
          <li><router-link to="/review-battle">Izohlar jangi</router-link></li>
          <li><router-link to="/vacancies">Vakansiyalar</router-link></li>
          <li><router-link to="/social-media">Ijtimoiy tarmoq</router-link></li>
          <li><router-link to="/contact">Aloqa</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Reference</h4>
        <ul class="footer-links">
          <li><router-link to="/help">Yordam</router-link></li>
          <li><router-link to="/patient-info">Bemorga</router-link></li>
          <li><router-link to="/clinic-info">Shifoxona</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Site Map</h4>
        <ul class="footer-links">
          <li><router-link to="/cities">Shaharlar</router-link></li>
          <li><router-link to="/regions">Viloyatlar</router-link></li>
          <li><router-link to="/doctors">Shifokorlar</router-link></li>
          <li><router-link to="/clinics">Shifoxonalar</router-link></li>
          <li><router-link to="/services">Xizmatlar</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Terms of Use</h4>
        <ul class="footer-links">
          <li><router-link to="/terms">Foydalanish shartlari</router-link></li>
          <li><router-link to="/press">Biz haqimizda</router-link></li>
          <li><router-link to="/performances">Natijalar</router-link></li>
          <li><router-link to="/review-battle">Izohlar jangi</router-link></li>
          <li><router-link to="/vacancies">Vakansiyalar</router-link></li>
          <li><router-link to="/social-media">Ijtimoiy tarmoq</router-link></li>
          <li><router-link to="/contact">Aloqa</router-link></li>
        </ul>
      </div>
    </div>
  </footer>
</template>


<script>
export default {
  name: 'FooterComp'
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #f39c12; /* For the accent color based on the design */
}

.footer-links {
  list-style-type: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links li a {
  color: white;       /* Sets the text color to white */
  text-decoration: none; /* Removes the underline */
}

.footer-links li a:hover {
  text-decoration: underline; /* Adds underline on hover if desired */
  color: #f39c12; /* Changes color on hover to the theme accent color */
}

/* Media query for responsive adjustments */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin-bottom: 1rem;
  }
}
</style>
