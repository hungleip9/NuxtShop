<template>
  <div class="w-full h-[500px] footer flex flex-row p-10">
    <div class="w-[600px] h-full flex justify-center items-center">
        <BaseImg :src="'/images/logo-footer.png'" class="w-[250px] h-[auto]" />
    </div>
    <div class="flex-1">
      <a-row justify="space-between">
        <a-col v-for="item in arrFooter" class="link" :span="7">
          <NuxtLink :to="item.link"><span>{{ item.name }}</span></NuxtLink>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
  const arrFooter = ref([
    {
      name: 'Vending machines',
      link: '/vending-machines'
    },
    {
      name: 'Office coffee',
      link: '/office-coffee'
    },
    {
      name: 'Vending machines',
      link: '/vending-machines'
    },
    {
      name: 'Office coffee',
      link: '/office-coffee'
    },
    {
      name: 'Vending machines',
      link: '/vending-machines'
    },
    {
      name: 'Office coffee',
      link: '/office-coffee'
    },
    {
      name: 'Vending machines',
      link: '/vending-machines'
    },
    {
      name: 'Office coffee',
      link: '/office-coffee'
    },
    {
      name: 'Vending machines',
      link: '/vending-machines'
    },
    {
      name: 'Office coffee',
      link: '/office-coffee'
    },
    {
      name: 'Vending machines',
      link: '/vending-machines'
    },
    {
      name: 'Office coffee',
      link: '/office-coffee'
    },
  ])
</script>

<style lang="scss" scoped>
.footer {
  background: #454545;
  color: white;
  .link {
    height: 80px;
    text-align: left;
    padding: 20px;
    span {
      font-weight: 600;
      font-size: 16px;
      &:hover {
        cursor: pointer;
        text-decoration: underline!important;
      }

    }
  }
}
</style>
