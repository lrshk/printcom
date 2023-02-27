<script setup lang="ts">
import Category from '@/components/Card.vue';
import mockCategories from '../../mocks/categories.json';
const categories = mockCategories.categories;
</script>

<template>
  <div>
    <RouterLink v-for="cat in categories"
      :to="'/products/'+cat.slug"
      :key="cat"
    >
      <Category 
        :thumbnail="cat.thumbnail"
        :title="cat.name"
      />
    </RouterLink>
  </div>
</template>
