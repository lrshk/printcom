<script setup lang="ts">
defineProps<{
  thumbnail?: string;
  title: string;
}>()
</script>

<template>
  <div class="card">
    <div v-if="thumbnail" class="thumbnail">
      <img :src="thumbnail" :alt="title" />
    </div>
    <div class="name">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 5px;
  filter: drop-shadow(1px 1px 5px #e5e5e5);
  padding: 8px;
}
.thumbnail {
  width: 100%;
  object-fit: cover;
}
.name {
  color: #252525;
  font-size: 1.8em;
}
</style>