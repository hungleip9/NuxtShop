<template>
  <div class="w-full h-full flex flex-col justify-center items-center page-error">
    <div class="logo">
      <a href="/" class="">
        <BaseImg src="/images/logo-full.png" class="mb-6 cursor-pointer w-[150px]"/>
      </a>
    </div>
    <div class="error-container">
      <strong v-if="error">{{ error.statusCode }}</strong>
      <h1>Không tìm thấy trang này.</h1>
      <p>Vui lòng thử lại!</p>
      <br>
      <a href="/"><a-button type="primary" danger>Về trang chủ</a-button></a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app'
  const props = defineProps({
    error: Object as () => NuxtError
  })
  onMounted(() => {
  })
</script>

<style lang="scss">
.page-error {
  background-color: #202859;
  .error-container {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: #f5f5f5;
    strong {
      font-size: 50px;
    }
  }
}

</style>