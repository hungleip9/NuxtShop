<template>
  <div class="w-full h-full flex flex-row items-center justify-between">
    <div>
    {{ _t('Xin chào') }}
    </div>
    <NuxtLink class="mr-5" :to="'/'">
      <img
        class="cursor-pointer w-[250px] h-[50px] rounded-[50%]"
        src="~/assets/images/logo.png"
      />
    </NuxtLink>
    <div class="flex flex-row items-center">
      <el-dropdown placement="bottom-start" class="mr-3">
        <span class="el-dropdown-link font-bold">
          {{ locale == 'vi' ? 'Việt Nam' : 'English' }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setLocale('en')">English</el-dropdown-item>
            <el-dropdown-item @click="setLocale('vi')">Việt Nam</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div
        class="dark-mode w-[22px] h-[22px] cursor-pointer"
        @click="setColorMode()"
      >
        <el-icon v-show="colorMode.preference == 'dark'" :size="18"><Sunny /></el-icon>
        <el-icon v-show="colorMode.preference == 'light'" :size="18"><Moon /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Moon, Sunny } from "@element-plus/icons-vue";
const { setLocale, locale } = useI18n();
const colorMode = useColorMode();
function setColorMode() {
  colorMode.preference = colorMode.preference == "dark" ? "light" : "dark";
}
</script>

<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
