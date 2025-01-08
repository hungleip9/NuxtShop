<template>
  <a-style-provider hash-priority="high">
    <div class="w-full h-full bg-themeBackground">
      <a-layout class="w-full h-full">
        <a-layout-header>
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
          <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu class="h-full" v-model:selectedKeys="selectedKeys" mode="inline">
              <a-menu-item key="1" @click="handleClick('product')">
                <div class="flex flex-row items-center">
                  <BaseIcon size="15" icon="fluent-mdl2:product" class="mr-2" />
                  <span>Sản phẩm</span>
                </div>
              </a-menu-item>
              <a-menu-item key="2" @click="handleClick('contact')">
                <div class="flex flex-row items-center">
                  <BaseIcon size="15" icon="hugeicons:contact-01" class="mr-2" />
                  <span>Liên hệ</span>
                </div>
              </a-menu-item>
              <a-menu-item key="3" @click="handleClick('about')">
                <div class="flex flex-row items-center">
                  <BaseIcon size="15" icon="ix:about" class="mr-2" />
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
