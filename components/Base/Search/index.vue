<template>
  <div class="w-full h-full base-search">
    <div class="icon-search">
      <BaseIcon icon="material-symbols-light:search" />
    </div>
    <a-auto-complete
      v-model:value="searchValue"
      :dropdown-match-select-width="dropdownMatchSelectWidth"
      :style="`width: ${width}; height: ${height}`"
      :options="dataSource"
      :placeholder="placeholder"
      :allowClear="true"
      :defaultOpen="true"
      :autofocus="autofocus"
      @select="onSelect"
      @search="search"
    >
      <template #clearIcon>
        <close-outlined />
      </template>
      <!-- @vue-ignore -->
      <template #option="item">
        <div v-if="item.Type == 'searching'">Đang tìm kiếm!</div>
        <slot v-else :item="item"></slot>
      </template>
    </a-auto-complete>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'select', 'search'])

const props = defineProps({
  modelValue: {
    type: null,
  },
  options: {
    type: Array,
    required: true,
    default:() => ([]) // [{ query: "", value: ""}]
  },
  placeholder: {
    type: String,
    default: 'Tìm kiếm'
  },
  width: {
    type: String,
    default: '300px'
  },
  height: {
    type: String,
    default: '30px'
  },
  autofocus: {
    type: Boolean,
    default: true
  },
  dropdownMatchSelectWidth: {
    type: Number,
    default: 252
  },
  dontFilter: {
    type: Boolean,
    default: false
  },
  dontGetOption: {
    type: Boolean,
    default: false
  }
})
const searchValue = ref<string>('')
const dataSource = ref<any[]>([])
watch(() => props.options, async (val) => {
  if (!props.dontFilter) return
  dataSource.value = [...props.options]
})
onMounted(() => {
  searchValue.value = props.modelValue
})
function onSelect (val: any, option: any) {
  searchValue.value = option.label
  emit('update:modelValue', option.label)
  emit('select', val, option)
}
async function search (val: string) {
  if (searchValue.value) {
    dataSource.value = [{
      value: "",
      Type: "searching"
    }]
  }
  await emit('search', val)
  if (props.dontGetOption) return  
  await nextTick()
  if (!props.options || !props.options.length) {
    dataSource.value = []
    return
  }
  if (props.dontFilter) {
    dataSource.value = [...props.options]
    return
  } 
  dataSource.value = props.options.filter((e: any) => e.query.toUpperCase().includes(val.toUpperCase())) || []
};

</script>
<style lang="scss" scoped>
  .base-search {
    position: relative;
    display: flex;
    align-items: center;
    .icon-search {
      display: flex;
      line-height: 1.5;
      position: absolute;
      z-index: 1;
      left: 0.5rem;
    }
  }
</style>