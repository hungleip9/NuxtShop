<template>
  <a-style-provider hash-priority="high">
    <div class="w-full h-full bg-themeBackground">
      <a-layout class="w-full h-full">
        <a-layout-header class="theme-light">
          <Header>
            <menu-unfold-outlined
              :style="{ fontSize: '25px' }"
              v-if="collapsed"
              class="trigger main-color"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              :style="{ fontSize: '25px' }"
              v-else
              class="trigger main-color"
              @click="() => (collapsed = !collapsed)"
            />
          </Header>
        </a-layout-header>
        <a-layout>
          <a-layout-sider class="no-select" v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu class="h-full" v-model:selectedKeys="selectedKeys" mode="inline">
              <a-menu-item key="1" @click="handleClick('')">
                <div class="flex flex-row items-center">
                  <CoffeeOutlined />
                  <span>Sản phẩm</span>
                </div>
              </a-menu-item>
              <a-menu-item key="2" @click="handleClick('contact')">
                <div class="flex flex-row items-center">
                  <PhoneOutlined />
                  <span>Liên hệ</span>
                </div>
              </a-menu-item>
              <a-menu-item key="3" @click="handleClick('about-us')">
                <div class="flex flex-row items-center">
                  <user-outlined />
                  <span>Về chúng tôi</span>
                </div>
              </a-menu-item>
            </a-menu>
          </a-layout-sider>
            <a-layout-content class="overflow-auto">
              <slot />
              <Footer />
            </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-style-provider>
</template>
<script lang="ts" setup>
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
onMounted(async () => {
});
function handleClick(url: string) {
  navigateTo(`/${url}`)
}
</script>

<style lang="scss" scoped>
</style>
