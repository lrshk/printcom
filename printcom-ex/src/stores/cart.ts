import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const products: {[key: string]: string}[] = reactive([]);
  function addToCart(product: {[key: string]: string}) {
    products.push(product);
  }

  return {
    products, 
    addToCart
  };
});