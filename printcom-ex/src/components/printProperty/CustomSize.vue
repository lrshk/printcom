<template>
  <div class="control">
    <label class="radio">
      <input :type="type || 'radio'" 
        :name="vModel" 
        :id="slug" 
        :value="slug"
        @change="handleChange"
      />
      Custom Size
    </label>
    <div class="field is-horizontal">
      <div class="control">
        <label for="width">
          Width
          <input type="number" 
            :id="slug" 
            v-model="width"
            :min="customSizes.minWidth" 
            :max="customSizes.maxWidth"
            @change="handleChange"
          >
        </label>
      </div>
      <div class="control">
        <label for="height">
          Height
          <input type="number" 
            :id="slug" 
            v-model="height"
            :min="customSizes.minHeight" 
            :max="customSizes.maxHeight"
            @change="handleChange"
          >
        </label>
      </div>
    </div>
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

<style scoped>
.field.is-horizontal > .control ~ .control::before {
  content: 'x';
  margin-left: 5px;
}
</style>