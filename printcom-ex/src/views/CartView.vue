<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
</script>

<template>
  <div v-if="cartStore.products.length === 0">
    Your cart is empty
  </div>
  <div>
    <p v-for="(product, index) in cartStore.products" 
      :key="index"
    >
      {{ product }}
    </p>
  </div>
</template>