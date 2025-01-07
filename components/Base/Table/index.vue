<template>
  <div class="w-full h-full" :id="props.idTable">
    <AgGridVue class="ag-theme-alpine base-table" style="width: 100%; height: 100%;"
      :id="idDrop"
      :columnDefs="columnDefsMap"
      :rowData="rowDataMap"
      :defaultColDef="defaultColDefMap"
      :rowHeight="rowHeight"
      :headerHeight="30"
      :overlayLoadingTemplate="overlayLoadingTemplate"
      :overlayNoRowsTemplate="overlayNoRowsTemplate"
      :isFullWidthRow="isFullWidthRow"
      :sortingOrder="['desc', 'asc', null]"
      :getRowId="acceptedKeys ? getRowId : ''"
      :cellFlashDuration="500"
      :cellFadeDuration="500"
      :rowDragEntireRow="rowDragEntireRow"
      :rowDragManaged="rowDragManaged"
      :animateRows="animateRows"
      :rowSelection="rowSelection"
      :suppressRowClickSelection="suppressRowClickSelection"
      :suppressMenuHide="suppressMenuHide"
      :tooltipShowDelay="tooltipShowDelay"
      :tooltipHideDelay="tooltipHideDelay"
      :enableBrowserTooltips="enableBrowserTooltips"
      :suppressModelUpdateAfterUpdateTransaction="suppressModelUpdateAfterUpdateTransaction"
      @rowClicked="rowClicked"
      @rowSelected="rowSelected"
      @gridReady="onGridReady"
      @sortChanged="sortChanged">
    </AgGridVue>
  </div>
</template>

<script lang="ts" setup>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const props = defineProps({
  idDrop: {
    type: String,
    default: '',
  },
	rowData: {
    type: Array as () => any[],
		required: true,
    default: () => ([]),
	},
  defaultColDef: {
		type: Object,
		required: true,
    default: () => ({
      flex: 1,
    }),
	},
  acceptedKeys: {
		type: String,
    default: '',
	},
  columnDefs: {
		type: Array,
		required: true,
    default: () => ([]),
	},
  rowDragEntireRow: {
    type: Boolean,
    default: false
  },
  rowDragManaged: {
    type: Boolean,
    default: false
  },
  animateRows: {
    type: Boolean,
    default: false
  },
  rowSelection: {
    type: String,
    default: ''
  },
  msgType: {
    type: null,
    default: 2
  },
  overlayLoadingTemplate: {
    type: String,
    default: 'Đang tải dữ liệu!'
  },
  overlayNoRowsTemplate: {
    type: String,
    default: 'Không có dữ liệu!'
  },
  updateTa: {
    type: Boolean,
    default: false
  },
  rowHeight: {
    type: Number,
    default: 30
  },
  idTable: {
    type: String,
    default: ''
  },
  newItem: {
    type: Object,
    default: () => {}
  },
  tooltipShowDelay: {
    type: Number
  },
  tooltipHideDelay: {
    type: Number
  },
  showLoading: {
    type: Boolean,
    default: false
  },
  enableBrowserTooltips: {
    type: Boolean,
    default: false
  },
  useMqtt: {
    type: Boolean,
    default: false
  },
  suppressRowClickSelection: {
    type: Boolean,
    default: true
  },
  suppressMenuHide: {
    type: Boolean,
    default: true
  },
  suppressModelUpdateAfterUpdateTransaction: {
    type: Boolean,
    default: true
  },
});
const defaultColDefMap = ref({})
let gridApi = null as any
const disconnectMqtt = ref(false)
const rowCount = ref(0)
const columnDefsMap = ref<any[]>([])
let boxbody = null as any

