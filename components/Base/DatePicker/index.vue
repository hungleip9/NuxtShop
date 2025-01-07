<template>
  <div class="w-full h-full">
    <a-config-provider :locale="vi">
      <a-date-picker v-model:value="time" :format="format" @change="change"/>
    </a-config-provider>
  </div>
</template>
<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs';
import vi from 'ant-design-vue/es/locale/vi_VN';
import 'dayjs/locale/vi';

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: [Date, String, Object],
		required: true
  },
})
const format = ['DD/MM/YYYY']
const time = ref()
watch(() => props.modelValue, (val) => {
  if (props.modelValue) {
    time.value = convertTime(props.modelValue)
  }
})
onMounted(() => {
  if (props.modelValue) {
    time.value = convertTime(props.modelValue)
    emit('update:modelValue', time.value)
  }
})
function convertTime (time: any) {
  if (!time) return
  return dayjs(time, format)
}
function change () {
  emit('update:modelValue', time.value)
  emit('change')
}
</script>

