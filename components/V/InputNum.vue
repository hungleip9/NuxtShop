<template>
  <a-input-number v-model:value="valueInput"
    :placeholder="placeholder"
    :size="size"
    :min="min"
    :max="max"
    :step="step"
    :onChange="onChange"
    @keypress="onlyNumber($event)">
      <template #prefix>
        <slot></slot>
      </template>
  </a-input-number>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: null
  },
  decimal: {
    type: Boolean
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: null,
    default: ''
  },
  min: {
    type: Number,
    default: ''
  },
  max: {
    type: Number,
    default: ''
  },
  step: {
    type: Number,
    default: '100'
  }
});
const valueInput = ref(0)
watch(() => props.modelValue, (val) => {
  if (valueInput.value == props.modelValue) return
  valueInput.value = props.modelValue
})
onMounted(() => {
  valueInput.value = props.modelValue
})
const emit = defineEmits(['update:modelValue'])
function onlyNumber (event: any) {
  let keyCode = event.keyCode ? event.keyCode : event.which
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && event.code != 'Enter') {
    event.preventDefault()
  }
  if (event.key === '.' && !props.decimal) {
    event.preventDefault()
  }
}
function onChange(event: any) {
  emit('update:modelValue', event)
};
</script>