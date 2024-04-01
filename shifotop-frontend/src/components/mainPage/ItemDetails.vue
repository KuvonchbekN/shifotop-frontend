<template>
    <div class="item-details">
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="(detail, index) in details" :key="index">
                <!-- Use a method to render details based on the type of item -->
                {{ renderDetail(detail) }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        title: String, // Title to display, such as "Doctors", "Clinics", etc.
        details: Array, // The array of details to list
        type: String // The type of details: "doctors", "clinics", etc.
    },
    methods: {
        renderDetail(detail) {
            // You can have different rendering based on the type of detail
            // This is a simplistic example, in a real-world scenario,
            // you would likely have more complex logic and maybe even separate sub-components
            switch (this.type) {
                case 'doctors':
                    return `${detail.name} - ${detail.specialization}`;
                case 'clinics':
                    return `${detail.name} - ${detail.location}`;
                // Add cases for other types as necessary
                default:
                    return detail.name; // or some default rendering
            }
        }
    }
};
</script>
