<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <HeaderPopupLogin />
</template>
<script lang="ts" setup>
useSeoMeta({
  title: 'Nuxt Shop cà phê ngon số 1 Việt nam',
  ogTitle: 'Nuxt Shop cà phê ngon số 1 Việt nam',
  description: 'Nuxt Shop cà phê ngon số 1: Với công thức ngon hàng đầu Việt Nam',
  ogDescription: 'Nuxt Shop cà phê ngon số 1: Với công thức ngon hàng đầu Việt Nam',
  ogImage: 'https://cdn.stockproxx.com/resource/logo-stockproxx-s.png',
  ogType: 'website'
})
onMounted(async () => {
});
</script>
