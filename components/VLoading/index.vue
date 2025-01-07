<template>
  <div v-if="!hasRule" class="w-full h-full flex flex-col justify-center items-center">
    <p v-if="!useAuth().value.isAuthenticated" class="w-full h-full flex justify-center items-center flex-col">
      Vui lòng đăng nhập để sử dụng tính năng này!
      <a-button class="my-2"
        type="primary"
        @click="_openModalLogin('login')">
        <template #icon>
          <BaseIcon icon="bi:person" />
        </template>
        <span class="ml-2">Đăng nhập</span>
      </a-button>
    </p>
    <div v-else class="w-full h-full flex justify-center items-center flex-col px-2">
      Vui lòng nâng cấp tài khoản để sử dụng tính năng này!
      <a-button class="my-2"
        type="primary"
       @click="navigateTo('/nang-cap-tai-khoan')">
        <template #icon>
          <BaseIcon icon="fa6-solid:angles-up" />
        </template>
        <span class="ml-2">Nâng cấp</span>
      </a-button>
    </div>
  </div>
  <transition class="w-full h-full" name="fade" v-else>
    <div class="loadding w-full h-full flex justify-center items-center" :class="getClassFadeIn(fadeIn)" v-show="true">
      <div role="status">
        <BaseIcon color="#2563eb" size="40" icon="line-md:loading-twotone-loop" />
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
  const props = defineProps({
    hasRule: {
      type: Boolean,
      default: true
    },
    fadeIn: {
      type: Boolean,
      default: true
    }
  })
  onMounted(() => {
  })
  function getClassFadeIn(fadeIn: boolean = false) {
    return fadeIn ? 'fade-in' : ''
  }
</script>
<style lang="scss" scoped>
  .fade-in {
    animation: 0.5s fadeIn;
    animation-fill-mode: forwards;
    visibility: hidden;
  }

  @keyframes fadeIn {
    99% {
      visibility: hidden;
    }
    100% {
      visibility: visible;
    }
  }
</style>