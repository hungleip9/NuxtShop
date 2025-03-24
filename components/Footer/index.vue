<template>
  <div class="w-full footer flex flex-row p-10 h-[20vh]">
    <div class="w-[50%] h-full flex justify-center items-center">
        <img :src="'images/logo-footer.png'" class="w-[100px] h-[auto]" />
    </div>
    <div class="flex-1 flex items-center">
      <a-row :gutter="[16,16]" justify="space-between" class="w-full">
        <a-col :span="8">
          <div class="flex items-center h-full">
            <BaseIcon class="mr-2" icon="ic:baseline-phone"/> 0898562269
          </div>
        </a-col>
        <a-col :span="8">
          <div class="flex items-center h-full">
            <BaseIcon class="mr-2" icon="grommet-icons:map"/> 197 - Hoàng Mai - Hà Nội
          </div>
        </a-col>
        <a-col :span="8">
          <div class="flex items-center h-full">
            <BaseIcon class="mr-2" icon="ic:baseline-email"/> hunglq.dev@gmail.com
          </div>
        </a-col>
        <a-col :span="8">
          <div class="flex items-center h-full">
            <BaseIcon class="mr-2" icon="material-symbols:developer-mode-tv"/> © 2023 Nuxt Shop
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
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
