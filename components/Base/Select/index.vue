<template>
  <a-select
    v-model:value="valueMap"
    :placeholder="placeholder"
    style="width: 100%"
    :options="optionsMap"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: null,
  },
  options: {
    type: Array, //[{label: '1', value: 1}]
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const valueMap = ref<any>(null);
const optionsMap = ref<any[]>([])
watch(() => props.options, (val) => {
  optionsMap.value = [...props.options]
})
watch(() => props.modelValue, (val) => {
  if (valueMap.value == props.modelValue) return
  valueMap.value = props.modelValue
})
onMounted(() => {
  valueMap.value = props.modelValue
  optionsMap.value = [...props.options]
})
async function handleChange (value: any) {
  await emit('update:modelValue', value)
  await emit('change')
};
</script>

