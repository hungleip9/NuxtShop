<template>
  <NuxtImg
    :format="format"
    :src="src"
    :alt="alt"
    :loading="loading" />
</template>
<script lang="ts" setup>
  const props = defineProps({
    src: {
      type: String,
		  required: true,
    },
    format: {
      type: String,
      default: 'webp' // webp, avif
    },
    alt: {
      type: String,
      default: ''
    },
    loading: {
      type: null,
      default: 'lazy' // lazy, eager
    }
  })
</script>
