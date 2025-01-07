<template>
  <a-dropdown
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
  }
})
function openChange (check: boolean = false) {
  if (check) return emit('show')
  return emit('hide')
}
function onHide () {
  emit('hide')
}
defineExpose({ onHide })
</script>
