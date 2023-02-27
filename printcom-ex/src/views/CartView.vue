<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
</script>

<template>
  <div>
    <p v-for="(product, index) in cartStore.products" 
      :key="index"
    >
      {{ product }}
    </p>
  </div>
</template>