<script lang="ts" setup>
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
onMounted(async () => {
});
function handleClick(url: string) {
  navigateTo(`/${url}`)
}
</script>

<template>
  <a-style-provider hash-priority="high">
    <div class="w-full h-full bg-themeBackground">
      <a-layout class="w-full h-full">
        <a-layout-header class="theme-light">
          <Header>
            <menu-unfold-outlined
              :style="{ fontSize: '25px' }"
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              :style="{ fontSize: '25px' }"
              v-else
              class="trigger"
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
                  <span>Menu</span>
                </div>
              </a-menu-item>
              <a-menu-item key="2" @click="handleClick('introduce')">
                <div class="flex flex-row items-center">
                  <UserSwitchOutlined />
                  <span>Giới thiệu</span>
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
