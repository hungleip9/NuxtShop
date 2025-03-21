<script setup lang="ts">
import { logout } from '~/services/auth';
  const dataAuth = useAuth().value;
  const dataConst = useConst().value;
</script>
<template>
  <div class="w-full h-full">
    <div v-if="!dataAuth.isAuthenticated" class="cursor-pointer" @click="_openModalLogin('login')">
      <BaseIcon icon="bi:person" />
    </div>
    <a-dropdown v-else-if="dataConst.userInfo" :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        {{ dataConst.userInfo.fullName || dataConst.userInfo.userName || dataConst.userInfo.email }}
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="logout()">
            <a class="flex flex-row justify-center items-center"><BaseIcon class="mr-2" icon="line-md:log-out" /> Đăng xuất</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>
