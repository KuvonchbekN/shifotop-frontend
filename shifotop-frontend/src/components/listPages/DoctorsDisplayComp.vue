<template>
    <div>
      <h3>Doctors</h3>
      <ul>
        <li v-for="(doctor, index) in data" :key="index">
            something something doctor page
          <!-- {{ doctor.name }} - {{ doctor.specialty }} -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Array
    }
  }
  </script>
  
  <style>
  /* Styles for DoctorsDisplayComponent */
  </style>
  