<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart';
import flyers from '../../mocks/flyers.json';
import posters from '../../mocks/posters.json';
import businessCards from '../../mocks/businesscards.json';
import ProductSetting from '@/components/ProductSetting.vue';
import { computed, reactive } from 'vue';
import { findRelevantRules } from '../helpers/settingValidation';

const route = useRoute();
const cartStore = useCartStore();

const productType = route.params.id;
let product: any;
switch(productType) {
  case flyers.sku:
    product = flyers;
    break;
  case businessCards.sku:
    product = businessCards;
    break;
  case posters.sku:
    product = posters;
    break;
  default:
    product = undefined;
    break;
}

const productSettings: {[key: string]: string} = reactive({});
const excludesRules = computed(() => {
  const rules: any[] = [];
  Object.entries(productSettings).map(([key, value]: [key: string, value: string]) => {
    const rulesForProperty = findRelevantRules(key, value, product.excludes)
    rules.push(rulesForProperty);
  });
  return rules.flat().reduce((prev: {[key: string]: string[]}, curr: any) => {
    Object.entries(curr).forEach(([key, value]: [key: string, value: string[]]) => {
      if(!prev[key]) {
        prev[key] = [] as string[];
      }
      const excludesConfigs = new Set(prev[key].concat(value));
      prev[key] = Array.from(excludesConfigs);
    });
    return prev;
  }, {});
});

const areSettingsValid = computed(() => {
  const matchExcludes = Object.entries(productSettings).map(([key, value]: [key: string, value: string]) => {
    return excludesRules.value[key]?.includes(value);
  }).filter((val: boolean) => val);
  return matchExcludes.length < 2;
})

function updateSettings(newValue: {[key: string]: string}) {
  Object.assign(productSettings, newValue);
}
</script>

<template>
  <h1>
    {{ product.title }}
  </h1>
  <div>
    You've picked:
    <p>{{ productSettings }}</p>
  </div>
  <div>
    Excludes rules are
    <p>{{ excludesRules }}</p>
  </div>
  <div>
    Can submit
    <p>{{ areSettingsValid }}</p>
  </div>
  <div class="settings">
    <ProductSetting v-for="property in product.properties"
      v-bind="property"
      :key="property.slug"
      @change="updateSettings"
    />
  </div>
  <button @click="() => cartStore.addToCart(productSettings)"
    :disabled="!areSettingsValid"  
  >
    Add to cart
  </button>
</template>

<style scoped>
.settings {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.settings > * {
  width: 300px;
}
</style>