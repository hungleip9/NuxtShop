<template>
  <a-auto-complete
    v-model:value="valueMap"
    :options="optionsMap"
    style="width: 100%"
    :placeholder="placeholder"
    @change="change"
    @select="onSelect"
    @search="onSearch"
  />
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'select', 'search', 'change'])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
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
const valueMap = ref<any>('')
const optionsMap = ref<any>([])
watch(() => props.modelValue, (val) => {
  if (valueMap.value == props.modelValue) return
  valueMap.value = props.modelValue
})
watch(() => props.options, (val) => {
  optionsMap.value = [...props.options]
})
onMounted(() => {
  valueMap.value = props.modelValue
  optionsMap.value = [...props.options]
})
function onSelect (data: any) {
  emit('select', data)
}
function onSearch (data: any) {
  emit('search', data)
}
function change () {
  emit('update:modelValue', valueMap.value)
  emit('change')
}
</script>

