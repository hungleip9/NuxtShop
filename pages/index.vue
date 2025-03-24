<script lang="ts" setup>
const arrContent = ref<any[]>([]);
const current = ref(1);
const totalItem = ref(0)
import { getMenu } from '~/services/home'
onMounted(() => {
  getDataMenu(1, 10)
  
})
async function getDataMenu(page: number, size: number) {
  getMenu(page, size).then((res: any) => {
    arrContent.value = res.data || []
    totalItem.value = res.totalItem
  }).catch(e => {
    arrContent.value = []
  })
}
async function handleChange (page: number, size: number) {
  getDataMenu(page, size)
}
function detailProduct(id: string) {
  navigateTo(`/detail/${id}`)
}
</script>

<template>
  <div class="w-full h-auto pt-0">
    <a-row class="pl-20 pt-5">
      <a-col v-for="item in arrContent" class="product" :span="6">
        <a-card hoverable @click="detailProduct(item.id)">
          <img class="w-full h-[250px] object-contain mb-2" :src="item.photo" />
          <a-card-meta :title="item.title">
            <template #description>{{ item.description }}</template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <div class="text-right pr-10">
      <a-pagination v-model:current="current" :total="totalItem" @change="handleChange">
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">Trước</a>
          <a v-else-if="type === 'next'">Sau</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </div>
    <div class="box-content mt-4">
      <div class="flex flex-row mb-20">
        <div class="box-img w-[45%] mr-12">
          <img
            class="rounded-lg"
            :src="'https://www.coffeeaddress.com/storage/files/shutterstock-739399771-1200x_.jpg?token=e02ef25b6e1a0182a615ae280318d140'"
          />
        </div>
        <div class="flex-1 flex flex-col justify-center">
          <h1 class="font-bold text-5xl text-black mb-6">Lợi ích từ thói quen uống cà phê</h1>
          <ul>
            <li>Tăng cường tỉnh táo và tập trung – Caffeine trong cà phê giúp kích thích hệ thần kinh trung ương, giảm cảm giác mệt mỏi và cải thiện sự tập trung.</li>
            <li>Hỗ trợ quá trình trao đổi chất – Cà phê có thể giúp tăng cường tốc độ trao đổi chất, hỗ trợ đốt cháy calo hiệu quả hơn.</li>
            <li>Cải thiện hiệu suất thể chất – Caffeine kích thích sản xuất adrenaline, giúp cơ thể hoạt động tốt hơn trong các bài tập thể dục hoặc công việc đòi hỏi sức bền.</li>
            <li>Chứa nhiều chất chống oxy hóa – Cà phê có nhiều polyphenol và các hợp chất chống oxy hóa, giúp bảo vệ cơ thể khỏi tác hại của gốc tự do.</li>
            <li>Giảm nguy cơ mắc một số bệnh – Nhiều nghiên cứu cho thấy uống cà phê có thể giảm nguy cơ mắc bệnh tiểu đường loại 2, Parkinson, Alzheimer và một số bệnh tim mạch.</li>
          </ul>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col justify-center w-[45%] mr-12">
          <h1 class="font-bold text-5xl text-black mb-6">Xứ mệnh của chúng tôi</h1>
          <div class="text-xl leading-8">Mang đến cho khách hàng không gian ấm cúng, thoải mái để tận hưởng những ly cà phê chất lượng, được pha chế từ những hạt cà phê tuyển chọn. Chúng tôi không chỉ phục vụ đồ uống mà còn tạo ra những khoảnh khắc thư giãn, kết nối và cảm hứng trong cuộc sống hàng ngày.</div>
        </div>
        <div class="box-img flex-1">
          <img
            class="rounded-lg"
            :src="'https://www.foodrepublic.com/img/gallery/what-instant-coffee-is-actually-made-of/l-intro-1695738252.jpg'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  margin-bottom: 40px;
}
.box-content {
  padding: 100px 0 100px 80px;
  background-color: var(--mainBgColor) !important;
  ul {
    li {
      font-size: 20px;
      line-height: 35px;
      &:before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 10px;
        background-image: url('https://www.coffeeaddress.com/build/assets/list-icon.e59ebdec.svg');
        background-size: cover;
      }
    }
  }
}
</style>
