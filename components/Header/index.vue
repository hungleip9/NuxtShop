<script setup lang="ts">
  const visible = ref(false);
  const dataConst = useConst().value
  onMounted(() => {});
  function getItem(id: string, key: string) {
    if (!id || !key) return '';
    const item = dataConst.menu.find(e => e.id == id) || null;
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
            <a-badge :count="Object.keys(dataConst.carts).length">
              <BaseIcon icon="mdi:cart-outline" />
            </a-badge>
          </a>
          <template #overlay>
            <a-menu>
              <template v-if="Object.keys(dataConst.carts).length">
                <a-menu-item class="box-item w-[350px]" style="cursor: default;" v-for="(key, index) in Object.keys(dataConst.carts)" :key="index">
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
                    <div class="flex flex-row items-center">
                      <div class="flex flex-row items-center">
                        <div class="box-cong-tru tru mr-2" @click="_handleMinusItemInCart(key)">-</div>
                        <div class="box-cong-tru cong" @click="_handleAddToCart(key, true)">+</div>
                      </div>
                      <div class="ml-2 count">
                        {{ dataConst.carts[key] }}
                      </div>
                    </div>
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
    .count, .box-cong-tru {
      text-align: center;
      width: 25px;
      border-radius: 4px;
      background-color: rgb(236, 234, 234);
      color: rgb(105, 105, 105);
      font-weight: 700;
    }
    .box-cong-tru {
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
    .tru {
      background-color: #ff4d4f;
      &:hover {
        background-color: #ff4d4f;
      }
    }
    .cong {
      background-color: #52c41a;
      &:hover {
        background-color: #52c41a;
      }
    }
    &:hover {
      .icon-delete {
        display: block;
      }
    }
  }
</style>
