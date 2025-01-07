<template>
  <div class="w-full h-full relative" :ref="ref">
    <a-table class="absolute top-0 right-0" :columns="columnsMap"
      :dataSource="rowData"
      :expandRowByClick="true"
      :showExpandColumn="true"
      :defaultExpandAllRows="true"
      :bordered="true"
      :rowSelection="rowSelection"
      :pagination="false"
      :scroll="scroll"
    >
      <template #expandIcon="props: any">
        <div class="mr-2 cursor-pointer min-w-[15px] h-full">
          <template v-if="props.record.children.length">
            <BaseIcon v-if="!props.expanded" size="15" icon="icon-park-solid:right-one" />
            <BaseIcon v-else size="15" icon="icon-park-solid:down-one" />
          </template>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <slot :item="{ column, record }"></slot>
      </template>
      <template #emptyText>
        <div>
          Không có dữ liệu!
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['change', 'select', 'selectAll'])
const props = defineProps({
  ref: {
    type: null
  },
  dataSource: {
    type: Array,
    default: []
  },
  columns: {
    type: Array,
    default: []
  },
  checkStrictly: {
    type: Boolean,
    default: true
  },
  scrollY: {
    type: Number,
    default: 500
  },
  hideRowSelection: {
    type: Boolean,
    default: false
  }
})
const rowData = ref<any>([])
const columnsMap = ref<any>([])
const state = reactive({
  selectedRowKeys: [], // Check here to configure the default column
});
const scroll = computed(() => {
  return {
    x: 100,
    y: props.scrollY
  }
})
const rowSelection = computed(() => {
  return  props.hideRowSelection ? null : {
    checkStrictly: true,
    hideSelectAll: true,
    selectedRowKeys: state.selectedRowKeys,
    onChange: onChange,
    onSelect: onSelect,
    onSelectAll: onSelectAll
  } as any
});
watch(() => props.columns, (val) => {
  columnsMap.value = [...props.columns]
}, {deep: true})
watch(() => props.dataSource, (val) => {
  rowData.value = [...props.dataSource]
})
onMounted(() => {
  rowData.value = [...props.dataSource]
  columnsMap.value = [...props.columns]
})
function onChange (selectedRowKeys: any, selectedRows: any) {
  emit('change', selectedRowKeys, selectedRows)
  state.selectedRowKeys = selectedRowKeys;
}
function onSelect (record: any, selected: boolean, selectedRows: any) {
  emit('select', record, selected, selectedRows)
}
function onSelectAll (selected: any, selectedRows: any, changeRows: any) {
  emit('selectAll', selected, selectedRows, changeRows)
}
function clearSelectedRowKeys() {
  state.selectedRowKeys = []
}
defineExpose({ clearSelectedRowKeys })
</script>

