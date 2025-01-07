<template>
  <div class="w-full h-full flex flex-col justify-between">
    <div class="w-full flex flex-col pl-2 flex-1">
      <div class="option-chart">
        <div class="flex flex-row justify-center items-center">
          <BaseDropBoxValue v-if="!noneTooltip">
            <BaseIcon class="mr-2 cursor-pointer" title="Thêm chỉ báo kỹ thuật" icon="material-symbols-light:add-chart-outline" :size="'30'" />
            <template #item>
              <div class="w-[150px] bg-dropdown">
                <BaseCheckBox :option="[
                  { label: 'MACD', value: 'MACD' },
                  { label: 'RSI', value: 'RSI' },
                  { label: 'RS', value: 'RS' },
                ]" :radioNgang="true" :unset="true" v-model="selectedIndicator" @change="choiceIndicator" />
              </div>
            </template>
          </BaseDropBoxValue>
          <div class="flex items-center mb-1 cursor-pointer" v-if="!hideTypeChart">
            <BaseIcon v-if="toggle" icon="fluent-mdl2:line-chart" @click="choiceTypeChart()"/>
            <BaseIcon v-else icon="teenyicons:candle-chart-outline" @click="choiceTypeChart()"/>
          </div>
        </div>

        <ul class="flex btn-listma">
          <template v-for="item in optionMa">
            <li :class="getClassMa(item.value)" @click="choiceMa(item.value)">
              {{ item.label }}
            </li>
          </template>
        </ul>
        <div class="w-[40px]"></div>
      </div>
      <div class="w-full h-full flex flex-col relative" ref="boxChart">
        <div v-if="!dataChart.length"
          class="w-full h-full absolute top-0 left-0 flex items-center justify-center z-50 loading-chart">
          <div class="ele">Không có dữ liệu!</div>
        </div>
        <div class="h-full flex-grow relative">
          <div v-if="!loading" class="w-[100%] h-full k-line-chart absolute top-0 left-0" :id="`klinecharts-${id}`"></div>
        </div>
      </div>
    </div>
    <div class="h-[50px] flex justify-center">
      <BaseRadio :option="intervals" v-model="zoom" @change="handleChangeZoom"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { init, registerIndicator } from 'klinecharts'
