<template>
  <div class="w-full h-full bg-themeBackground">
    <a-style-provider hash-priority="high">
    </a-style-provider>
  </div>
</template>
<script lang="ts" setup>

const darkMode = useState("theme", () => true);
const theme = _useCookie('theme') as any
const setTheme = (newTheme: string) => {
  theme.value = newTheme
  useConst().value.theme = newTheme;
  const body = document.body;
  if (darkMode.value) {
    body.classList.add("theme-dark");
    body.classList.remove("theme-light");
  } else {
    body.classList.add("theme-light");
    body.classList.remove("theme-dark");
  }
  return;
};
onMounted(async () => {
  darkMode.value = theme.value == "dark" ? true : false;
  if (!useConst().value.activeSidebar) {
    useConst().value.activeSidebar =
      keyLocalStorage({ type: "GET", key: "activeSidebar" }) || "SideBarVnindex";
  }
});

watch(darkMode, (selected) => {
  setTheme(selected ? "dark" : "light");
});
</script>

<style lang="scss" scoped>
</style>
