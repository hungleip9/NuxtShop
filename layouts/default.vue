<template>
  <div class="common-layout h-full">
    <el-container class="w-full h-full">
      <el-header height="80px" class="border sticky top-0 left-0 z-1000"><Header /></el-header>
      <el-container>
        <el-aside :width="useGlobal().value.showSidebar ? '250px' : '60px'" class="border"><Sidebar /></el-aside>
        <el-main class="border overflow-auto max-h-[calc(100vh-80px)]">
          <slot />
          <el-footer class="borderC h-[250px]">
            <Footer />
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
header {
  background-color: var(--background);
  padding: 5px 10px;
}
aside {
  padding: 5px 10px;
}
main {
  padding: 5px 100px;
}
</style>