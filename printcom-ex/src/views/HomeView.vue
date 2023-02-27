<script setup lang="ts">
import Card from '@/components/Card.vue';
import mockCategories from '../../mocks/categories.json';
const categories = mockCategories.categories;
</script>

<template>
  <div class="columns">
    <RouterLink v-for="cat in categories"
      :to="'/products/'+cat.slug"
      :key="cat"
      class="column"
    >
      <Card 
        :thumbnail="cat.thumbnail"
        :title="cat.name"
      />
    </RouterLink>
  </div>
</template>
