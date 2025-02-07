<script lang="ts" setup>
import { detailProduct } from '~/services/home'
const route = useRoute();
const active = ref('nguyen-lieu')
const { data: dataItem } = await useAsyncData(async () => {
  if (!route.params.id) return null;
  try {
    const id = route.params.id ? `${route.params.id}` : ''
    const res = await detailProduct(id);
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return null;
});
</script>

<template>
  <div class="p-20">
    <div class="flex flex-row">
      <div class="w-[50%]">
        <BaseImg class="w-[600px]" :src="dataItem.photo"/>
      </div>
      <div class="flex-1 leading-none">
        <b class="text-6xl">{{dataItem.title}}</b>
        <p class="text-xl mt-4">{{dataItem.description}}</p>
        <p class="mt-2 text-xs line-through cursor-default">{{ _formatPriceVND(dataItem.originalPrice) }}</p>
        <p class="main-color text-xl cursor-default">{{ _formatPriceVND(dataItem.price) }}</p>
        <button class="btn-default mt-3 flex flex-row justify-center" @click="_handleAddToCart(dataItem.id)"><BaseIcon icon="mdi:cart-outline"/> Thêm vào giỏ hàng</button>
      </div>
    </div>
    <div class="mt-10">
      <div class="flex flex-row justify-center">
        <div class="siwtch" :class="active == 'nguyen-lieu' ? 'active' : ''" @click="active = 'nguyen-lieu'">Nguyên liệu</div>
        <div class="siwtch" :class="active == 'cau-chuyen' ? 'active' : ''" @click="active = 'cau-chuyen'">Câu chuyện</div>
      </div>
      <div class="flex flex-row mainBgColor p-10">
        <div class="w-[50%] text-xl flex justify-center items-center">
          <p v-if="active == 'nguyen-lieu'" v-html="dataItem.ingredient"></p>
          <p v-else>{{ dataItem.story }}</p>
        </div>
        <div class="flex-1">
            <BaseImg class="w-[100%] h-full" :src="dataItem.photo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .siwtch {
    width: 200px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text);
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
  .active {
    background-color: var(--mainBgColor);
  }
</style>