import { VOL_CUSTOM, MA_CUSTOM, RSI_CUSTOM, RS_CUSTOM } from "@/constants/CandleStick/indicators";
import { getHistoryPrice, getInfoSymbol } from '~/services/Tradingview'
const emit = defineEmits(['loadMore', 'getDataList'])
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  noneTooltip: {
    type: Boolean,
    default: false
  },
  hideTypeChart: {
    type: Boolean,
    default: false
  },
  heightVol: {
    type: Number,
    default: 100
  },
  hideVOL: {
    type: Boolean,
    default: false
  },
  saveId: {
    type: String,
    default: ''
  },
  calcParams: {
    type: Array,
    default: [20]
  },
  setChartType: {
    type: String,
    default: ''
  },
  symbol: {
    type: String,
    required: true,
    default: ''
  },
  typeZoom: {
    type: Number,
    default: 2
  },
  zoomDrop: {
    type: Number,
    default: 120
  }
})
const loading = ref<boolean>(true)
let klinecharts = null as any
const optionMa = [
  { label: 'MA10', value: 10, color: '#91cc75' },
  { label: 'MA20', value: 20, color: '#dc962c' },
  { label: 'MA50', value: 50, color: '#EE6666' },
] as {label: string, value: number, color: string}[];
const selectedMa = ref<number[]>([20, 50]);
const paneIdMACD = ref(null)
const paneIdRSI = ref(null)
const paneIdRS = ref(null)
const boxChart = ref(null)
const selectedIndicator = ref<string[]>([])
const resizeObserver = new ResizeObserver(entries => {
  if (klinecharts) {
    klinecharts.resize()
  }
});
const colorGrid = ref<string>('#e5e6e9');
const toggle = ref<boolean>(false);
const symbolInfo = ref<any>(null)
const dataChart = ref<{ close:number, high: number, low: number, open: number, timestamp: number, volume: number }[]>([])
const intervals = computed(() => {
  if (symbolInfo.value && symbolInfo.value.type && ['futures', 'commodity'].includes(symbolInfo.value.type)) {
    return [
      { label: '1M', value: 20 },
      { label: '3M', value: 60 },
      { label: '6M', value: 120 },
      { label: '1Y', value: 240 },
      { label: '5Y', value: 1200 },
    ]
  }
  return [
    { label: '1D', value: 4320 },
    { label: '1M', value: 20 },
    { label: '3M', value: 60 },
    { label: '6M', value: 120 },
    { label: '1Y', value: 240 },
    { label: '5Y', value: 1200 },
  ]
})
const zoom = ref(120);
const lastZoom = ref(120)
watch(() => props.symbol, () => {
  getFirstData()
})
watch(() => useConst().value.theme, () => {
  setStylesKline()
})
watch(() => props.setChartType, (val: any) => {
  setChartType(false)
})
// mqtt
const LiveData = useGlobal().value.LiveData;
watch(LiveData, (val) => {
	const {livedata} = val
	if (!val || val.Topic != 'stockdata' || ![2, 3, 14, 88, 89].includes(livedata.msgType) || !livedata.Body || !klinecharts) return
	const arrLivedataBody = livedata.Body.split("$") || []
	if (!arrLivedataBody || !arrLivedataBody.length) return
  const getDataChart = klinecharts.getDataList()
  if (!getDataChart.length) return
  let bar = getDataChart.at(-1)
  const lastBar = getDataChart.at(-1)
  let symbol = props.symbol
	if (symbol == 'UPINDEX' && ![88, 89].includes(livedata.msgType)) {
		symbol = 'HNXUPCOMINDEX'
	}
  let isChange = false
	let ObjGetBar = {
		isChange: false,
		mapBar: {...bar}
	}
	arrLivedataBody.forEach((_message: any) => {
		const arrmsg = _message.split("|") || [];
		if (!arrmsg.length || arrmsg[0] != symbol) return
		if (zoom.value == 4320 && livedata.msgType == 14) {
			// market theo phut
			ObjGetBar = getBarForMarketMinus(arrmsg, bar)
			isChange = ObjGetBar.isChange
			bar = {...ObjGetBar.mapBar}
		} else {
			arrmsg.forEach((elementData: any) => {
				if (elementData.indexOf("*") < 0) return
				const _obj = elementData.split("*") || [];
				if (!_obj || !_obj.length) return
				const key = handleGetKeyMqtt(_obj[0], livedata.msgType)
				if (!key) return
				if ([88, 89].includes(livedata.msgType)) {
					// Cập nhật đầu ngày
					if (key != 'Reference' && livedata.msgType == 88) return //company
					if (key != 'Close' && livedata.msgType == 89) return //market
					isChange = true
					bar = {
						open: isnum(_obj[1]),
						close: isnum(_obj[1]),
						low: isnum(_obj[1]),
						high: isnum(_obj[1]),
						volume: 0,
					}
				} else {
					if (!['Close', 'TotalVolume', 'MatchVolume'].includes(key)) return
					ObjGetBar = getObjGetBar(livedata.TimeStamp, isChange, key, lastBar, bar, isnum(_obj[1]))
					if (ObjGetBar) {
						isChange = ObjGetBar.isChange
						bar = {...ObjGetBar.mapBar}
					}
				}
			})
		}
		if (!isChange) return // bắt thay đổi và update
		bar.timestamp = livedata.TimeStamp * 1000
    updatedData(bar, lastBar)
	})
})
onMounted(async () => {
  if (props.zoomDrop) {
    zoom.value = props.zoomDrop
    lastZoom.value = props.zoomDrop
  }
  getFirstData()
})
async function getFirstData() {
  loading.value = true
  if (!props.symbol) return
  await getInfo()
  loading.value = false
  await getData(null, zoom.value).then((res: any) => {
    const data = res.data
    dataChart.value = data.t.map((time: number, index: number) => ({
      close: data.c[index],
      high: data.h[index],
      low: data.l[index],
      open: data.o[index],
      timestamp: time * 1000,
      volume: data.v[index]
    })) || []
  }).catch(e => {
    console.log(e)
  })
  await getChart()
  await renderDataChart()
  await nextTick()
  if (boxChart.value) {
    resizeObserver.observe(boxChart.value);
  }
}
async function getInfo() {
  await getInfoSymbol(props.symbol).then(res => {
    symbolInfo.value = res
  })
}
async function getData(to: any, size: number) {
  const params = {
    symbol: props.symbol,
    resolution: zoom.value == 4320 ? '1' : '1D',
    to: to || Math.round(new Date().getTime()/1000),
    size: size || 240
  }
  return await getHistoryPrice(params)
}
async function getChart() {
  if (!props.id) return
  klinecharts = init(`klinecharts-${props.id}`, {
    customApi: {
      formatDate: (dateTimeFormat: any, timestamp: any, format: any, type: number) => {
        if (zoom.value == 4320) {
          return _getFormatTime(timestamp, { getOnlyTime: true })
        } else {
          let date = _getFormatTime(timestamp, { getOnlyDate: true }) || null
          if (date) {
            date = date.slice(0, 5);
          }
          if (type == 1 || type == 2) {
            return date
          }
          return _getFormatTime(timestamp, { getOnlyDate: true })
        }
      },
      formatBigNumber: (value: string | number) => {
        if (isnum(value) > 1000000) {
          return numberShortener(value, 2)
        } else {
          return numberFormatVolume(value, 2)
        }
      },
    }
  })
  await nextTick()
  if (!klinecharts) return
  await setStylesKline()
  await registerIndicatorKline()
  await nextTick()
  klinecharts.loadMore(handleLoadMore)
  await handleChangeMA()
  klinecharts.subscribeAction('onDataReady', () => {
    emit('getDataList', klinecharts.getDataList())
  })
}
async function setStylesKline() {
  if (!klinecharts) return
  colorGrid.value = useCookie('theme').value == 'dark' ? "#252930" : "#e5e6e9";
  klinecharts.setStyles(
    {
      grid: {
        show: true,
        horizontal: {
          show: true,
          size: 0.5,
          color: colorGrid.value,
          style: 'solid',
          dashedValue: [2, 2]
        },
        vertical: {
          show: true,
          size: 0.3,
          color: colorGrid.value,
          style: 'dashed',
          dashedValue: [2, 2]
        }
      },
      candle: {
        // 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
        type: 'candle_solid',
        bar: {
          upColor: '#0ECB81',
          downColor: '#f6465d',
          noChangeColor: '#0ECB81',
          upBorderColor: '#0ECB81',
          downBorderColor: '#f6465d',
          noChangeBorderColor: '#0ECB81',
          upWickColor: '#0ECB81',
          downWickColor: '#f6465d',
          noChangeWickColor: '#0ECB81'
        },
        area: {
          lineSize: 1.5,
          lineColor: '#089981',
          value: 'close',
          backgroundColor: [{
            offset: 0,
            color: 'rgba(8, 153, 129, 0.01)'
          }, {
            offset: 1,
            color: 'rgba(8, 153, 129, 0.2)'
          }]
        },
        priceMark: {
          last: {
            show: true,
            upColor: '#0ECB81',
            downColor: '#F6465D',
            noChangeColor: '#0ECB81',
            text: {
              color: '#fff',
              family: 'sans-serif',
            },
          },
          high: {
            textFamily: 'sans-serif'
          },
          low: {
            textFamily: 'sans-serif'
          },
        },
        tooltip: {
          showRule: props.noneTooltip ? 'none' : 'always',
          showType: 'standard',
          custom: (data: any) => {
            const { prev, current } = data;
            return [
              {
                title: "", value: {
                  text: `${_getFormatTime(current.timestamp, { getOnlyDate: true })}`,
                  color: '#888888'
                }
              },
              {
                title: "O: ", value: {
                  text: `${current.open}`,
                  color: getColor(current.open, current.close)
                }
              },
              {
                title: "C: ", value: {
                  text: `${current.close}`,
                  color: getColor(current.open, current.close)
                }
              },
              {
                title: "H: ", value: {
                  text: `${current.high}`,
                  color: getColor(current.open, current.close)
                }
              },
              {
                title: "L: ", value: {
                  text: `${current.low}`,
                  color: getColor(current.open, current.close)
                }
              },
              {
                title: "V: ", value: {
                  text: isnum(current.volume) > 1000000 ? numberShortener(current.volume, 2) : `${numberFormat(current.volume)}`,
                  color: getColor(current.open, current.close)
                }
              },
            ];
          },
          defaultValue: 'N/A',
          text: {
            show: true,
            size: 12,
            family: 'sans-serif',
            weight: 'normal',
            marginLeft: 10,
            marginTop: 8,
            marginRight: 6,
            marginBottom: 0,
            backgroundColor: 'rgba(33, 150, 243, 0.4)',
          },
          rect: {
            // 'fixed' | 'pointer'
            position: 'pointer',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 4,
            borderSize: 1,
            borderColor: '#eee',
            backgroundColor: 'rgba(33, 150, 243, 0.2)'
          },
          icons: []
        }
      },
      indicator: {
        ohlc: {
          upColor: '#0ECB81',
          downColor: '#f6465d',
          noChangeColor: '#0ECB81'
        },
        bars: [{
          style: 'fill',
          borderStyle: 'solid',
          borderSize: 1,
          borderDashedValue: [2, 2],
          upColor: '#0ECB81',
          downColor: '#f6465d',
          noChangeColor: '#0ECB81'
        }],
        circles: [{
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderSize: 1,
          borderDashedValue: [2, 2],
          upColor: '#0ECB81',
          downColor: '#f6465d',
          noChangeColor: '#0ECB81'
        }],
        lastValueMark: {
          show: false,
          text: {
            show: true,
            // 'fill' | 'stroke' | 'stroke_fill'
            style: 'stroke_fill',
            color: '#FFFFFF',
            size: 11,
            family: 'sans-serif',
            weight: 'normal',
            // 'solid' | 'dashed'
            borderStyle: 'dashed',
            borderSize: 1,
            borderDashedValue: [2, 2],
            paddingLeft: 4,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            borderRadius: 2
          }
        },
        tooltip: {
          // 'always' | 'follow_cross' | 'none'
          showRule: props.noneTooltip ? 'none' : 'always',
          showType: 'standard',
          defaultValue: 'N/A',
          text: {
            family: 'sans-serif',
          },
        },

      },
      xAxis: {
        show: true,
        size: 'auto',
        position: 'middle',
        axisLine: {
          show: true,
          color: '#88888860',
          bottom: 0,
          size: 1
        },
        tickText: {
          show: true,
          color: '#888888',
          family: 'sans-serif',
          weight: 'normal',
          size: 12,
          marginStart: 4,
          marginEnd: 4
        },
        tickLine: {
          show: true,
          size: 1,
          length: 1,
          color: '#888888'
        }
      },
      yAxis: {
        show: true,
        size: 'auto',
        // 'left' | 'right'
        position: 'right',
        // 'normal' | 'percentage' | 'log'
        type: 'normal',
        inside: false,
        reverse: false,
        axisLine: {
          show: false,
          color: colorGrid.value,
          size: 1
        },
        tickText: {
          show: true,
          color: '#888888',
          family: 'sans-serif',
          weight: 'normal',
          size: 12,
          marginStart: 4,
          marginEnd: 4
        },
        tickLine: {
          show: false,
          size: 1,
          length: 3,
          color: '#88888860'
        }
      },
      separator: {
        color: colorGrid.value,
      },
      crosshair: {
        horizontal: {
          text: {
            family: 'sans-serif',
          }
        },
        vertical: {
          text: {
            family: 'sans-serif',
          }
        }
      }
    }
  );
}
async function registerIndicatorKline() {
  if (!klinecharts) return
  const volCustom = VOL_CUSTOM(props.calcParams) as any
  const rsiCustom = RSI_CUSTOM as any
  const rsCustom = RS_CUSTOM as any
  await registerIndicator(volCustom)
  await registerIndicator(rsiCustom)
  await registerIndicator(rsCustom)
  if (!props.hideVOL) {
    klinecharts.createIndicator('VOL_CUSTOM', false, { height: props.heightVol });
  }
  if (props.saveId) {
    const obj = keyLocalStorage({ type: 'GET', key: props.saveId }) || null
    if (obj) {
      selectedIndicator.value = obj.selectedIndicator || []
      selectedMa.value = obj.selectedMa || []
      if (klinecharts && selectedIndicator.value && selectedIndicator.value.length) {
        if (selectedIndicator.value.includes('MACD')) {
          paneIdMACD.value = klinecharts.createIndicator('MACD');
        } else {
          klinecharts.removeIndicator(paneIdMACD.value, 'MACD')
        }
        if (selectedIndicator.value.includes('RSI')) {
          paneIdRSI.value = klinecharts.createIndicator('RSI_CUSTOM');
        } else {
          klinecharts.removeIndicator(paneIdRSI.value, 'RSI_CUSTOM')
        }
        if (selectedIndicator.value.includes('RS')) {
          paneIdRS.value = klinecharts.createIndicator('RS_CUSTOM');
        } else {
          klinecharts.removeIndicator(paneIdRS.value, 'RS_CUSTOM')
        }
      }
      toggle.value = obj.toggle ? true : false;
      setChartType(false)
    }
  }
  if (props.setChartType) {
    setChartType(false)
  }
}
async function renderDataChart() {
  if (!klinecharts) return
  klinecharts.applyNewData(dataChart.value, true)
  await setZoomChart()
}
async function handleLoadMore (data: any) {
  if (!klinecharts) return
  const getDataChart = klinecharts.getDataList()
  if (!getDataChart.length) return
  await getData(getDataChart[0].timestamp / 1000, 240).then((res: any) => {
    const data = res.data
    const moreData = data.t.map((time: number, index: number) => ({
      close: data.c[index],
      high: data.h[index],
      low: data.l[index],
      open: data.o[index],
      timestamp: time * 1000,
      volume: data.v[index]
    })) || []
    if (!moreData.length) return
    klinecharts.applyMoreData(moreData, true)
  })
}
async function handleChangeMA() {
  if (!klinecharts) return
  klinecharts.removeIndicator('candle_pane', 'MA_CUSTOM')
  await nextTick()
  const figures = selectedMa.value.map((elm: any) => {
    return { key: `MA${elm}`, title: `MA${elm}: `, type: 'line', style: { color: '#FF0000', lineWidth: 2 } }
  })
  const maCustom = MA_CUSTOM(selectedMa.value, figures) as any
  registerIndicator(maCustom)
  klinecharts.createIndicator('MA_CUSTOM', false, { id: "candle_pane" });
  const line = selectedMa.value.map((num: any) => {
    return {
      style: 'solid',
      smooth: false,
      size: 1,
      dashedValue: [2, 2],
      color: getColorByMA(num) // 10
    }
  })
  klinecharts.setStyles({
    indicator: {
      lines: line
    },
  })
}
async function handleChangeZoom(val: number) {
  if (lastZoom.value != val || val == 4320 || dataChart.value.length < val) {
    lastZoom.value = val
    // nếu chọn sang xem theo 1 ngày và số cây nến không đủ
    await getData(null, zoom.value).then((res: any) => {
      const data = res.data
      dataChart.value = data.t.map((time: number, index: number) => ({
        close: data.c[index],
        high: data.h[index],
        low: data.l[index],
        open: data.o[index],
        timestamp: time * 1000,
        volume: data.v[index]
      })) || []
    }).catch(e => {
      console.log(e)
    })
    await nextTick()
    klinecharts.applyNewData(dataChart.value, true)
  }
  lastZoom.value = val
  setZoomChart()
}
async function setZoomChart() {
  if (!klinecharts) return
  let zoomMap = getZoomMap()
  const getDataChart = klinecharts.getDataList()
  if (zoomMap) {
    klinecharts.setBarSpace(zoomMap);
  }
  await nextTick()
  klinecharts.scrollToDataIndex(getDataChart.length - 1, 0)
}
function getZoomMap(){
  if (props.typeZoom == 1) {
    switch (zoom.value) {
      case 4320:
        return 1.5
      case 20:
        return 13
      case 60:
        return 6
      case 120:
        return 2.5
      case 240:
        return 1.1
      case 1200:
        return 1
      default:
        return 0
    }
  }
  if (props.typeZoom == 2) {
    switch (zoom.value) {
      case 4320:
        return 1.5
      case 20:
        return 50
      case 60:
        return 24.5
      case 120:
        return 15.0
      case 240:
        return 7.0
      case 1200:
        return 3.0
      default:
        return 0
    }
  }
  if (props.typeZoom == 3) {
    switch (zoom.value) {
      case 4320:
        return 1.5
      case 20:
        return 27.5
      case 60:
        return 9.5
      case 120:
        return 4.8
      case 240:
        return 2.4
      case 1200:
        return 1
      default:
        return 0
    }
  }
}
function getColorByMA(MA: number) {
  if (MA == 10) return '#91cc75'
  else if (MA == 20) return '#dc962c'
  else return '#EE6666'
}

