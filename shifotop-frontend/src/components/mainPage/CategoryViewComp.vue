<template>
    <HeaderComp />

    <div>
        <h1>{{ capitalizedCategory }} List</h1>
        <ul>
            <li v-for="item in items" :key="item.id">
                <router-link :to="{ name: 'itemDetails', params: { type: category, itemId: item.id} }">
                    {{ item.id }}
                </router-link>
            </li>
        </ul>
    </div>

    <FooterComp/>
</template>

<script>
import axios from 'axios';
import HeaderComp from './HeaderComp.vue';
import FooterComp from './FooterComp.vue';

export default {
    components:{
        HeaderComp,
        FooterComp
    },
    props: ['category'], //todo define it differently. 
    data() {
        return {
            items: []
        };
    },
    computed: {
        capitalizedCategory() { //this is for showing the h1 with uppercase first letter
            if (!this.category) return '';
            return this.category.charAt(0).toUpperCase() + this.category.slice(1);
        }
    },
    created() {
        this.fetchItems();
    },
    methods: {
        async fetchItems() {
            try {
                console.log("fetching all items from specific category:" + this.category);
                const response = await axios.get(`http://localhost:8081/api/v1/${this.category}`);
                console.log(response.data);
                this.items = response.data;
            } catch (error) {
                console.error('Failed to fetch items for', this.category, ':', error);
            }
        }
    }
};
</script>