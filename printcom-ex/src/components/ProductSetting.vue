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

import Card from './Card.vue';
import PrintProperty from './printProperty/index.vue';
</script>

<template>
  <Card :title="title">
    <PrintProperty
      v-for="option in options" :key="option.slug"
      :property="option"
      :v-model="slug"
      v-bind="$attrs"
    />
  </Card>
</template>