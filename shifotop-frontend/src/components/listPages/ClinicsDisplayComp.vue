<template>
    <div>
      <h3>Clinics</h3>
      <ul>
        <li v-for="(clinic, index) in data" :key="index">
          something somthing something
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
  /* Styles for ClinicsDisplayComponent */
  </style>
  