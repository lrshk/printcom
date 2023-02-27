<template>
  <component :is="propertyComponent" 
    v-bind="property" 
    :type="propertyType || 'radio'" 
    :v-model="vModel"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import CustomSize from "./CustomSize.vue";
import DefaultProperty from "./DefaultProperty.vue";

const props = defineProps<{
  property: {
    slug: string | number;
    nullable: boolean;
    name: string;
    customSize: any;
  };
  propertyType?: string;
  vModel: string;
}>();

const propertyComponent = computed(() => {
  switch (props.property.slug) {
    case "custom":
      return CustomSize;
    default:
      return DefaultProperty;
  }
});
</script>
