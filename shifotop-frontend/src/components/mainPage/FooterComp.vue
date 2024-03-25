<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>ShifoTop</h4>
        <ul class="footer-links">
          <li>About company</li>
          <li>About the project</li>
          <li>They talk about us</li>
          <li>Performances</li>
          <li>Battle for reviews</li>
          <li>Vacancies</li>
          <li>Social network</li>
          <li>Contacts</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Reference</h4>
        <ul class="footer-links">
          <li>Help</li>
          <li>To the patient</li>
          <li>Clinic</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Site Map</h4>
        <ul class="footer-links">
          <li>Cities</li>
          <li>Regions</li>
          <li>Doctors</li>
          <li>Clinics</li>
          <li>Services</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Terms of Use</h4>
        <ul class="footer-links">
          <li>Terms of Use</li>
          <li>They talk about us</li>
          <li>Performances</li>
          <li>Battle for reviews</li>
          <li>Vacancies</li>
          <li>Social network</li>
          <li>Contacts</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  // Footer script logic (if any)
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
  cursor: pointer;
}

.footer-links li:hover {
  text-decoration: underline;
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
