<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :fill="fill"
    :viewBox="viewBox"
    :width="width"
    :height="height"
    v-if="name"
    v-html="getNameIcon()"
    :class="addClass">
  </svg>
</template>

<script lang="ts" setup>
import { nameIcon } from "@/constants/BaseIconSvg/nameIcon";
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '16'
    },
    height: {
      type: String,
      default: '16'
    },
    addClass: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: 'currentColor'
    },
    viewBox: {
      type: String,
      default: '0 0 16 16'
    }
  })
  function getNameIcon () {
    if (!props.name) return []
    return nameIcon[props.name] || '<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12"/>'
  }
</script>