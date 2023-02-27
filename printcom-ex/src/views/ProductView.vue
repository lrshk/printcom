<template>
  <h2 class="title is-2">
    {{ product.title }}
  </h2>
  <div class="container">
    <div class="columns">
      <div class="column">
          <div class="tile is-parent is-vertical">
            <div class="column" v-for="property in product.properties" :key="property.slug" >
              <ProductSetting 
                v-bind="property"
                @change="updateSettings"
              />
            </div>
          </div>
      </div>
      <div class="column">
        <div>
          You've picked:
          <p>{{ productSettings }}</p>
        </div>
        <div>
          Excludes rules are
          <p>{{ excludesRules }}</p>
        </div>
        <button class="button is-success"
          @click="handleClick"
          :disabled="!areSettingsValid"  
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

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

function handleClick() {
  cartStore.addToCart({...productSettings, productType })
}
</script>