<template>
  <input :type="type || 'radio'" 
    :name="vModel" 
    :id="slug" 
    :value="slug"
    @change="handleChange"
  />
  <label :for="slug">Custom Size</label>
  <div>
    <label for="width">Width</label>
    <input type="number" 
      :id="slug" 
      v-model="width"
      :min="customSizes.minWidth" 
      :max="customSizes.maxWidth"
      @change="handleChange"
    >
  </div>
  <div>
    <label for="height">Height</label>
    <input type="number" 
      :id="slug" 
      v-model="height" 
      :min="customSizes.minHeight" 
      :max="customSizes.maxHeight"
      @change="handleChange"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  slug: string;
  nullable: boolean;
  customSizes: {
    minHeight: number;
    minWidth: number;
    maxHeight: number;
    maxWidth: number;
  };
  type?: string;
  vModel: string;
}>()
const emit = defineEmits(['change'])

const height = ref(props.customSizes.minHeight);
const width = ref(props.customSizes.minWidth);
const customSize = computed(() => `w${width.value}_h${height.value}`)

function handleChange(e: Event) {
  e.stopPropagation();
  return emit('change', { [props.vModel]: customSize.value })
}
</script>