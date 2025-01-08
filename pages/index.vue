<template>
  <div class="w-full h-auto pt-0">
    <a-row class="pl-20 pt-5">
      <a-col v-for="item in arrContent" class="product" :span="6">
        <a-card hoverable style="width: 300px; height: 350px">
          <BaseImg class="w-full h-[250px] object-contain mb-2" :src="item.photo" />
          <a-card-meta :title="item.title">
            <template #description>{{ item.description }}</template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <div class="box-content">
      <div class="flex flex-row mb-20">
        <div class="box-img w-[45%] mr-12">
          <BaseImg
            class="rounded-lg"
            :src="'https://www.coffeeaddress.com/storage/files/shutterstock-739399771-1200x_.jpg?token=e02ef25b6e1a0182a615ae280318d140'"
          />
        </div>
        <div class="flex-1 flex flex-col justify-center">
          <h1 class="font-bold text-5xl text-black mb-6">Our promises</h1>
          <ul>
            <li>Quality and freshly roasted coffee in recognisable European roasteries</li>
            <li>Coffee machines made in Switzerland or Italy</li>
            <li>Service coverage in the Baltics from 1 hour</li>
            <li>Trained employees/coffee experts</li>
            <li>30 years of experience in coffee business</li>
          </ul>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col justify-center w-[45%] mr-12">
          <h1 class="font-bold text-5xl text-black mb-6">Our promises</h1>
          <div class="text-xl leading-8">They are not just a list of customers. They are our best friends, partners, whom we desire to offer the best cup of coffee every day.</div>
        </div>
        <div class="box-img flex-1">
          <BaseImg
            class="rounded-lg"
            :src="'https://www.coffeeaddress.com/storage/files/logo-klientu-visi-1200x_.png?token=a74048bca7ddb10b3407fb1ab49e712c'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const arrContent = ref([
  {
    title: 'Vending machines',
    description: 'Vending machines',
    photo: 'https://www.coffeeaddress.com/storage/files/main-vending-_x400.png?token=3ac2db26bcf708c3d2523a150cfc7c02'
  },
  {
    title: 'Office coffee',
    description: 'Office coffee',
    photo: 'https://www.coffeeaddress.com/storage/files/main-ocs-_x400.png?token=109bc726859be6fc190ff702a5ebf346'
  },
  {
    title: 'Commercial',
    description: 'Commercial',
    photo:
      'https://www.coffeeaddress.com/storage/files/main-komercklientiem-_x400.png?token=7853f38408978902c5c76ca61facd047'
  },
  {
    title: 'HoReCa',
    description: 'HoReCa',
    photo: 'https://www.coffeeaddress.com/storage/files/main-_x400.png?token=3ce5f8d223e04e87119808842ca65a61'
  },
  {
    title: 'Micro Market',
    description: 'Micro Market',
    photo:
      'https://www.coffeeaddress.com/storage/files/main-micro-market-_x400.png?token=6fcf57f062235e54e123825a8c0f08a4'
  },
  {
    title: 'All solutions',
    description: 'All solutions',
    photo: 'https://www.coffeeaddress.com/storage/files/main-all-_x400.png?token=b5d4488bab3656be665fd2b7dc15a551'
  }
]);
</script>

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
