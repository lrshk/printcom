<script setup lang="ts">
defineProps<{
  slug: string;
  name: string;
  nullable: boolean;
  type?: string;
  vModel: string;
}>();

defineEmits(['change']);
</script>

<template>
  <div>
    <input :type="type || 'radio'" 
      :name="vModel" 
      :id="slug" 
      :value="slug" 
      @change.stop="$emit('change', { [vModel]: slug })"
    />
    <label :for="slug">{{ name }}</label>
  </div>
</template>