function choiceMa(MA: number) {
  const index = selectedMa.value.indexOf(MA)
  index > -1 ? selectedMa.value.splice(index, 1) : selectedMa.value.push(MA)
  selectedMa.value.sort();
  setkeyLocalStorage()
  handleChangeMA();
}
async function choiceIndicator(indicator: string) {
  if (!klinecharts || !indicator) return
  if (indicator == 'MACD') {
    if (selectedIndicator.value.includes('MACD')) {
      paneIdMACD.value = klinecharts.createIndicator(indicator);
    } else {
      klinecharts.removeIndicator(paneIdMACD.value, indicator)
    }
  }
  if (indicator == 'RSI') {
    if (selectedIndicator.value.includes('RSI')) {
      paneIdRSI.value = klinecharts.createIndicator('RSI_CUSTOM');
    } else {
      klinecharts.removeIndicator(paneIdRSI.value, 'RSI_CUSTOM')
    }
  }
  if (indicator == 'RS') {
    if (selectedIndicator.value.includes('RS')) {
      paneIdRS.value = klinecharts.createIndicator('RS_CUSTOM');
    } else {
      klinecharts.removeIndicator(paneIdRS.value, 'RS_CUSTOM')
    }
  }
  setkeyLocalStorage()
}
function getClassMa(MA: number) {
  return selectedMa.value.includes(MA) ? 'ma' + MA + ' active' : 'ma' + MA
}
function getColor(open: number, close: number) {
  if (!open || !close) return ''
  if (open > close) {
    return '#f6465d'
  } else {
    return '#0ECB81'
  }
}
function choiceTypeChart(){
  toggle.value = !toggle.value;
  setChartType(true)
  setkeyLocalStorage()
}
function setChartType (pass: boolean = false) {
  let type = 'candle_solid'
  if (toggle.value) {
    type = 'area'
  } else {
    type = 'candle_solid'
  }
  if (props.setChartType && !pass) {
    type = props.setChartType
    if (props.setChartType == 'area') {
      toggle.value = true
    } else {
      toggle.value = false
    }
  }
  klinecharts.setStyles({
    candle: {
      type: type,
    }
  });
}
function setkeyLocalStorage () {
  if (props.saveId) {
    keyLocalStorage({
      type: 'SET',
      key: props.saveId,
      value: {
        selectedIndicator: selectedIndicator.value,
        selectedMa: selectedMa.value,
        toggle: toggle.value
      }
    })
  }
}
// updated data
function getBarForMarketMinus(arrmsg: any, bar: any) {
	let obj = {
		isChange: false,
		mapBar: {...bar}
	}
	const arr = arrmsg[1].split("*") || [];
	if (!arr || !arr.length) {
		return obj
	}
	obj.isChange = true
	obj.mapBar = {
		open: isnum(arr[1]),
		close: isnum(arr[2]),
		low: isnum(arr[3]),
		high: isnum(arr[4]),
		volume: isnum(arr[5]),
		time: isnum(arr[0]) / 1000,
	};
	return obj
}
function getObjGetBar(TimeStamp: number, isChange: boolean, key: string, lastBar: any, bar: any, num: number) {
	let ObjGetBar = {
		isChange: isChange,
		mapBar: {...bar}
	}
	if (zoom.value == 4320) {
		ObjGetBar = getBar(key, lastBar, bar, num, TimeStamp, isChange)
    return ObjGetBar
	}
  ObjGetBar = getBar1D(key, lastBar, bar, num, isChange)
  return ObjGetBar
}
function getBar(key: string, lastBar: any, bar: any, num: number, TimeStamp: number, isChange: boolean) {
	let obj = {
		isChange: isChange,
		mapBar: {...bar}
	}
	const lastMinute = new Date(lastBar.time).getMinutes()
	const nowMinute = new Date(TimeStamp * 1000).getMinutes()
	if (key == 'Close') {
		obj.isChange = true
		obj.mapBar.close = num
		// hai phút trước và sau bằng nhau
		if (lastMinute == nowMinute) {
			obj.mapBar.high = obj.mapBar.high ? Math.max(obj.mapBar.high, num) : num
			obj.mapBar.low = obj.mapBar.low ? Math.min(obj.mapBar.low, num) : num
		} else {
			obj.mapBar.open = num
			obj.mapBar.high = num
			obj.mapBar.low = num
		}
	}
	if (key == 'MatchVolume') { //cập nhật volumn
		obj.isChange = true
		// hai phút trước và sau bằng nhau
		if (lastMinute == nowMinute) {
			obj.mapBar.volume += num
		} else {
			obj.mapBar.volume = num
		}
	}
	return obj
}
function getBar1D(key: string, lastBar: any, bar: any, num: number, isChange: boolean) {
	let obj = {
		isChange: isChange,
		mapBar: {...bar}
	}
	if (key == 'Close') {
		obj.isChange = true
		obj.mapBar.close = num
		if (num > lastBar.high) {
			obj.mapBar.high = num
		}
		if (num < lastBar.low) {
			obj.mapBar.low = num
		}
	}
	if (key == 'TotalVolume') { //cập nhật volumn
		obj.isChange = true
		obj.mapBar.volume = num
	}
	return obj
}
function updatedData(newData: any, lastBar: any) {
  if (!klinecharts) return
  let bar = { ...newData }
  if (zoom.value == 4320) {
    const Minutes = new Date(newData.timestamp).getMinutes()
    if (Minutes != new Date(lastBar.at(-1).timestamp).getMinutes()) {
      bar.timestamp = newData.timestamp
    }
    klinecharts.updateData(bar)
    return
  }
  bar.timestamp = lastBar.timestamp
  klinecharts.updateData(bar)
  return
}
onUnmounted(() => {
  if (boxChart.value) {
    resizeObserver.unobserve(boxChart.value);
  }
})
</script>

