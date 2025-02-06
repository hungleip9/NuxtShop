<template>
  <div class="w-full h-full flex flex-row justify-between items-center">
    <slot />
    <NuxtLink to="/">
      <BaseImg :src="'/images/logo.png'" class="cursor-pointer w-[300px]"/>
    </NuxtLink>
    <div class="cursor-pointer">
      <BaseIcon
        v-show="useConst().value.theme == 'dark'"
        icon="line-md:sun-rising-loop"
        @click="setTheme('light')"
      />
      <BaseIcon
        v-show="useConst().value.theme == 'light'"
        icon="line-md:sunny-outline-to-moon-loop-transition"
        @click="setTheme('dark')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const theme = _useCookie('theme') as any
  onMounted(() => {
    useConst().value.theme = theme.value
  })
  function setTheme (type: string) {
    useConst().value.theme = type
    theme.value = type
    document.body.classList.toggle('theme-dark', type == 'dark')
    document.body.classList.toggle('theme-light', type == 'light')
  }
</script>

<style lang="scss" scoped>

</style>