<template>
  <BaseChart :showLoading="showLoading"
    :absolute="absolute"
    :width="width"
    :height="height"
    :id="id"
    :option="option"
    :newValue="newValue"
    :replaceMerge="['xAxis', 'series']"/>
  <div class="flex justify-center">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
	width: {
		type: String,
		default: "100%",
	},
	height: {
		type: String,
		default: "100%",
	},
  hidenRadio: {
    type: Boolean,
		default: false,
  },
  absolute: {
    type: Boolean,
		default: false,
  },
  showLoading: {
    type: Boolean,
		default: false,
  },
  usingSlice: {
		type: Boolean,
		default: false,
	},
  ArrayChart: {
    type: null,
    required: true,
    default: () => ({
      t: [], // time
      data: [], // [{name: e.Name, data: []}]
    }),
  },
});
const option = ref<any>({})
const newValue = ref<any>({})
const loading = ref(false)
watch(() => props.ArrayChart, (val) => {
  setOptionChart()
}, {deep: true});
onMounted(async () => {
	await setOptionChart();
});
const setOptionChart = useDebounceFn(async () => {
  if (!props.ArrayChart || !props.ArrayChart.t) return option.value = {}
  const series = props.ArrayChart.data.map((e: any) => {
    return {
      ...e,
      type: 'line',
      symbol: 'none',
      id: e.name
    }
  })
  await nextTick()
  if (!option.value || !option.value.name || loading.value) {
    option.value = {
      name:"title",
      legend: {
        type: "scroll",
        show: true,
        icon: 'circle',
        textStyle: {
          color: getColorTextTheme(),
          fontFamily: "sans-serif",
        },
      },
      tooltip: {
        trigger: 'axis',
        showContent: true,
        order: "valueDesc"
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: props.ArrayChart.t
      },
      yAxis: { 
        type: 'value',
        scale: true,
        position: 'right',
        splitLine: {
          lineStyle: {
            color: "#66666612"
          }
        },
        axisLabel: {
          formatter: (val: any) => `${numberShortener(val, 2)}`
        }
      },
      grid: {
        show: false,
        left: "0%",
        right: "0%"
      },
      series: series
    }
  } else {
    const obj = {
      xAxis: {
        data: props.ArrayChart.t
      },
      series: series
    }
    newValue.value = {...obj}
  }
}, 100, {maxWait: 100})
</script>

<style lang="scss" scoped>
.box-chart {
	width: 100%;
	height: 100%;
	position: absolute;
}
</style>