<style lang="scss" scoped>
.loading-chart {
  background-color: var(--background);
}

.option-chart {
  display: flex;
  justify-content: space-between;

  .btn {
    cursor: pointer;

    .active, &:hover {
      color: var(--text-primary);
    }
  }

  .btn-option-add {
    left: 0;
    top: 0;
    padding: 0.5rem;
    cursor: pointer;
    i {
      font-size: 1.2rem;
    }
  }
}

ul.btn-listma {
  align-items: center;
  justify-content: center;

  li {
    cursor: pointer;
    padding: 0.5rem;
    text-decoration: line-through;
    color: #888888;

    &:hover,
    &.active {
      &.ma10 {
        color: #91cc75
      }

      &.ma20 {
        color: #dc962c
      }

      &.ma50 {
        color: #EE6666
      }
    }

    i {
      margin-right: 0.2rem;
    }

    &.active {
      text-decoration: none;
      font-weight: 600;
      color: var(--text-weight);
    }
  }
}

.bg-dropdown {
  padding: 0.3rem;
  background-color: var(--background);
}

.ele {
  animation: 2s fadeIn;
  animation-fill-mode: forwards;
  visibility: hidden;
}

.ele:hover {
  background-color: #123;
}

@keyframes fadeIn {
  99% {
    visibility: hidden;
  }

  100% {
    visibility: visible;
  }
}</style>