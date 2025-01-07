<template>
  <div :class="!flex ? 'inline' : 'flex'">
    <a-tooltip class="outline-none" :placement="placement" v-if="title">
      <template #title>{{ title }}</template>
      <Icon :icon="icon"
        :width="size"
        :height="size"
        :color="color" />
    </a-tooltip>
    <Icon v-else :icon="icon"
        :width="size"
        :height="size"
        :color="color" />
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    placement: {
      type: null,
      default: 'top',
    },
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '20'
    },
    color: {
      type: String,
      default: ''
    },
    flex: {
      type: Boolean,
      default: false
    }
  })
</script>