const dataSortChange = ref([]);
const emit = defineEmits(['loadMore', 'getSelectedRows', 'getCount', 'rowClicked'])
const rowDataMap = ref<any>([])
watch(() => props.rowData, async (val) => {
  debouncedSetNewRowData()
})
watch(() => props.defaultColDef, (val) => {
  defaultColDefMap.value = {...props.defaultColDef, cellDataType: false, filter: false}
}, {deep: true})
watch(() => props.newItem, (val: any) => {
  if (!gridApi) return
  rowDataMap.value.unshift(val)
  rowCount.value = rowDataMap.value.length || 0
  gridApi.setGridOption('rowData', rowDataMap.value)
  emit('getCount', rowCount.value)
}, {deep: true})
watch(() => props.columnDefs, (val: any) => {
  if (!gridApi) return
  columnDefsMap.value = [...props.columnDefs]
  gridApi.setGridOption('columnDefs', columnDefsMap.value);
}, {deep: true})
// mqtt update
const LiveData = useGlobal().value.LiveData;
watch(LiveData, (val) => {
  const {livedata} = LiveData
  if (!livedata || !props.useMqtt || disconnectMqtt.value || !props.acceptedKeys) return
  if (LiveData.Topic == 'stock-ta-realtime' && props.updateTa) {
    const newRowData = _getRowDataLocCoPhieu(livedata) || null
    if (!newRowData) return
    updateRowData(newRowData.Code, newRowData)
  }
  if (props.msgType && livedata.msgType == props.msgType) {
		setDataValue(livedata);
	}
})
const arrField = computed(() => {
  if (!props.columnDefs || !props.columnDefs.length) return []
  const arr = props.columnDefs.map((e: any) => e.field) || []
  return arr
})
onMounted(async () => {
  disconnectMqtt.value = false
  rowDataMap.value = [...props.rowData]
  rowCount.value = props.rowData.length || 0
  defaultColDefMap.value = {...props.defaultColDef, cellDataType: false, filter: false}
  if (props.idTable) {
    let outerDiv = document.getElementById(props.idTable);
    if (outerDiv) {
      let innerDivs = outerDiv.getElementsByClassName("ag-body-viewport");
      if (innerDivs.length > 0) {
        innerDivs[0].id = `${props.idTable}-children`;
        await nextTick()
        boxbody = document.getElementById(`${props.idTable}-children`)
        boxbody.addEventListener("scroll", handleScroll);
      }
    }
  }
  columnDefsMap.value = [...props.columnDefs]
  emit('getCount', rowCount.value)
})
function onGridReady(params: any) {
	gridApi = params.api;
}
async function handleScroll () {
  // Kiểm tra xem đã đạt đến cuối cùng của bảng
  const scrollHeight = boxbody.scrollHeight;
  const scrollTop = boxbody.scrollTop;
  const clientHeight = boxbody.clientHeight;
  if ((scrollHeight - scrollTop) - clientHeight == 0) {
    emit('loadMore')
    // Khi lăn xuống cuối cùng, gọi phương thức loadMoreData() để tải thêm dữ liệu
  }
}
function getRowId (params: any) {
  if (props.acceptedKeys && params && params.data) {
    return params.data[props.acceptedKeys];
  }
}
function isFullWidthRow(params: any) {
  return params.rowNode.data.fullWidth;
}
async function sortChanged() {
	if (!gridApi) return
	await nextTick()
	const rows = gridApi.getModel().rowsToDisplay;
	const sortedData = rows.map(function(row: any) {
		return row.data;
	});
  dataSortChange.value = sortedData
}
function setDataValue(livedata: any) {
	if (!livedata || !livedata.Body || !gridApi || !arrField.value.length) return
  const arrBody = livedata.Body.split("$") || []
  if (!arrBody || !arrBody.length) return
  arrBody.forEach((_message: any) => {
		const arrmsg = _message.split("|");
    const symbol = arrmsg[0] || ''
    const rowNode = gridApi.getRowNode(arrmsg[0]);
    if (!symbol || !rowNode) return
    let newObjUpdate = {} as any

		arrmsg.forEach((elementData: any) => {
			if (elementData.indexOf("*") < 0) return
			const _obj = elementData.split("*");
      const key = handleGetKeyMqtt(_obj[0], props.msgType);
			if (!_obj[0] || !key || !arrField.value.includes(key)) return
      const numberData = isNaN(_obj[1]) ? _obj[1] : Number(_obj[1])
      newObjUpdate[key] = numberData
		});

    if (!Object.keys(newObjUpdate).length) return
    if (newObjUpdate.Close && newObjUpdate.TotalVolume && props.msgType == 2) {
      // Cập nhật cao thấp
      const LastLiveBoard = useGlobal().value.LiveBoardSymbol[symbol] || null
      if (!LastLiveBoard) return
      const {High, Low} = LastLiveBoard?.liveboard
      if (arrField.value.includes('High')) {
        newObjUpdate.High = High ? Math.max(newObjUpdate.Close, High) : newObjUpdate.Close
      }
      if (arrField.value.includes('Low')) {
        newObjUpdate.Low = Low ? Math.min(newObjUpdate.Close, Low) : newObjUpdate.Close
      }
    }
    updateRowData(symbol, newObjUpdate)
	});
}
function updateRowData (code: any, newRowData: any) {
  if (!code || !newRowData || !gridApi) return
  const rowNode = gridApi.getRowNode(code);
  if (!rowNode) return
  const newData = Object.assign({}, rowNode.data, newRowData);
  gridApi.applyTransactionAsync({ update: [newData] });
}
const arrSelect = ref()
function rowSelected () {
  arrSelect.value = gridApi.getSelectedRows() || []
  emit('getSelectedRows', arrSelect.value)
}
function setDataValue2() {
  const rowNode = gridApi.getRowNode('AAA');
  if (rowNode) {
    rowNode.setDataValue('ChangePercent', Math.random());
  }
}
function rowClicked (event: any) {
  emit('rowClicked', event)
}
const debouncedSetNewRowData = useDebounceFn(async () => {
  if (!gridApi) return
  if (props.showLoading) {
    await gridApi.showLoadingOverlay();
  }
  rowCount.value = props.rowData.length || 0
  rowDataMap.value = [...props.rowData]
  await nextTick()
  await gridApi.setGridOption('rowData', rowDataMap.value)
  await emit('getCount', rowCount.value)
  if (props.showLoading) {
    await gridApi.hideOverlay();
  }
}, 200, {maxWait: 200})
onBeforeUnmount(() => {
  disconnectMqtt.value = true
  if (!gridApi) return
  gridApi.isDestroyed()
})
</script>