<template>
  <Swiper class="swiper-container flex justify-center"
    :loop="loop"
    :autoplay="autoplay"
    :breakpoints="breakpoints"
    :slides-per-view="'auto'"
    :space-between="10"
    @click="handleSwiperClick()">
    <slot></slot>
  </Swiper>
</template>

<script lang="ts" setup>
// @ts-ignore
const props = defineProps({
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: [Object, Boolean],
    default: false
  },
  breakpoints: {
    type: Object,
  }
})
onMounted(() => {
})
function handleSwiperClick() {
  const event = new Event('mousedown', { bubbles: true });
  document.body.dispatchEvent(event);
}
</script>

<style lang="scss" scoped>
.menu-overview {
  .swiper-wrapper {
    justify-content: center;
  }
}

</style>