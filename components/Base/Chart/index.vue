<template>
  <div class="w-full h-full relative">
    <div
      v-if="!option || !Object.keys(option).length || loading || showLoading"
      class="w-full h-full absolute top-0 left-0 flex items-center justify-center z-50 loading-chart"
    >
      <VLoading v-if="loading" />
      <div v-else-if="!Object.keys(option).length || showLoading">Không có dữ liệu!</div>
    </div>
    <div :class="absolute ? 'absolute' : ''" :id="`chart-${id}`" :style="{ width: width, height: height }"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// import * as echarts from 'echarts';

import * as echarts from 'echarts/core';

// Import bar charts, all suffixed with Chart
import { BarChart, PieChart, LineChart, TreemapChart, GaugeChart, RadarChart } from 'echarts/charts';

// Import the title, tooltip, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  VisualMapComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components';

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components
echarts.use([
  BarChart,
  PieChart,
  TreemapChart,
  LineChart,
  GaugeChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  VisualMapComponent,
  LegendComponent,
  ToolboxComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const emit = defineEmits(['handleClick']);
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  hidenRadio: {
    type: Boolean,
    default: false
  },
  option: {
    type: Object,
    required: true,
    default: () => ({})
  },
  absolute: {
    type: Boolean,
    default: false
  },
  showLoading: {
    type: Boolean,
    default: false
  },
  newValue: {
    type: null,
    default: {}
  },
  replaceMerge: {
    type: Array as () => string[],
    default: []
  }
});
const loading = ref(true);
let myChart = null as any;
watch(
  () => props.option,
  async (val) => {
    debouncedSetSeriesOption();
  }
);
const debouncedSetSeriesOption = useDebounceFn(() => {
  setOptionChart();
}, 500);

watch(
  () => useConst().value.activeSidebar,
  async (val) => {
    setTimeout(() => {
      debouncedSetOption();
    }, 300);
  }
);
const debouncedSetOption = useDebounceFn(
  () => {
    resizeChart();
  },
  500,
  { maxWait: 500 }
);

watch(
  () => props.newValue,
  async (val) => {
    setNewValue();
  }
);

onMounted(async () => {
  loading.value = true;
  await initChart();
  myChart &&
    myChart.on('click', function (params: any) {
      emit('handleClick', params);
    });
  window.addEventListener('resize', () => resizeChart());
});

const initChart = async () => {
  const chartDom = document.getElementById(`chart-${props?.id}`) || '';
  if (!chartDom) return;
  myChart = echarts.init(chartDom);
  await setOptionChart();
};
function setOptionChart() {
  if (!myChart || !props.option || !Object.keys(props.option).length) return (loading.value = false);
  let option = { ...props.option } as { [key: string]: any };
  if (!option) {
    loading.value = false;
    return;
  }
  if (
    option.yAxis &&
    (!option.yAxis.splitLine || !option.yAxis.splitLine.lineStyle || !option.yAxis.splitLine.lineStyle.color)
  ) {
    option.yAxis.splitLine = {
      lineStyle: {
        color: '#66666612'
      }
    };
  }
  myChart.setOption(option);
  loading.value = false;
}
async function resizeChart() {
  if (!myChart) return;
  myChart.resize();
}
const setNewValue = useDebounceFn(
  () => {
    if (!myChart || !props.option || !Object.keys(props.option).length) return;
    myChart.setOption(props.newValue, {
      replaceMerge: props.replaceMerge || []
    });
  },
  500,
  { maxWait: 500 }
);
</script>

<style lang="scss" scoped>
.loading-chart {
  color: var(--text);
  background-color: var(--background);
  animation: 0.5s fadeIn;
  animation-fill-mode: forwards;
  visibility: hidden;
}
.btn-month {
  .box-radio {
    justify-content: center;
  }
}

@keyframes fadeIn {
  99% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
}
</style>
