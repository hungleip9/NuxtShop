<template>
  <div class="w-full h-full flex flex-col page-error">
    <div class="container mx-auto text-center">
      <div class="logo flex mt-4">
        <a href="/" class="mx-auto">
          <BaseImg :src="strLogo" class="mb-6 cursor-pointer w-[300px]"/>
        </a>
      </div>
    </div>
    <div class="error-container m-auto">
      <strong class="text-4xl" v-if="error">{{ error.statusCode }}</strong>
      <h1>Không tìm thấy trang này.</h1>
      <p>Vui lòng thử lại!</p>
      <a href="/" class="back-button">Về trang chủ</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app'
  const config = useRuntimeConfig()
  const strLogo = config.public.logo || 'https://cdn.stockproxx.com/resource/logo-stockproxx.png' as string
  const props = defineProps({
    error: Object as () => NuxtError
  })
  onMounted(() => {
  })
</script>

<style lang="scss">
.page-error {
  font-family: Arial, sans-serif;
  background: #f9f9f9 url('https://cdn.stockproxx.com/resource/bg-stockproxx.jpg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  .error-container {
    max-width: 400px;
    padding: 2rem 4rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    strong {
      font-size: 3rem;
    }
  }

  h1 {
    color: #ff6347;
  }

  p {
    color: #333;
    margin-bottom: 20px;
  }

  .back-button {
    display: inline-block;
    background-color: #ff6347;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .back-button:hover {
    background-color: #d4462d;
  }
}


</style>