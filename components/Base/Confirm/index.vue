<template>
  <a-popconfirm
    :title="title"
    :okText="okText"
    :cancelText="cancelText"
    :placement="placement"
    @confirm="confirm"
  >
    <slot></slot>
  </a-popconfirm>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['confirm'])
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: 'Đồng ý'
    },
    cancelText: {
      type: String,
      default: 'Đóng'
    },
    placement: {
      type: null,
      default: 'right'
    }
  })
  function confirm (params: any) {
    emit('confirm', params)
  }
</script>