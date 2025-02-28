<script setup lang="ts">
  const visible = ref(false);
  onMounted(() => {});
  function getItem(id: string, key: string) {
    if (!id || !key) return '';
    const item = useConst().value.menu.find(e => e.id == id) || null;
    if (!item) return '';
    return item[key];
  }
</script>

<template>
  <div class="w-full h-full flex flex-row justify-between items-center no-select p-4">
    <slot />
    <NuxtLink to="/">
      <BaseImg :src="'/images/logo.png'" class="cursor-pointer w-[300px]" />
    </NuxtLink>
    <div class="flex flex-row">
      <Login />
      <div class="ml-4">
        <a-dropdown :trigger="['click']" v-model:open="visible">
          <a class="ant-dropdown-link" @click.prevent>
            <a-badge :count="Object.keys(useConst().value.carts).length">
              <BaseIcon icon="mdi:cart-outline" />
            </a-badge>
          </a>
          <template #overlay>
            <a-menu>
              <template v-if="Object.keys(useConst().value.carts).length">
                <a-menu-item class="box-item" v-for="(key, index) in Object.keys(useConst().value.carts)" :key="index">
                  <CloseOutlined
                    class="absolute top-2 right-2 icon-delete"
                    :style="{ fontSize: '10px' }"
                    @click="_handleDeleteItemInCart(key)"
                  />
                  <div class="flex flex-row items-center justify-between h-[60px]">
                    <div class="flex flex-row items-center">
                      <BaseImg :src="getItem(key, 'photo')" class="w-[30px]" />
                      <b class="ml-2">{{ getItem(key, 'title') }}:</b>
                    </div>
                    <span class="ml-2">số lượng {{ useConst().value.carts[key] }}</span>
                  </div>
                </a-menu-item>
              </template>
              <a-menu-item v-else>
                <p>Không tồn tại sản phẩm nào!</p>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .box-item {
    .icon-delete {
      color: red;
      display: none;
    }
    &:hover {
      .icon-delete {
        display: block;
      }
    }
  }
</style>
