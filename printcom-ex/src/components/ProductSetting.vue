<script setup lang="ts">
defineProps<{
  slug: string;
  title: string;
  locked: boolean;
  options: {
    slug: string | number;
    name: string;
    nullable: boolean; 
    eco?: boolean;
    enrichments?: any[];
    width?: number;
    height?: number;
    customSize?: {
      minHeight: number;
      minWidth: number;
      maxWeight: number;
      maxWidth: number;
    }
  }[];
  viewMode?: {
    reseller: "icons" | "default";
    storefront?: "default";
  };
  type?: string;
  optionsInSummary?: string[];
  parentOptions?: any[];
}>()

import PrintProperty from './printProperty/index.vue';
</script>

<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">
        {{ title }}
      </p>
    </div>
    <div class="card-content">
      <div class="content">
        <PrintProperty
          v-for="option in options" :key="option.slug"
          :property="option"
          :v-model="slug"
          v-bind="$attrs"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  background: #f9f073;
}
</style>