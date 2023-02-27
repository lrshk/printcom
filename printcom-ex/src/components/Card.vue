<script setup lang="ts">
defineProps<{
  thumbnail?: string;
  title: string;
}>()
</script>

<template>
  <div class="card">
    <div class="card-image" v-if="thumbnail">
      <figure  class="image is-1by1">
        <img :src="thumbnail" :alt="title" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <p class="title is-4">
            {{ title }}
          </p>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>