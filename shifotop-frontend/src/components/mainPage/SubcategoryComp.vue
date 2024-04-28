<template>
  <HeaderComp/>
  <div class="subcategory-view">
    <h1>{{ subcategoryName }}</h1>
    <ul v-if="type === 'doctors'">
      <div class="doctor-container">
        <div class="doctor-card" v-for="doctor in items" :key="doctor.id">
          <div class="doctor-image">
            <img :src="doctor.profilePicture || defaultDoctorImage" alt="Doctor's profile"/>
          </div>
          <div class="doctor-details">
            <h2 class="doctor-name">{{ doctor.firstname }} {{ doctor.lastname }}</h2>
            <p class="doctor-specialty">{{ doctor.specialities.map(speciality => speciality.name).join(', ') }}</p>
            <div class="doctor-experience">Tajribasi: {{ doctor.experience }} yil</div>
            <div class="doctor-rating">
              <StarRating :rating="doctor.rating"/> <!-- Use the StarRating component -->
              <span class="reviews">{{ doctor.reviews.length }} izohlar</span>
            </div>
            <div class="doctor-contact">
              <p class="doctor-phone">{{ doctor.phoneNumber }}</p>
              <router-link :to="{ name: 'doctorDetails', params: { doctorId: doctor.id } }" class="details-button">
                Malumotlarni ko'rish
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </ul>
    <ul v-if="type === 'clinics'">
      <div class="clinic-container">
        <div class="clinic-card" v-for="clinic in items" :key="clinic.id">
          <div class="clinic-image">
            <img :src="clinic.profilePicture || defaultClinicImage" alt="Clinic's profile"/>
          </div>
          <div class="clinic-details">
            <h2 class="clinic-name">{{ clinic.name }}</h2>
            <StarRating :rating="clinic.rating"/>
            <p class="clinic-address">
              {{ clinic.address.regionName }}, {{ clinic.address.cityName }}, {{ clinic.address.addressName }}
            </p>
            <p class="clinic-phone">Telefon raqami: {{ clinic.phoneNumber }}</p>
            <router-link :to="{ name: 'clinicDetails', params: { clinicId: clinic.id } }" class="details-button">
              Malumotlarni ko'rish
            </router-link>
          </div>
        </div>
      </div>
    </ul>
    <ul v-if="type === 'services'">
      <div class="service-container">
        <div class="service-card" v-for="service in items" :key="service.id">
          <div class="service-details">
            <h2 class="service-name">{{ service.name }}</h2>
            <p class="service-cost">Xizmat Narxi: {{ service.cost }} so'm</p>
            <router-link :to="{ name: 'serviceDetails', params: { serviceId: service.id } }" class="details-button">
              Malumotlarni ko'rish
            </router-link>
          </div>
        </div>
      </div>
    </ul>
  </div>
  <FooterComp/>
</template>

<script>
import axios from 'axios';
import StarRating from '@/components/StarRating.vue'; // Make sure this is the correct path to your StarRating component
import defaultDoctorImage from '@/assets/default-doctor.png'
import defaultClinicImage from '@/assets/default-clinic-image.png'
import HeaderComp from "@/components/mainPage/HeaderComp.vue";
import FooterComp from "@/components/mainPage/FooterComp.vue";

export default {
  name: 'SubcategoryComp',
  components: {
    FooterComp,
    HeaderComp,
    StarRating,
  },
  props: {
    type: String,
    itemName: String
  },
  data() {
    return {
      subcategoryName: '',
      items: [],
      defaultDoctorImage,
      defaultClinicImage
    };
  },
  created() {
    this.fetchSubcategoryData();
  },
  methods: {
    fetchSubcategoryData() {
      axios.get(`http://localhost:8081/api/v1/${this.type}/type/${encodeURIComponent(this.itemName)}`)
          .then(response => {
            this.subcategoryName = this.itemName;
            this.items = response.data;
          })
          .catch(error => {
            console.error('Error fetching subcategory data:', error);
          });
    }
  }
};
</script>

<style scoped>
.subcategory-view h1{
  justify-content: space-between;
  text-align: center;
}

.doctor-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.doctor-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.doctor-image img {
  width: 100%;
  height: auto;
  display: block;
}

.doctor-details {
  padding: 1rem;
  text-align: center;
}

.doctor-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.doctor-specialty {
  font-size: 0.9rem;
  color: #757575;
  margin: 0.5rem 0;
}

.doctor-experience {
  font-size: 0.9rem;
  color: #424242;
}

.doctor-rating .reviews {
  font-size: 0.8rem;
  color: #757575;
  margin-left: 0.5rem;
}

.doctor-contact .doctor-phone {
  font-size: 0.9rem;
  color: #424242;
  margin: 0.5rem 0;
}

.details-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #0056b3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.details-button:hover {
  background-color: #003f8a;
}

.clinic-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.clinic-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background: #fff;
}

.clinic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.clinic-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.clinic-details {
  padding: 1rem;
  text-align: center;
}

.clinic-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #333;
}

.clinic-address {
  font-size: 1rem;
  color: #757575;
}

.clinic-phone {
  font-size: 1rem;
  color: #424242;
  margin: 1rem 0;
}

.details-button {
  padding: 0.5rem 1rem;
  background-color: #0056b3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  align-self: center;
  margin-bottom: 1rem;
}

.details-button:hover {
  background-color: #003f8a;
}

@media only screen and (max-width: 600px) {
  .clinic-container {
    padding: 1rem;
  }

  .clinic-card {
    width: 100%;
    max-width: 340px;
  }
}

.service-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.service-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.service-details {
  padding: 1rem;
  text-align: center;
}

.service-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.service-cost {
  font-size: 0.9rem;
  color: #757575;
  margin: 0.5rem 0;
}

.details-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #0056b3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.details-button:hover {
  background-color: #003f8a;
}
</style>
