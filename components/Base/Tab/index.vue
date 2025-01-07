<template>
  <a-tabs v-model:activeKey="activeKeyMap" centered>
      <a-tab-pane v-for="item in optionMap" :key="item.key" :tab="item.label">
        <slot :item="item"></slot>
      </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
const props = defineProps({
  activeKey: {
    type: String,
    default: '',
  },
  option: {
    type: Array,
    default: [] //[{key: '', label: ''}]
  }
})
const activeKeyMap = ref('')
const optionMap = ref<any[]>([])
watch(() => props.activeKey, (val) => {
  activeKeyMap.value = props.activeKey
})
onMounted(() => {
  activeKeyMap.value = props.activeKey
  optionMap.value = [...props.option]
})
</script>

