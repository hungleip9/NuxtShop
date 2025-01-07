<template>
  <div :id="idDrop"
    ref="loadMore"
    class="w-full h-full overflow-y-auto overflow-x-hidden pb-4"
    :style="`max-height: ${maxHight}`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['loadMore'])
const props = defineProps({
  idDrop: {
    type: String,
    required: true,
  },
  maxHight :{
    type: String,
    default: '',
  }
})
const loadMore = ref()

onMounted(() => {
  initScrollEvent()
})

function initScrollEvent() {
  if (loadMore.value) {
    loadMore.value.addEventListener("scroll", async () => {
      if ((loadMore.value.scrollTop + loadMore.value.clientHeight + 10) >= loadMore.value.scrollHeight && loadMore.value.scrollTop > 0) {
        debouncedLoadMore()
      }
    });
  }
}
const debouncedLoadMore = useDebounceFn(async () => {
	emit('loadMore')
}, 500, {maxWait: 500})
</script>