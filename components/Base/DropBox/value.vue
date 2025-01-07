<template>
  <a-dropdown v-model:open="visibleMap"
    :trigger="trigger"
    :placement="placement"
    @openChange="openChange">
    <a class="ant-dropdown-link" :class="addclass" @click.prevent>
      <slot></slot>
    </a>
    <template #overlay>
      <div class="body-dropbox">
        <slot name="item"></slot>
      </div>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
const emit = defineEmits(['hide', 'show'])
const props = defineProps({
  trigger: {
    type: null,
    default: ['click']
  },
  addclass: {
    type: String,
    default: ''
  },
  placement:{
    type: null,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const visibleMap = ref(false);
watch(() => props.visible, (val) => {
  visibleMap.value = props.visible
})
onMounted(() => {
  visibleMap.value = props.visible
})
function openChange (check: boolean = false) {
  if (check) return emit('show')
  return emit('hide')
}
function onHide () {
  visibleMap.value = false
}
defineExpose({ onHide })
</script>

