<template>
  <a-input
  v-model:value="valueInput"
  :placeholder="placeholder"
  :type="type"
  autocomplete="off"
  :autofocus="autofocus"
  :maxLength='maxLength'
  :disabled="disabled"
  :allowClear="allowclear"
  @change="change">
    <template #prefix>
      <slot></slot>
    </template>
  </a-input>
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
  maxLength: {
    type: null,
    default: null
  },
  type: {
    type: null,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  allowclear: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  trimText: {
    type: Boolean,
    default: false
  }
  
});

const valueInput = ref<any>(null)
watch(() => props.modelValue, (val) => {
  if (valueInput.value == props.modelValue) return
  valueInput.value = props.modelValue
})
onMounted(() => {
  valueInput.value = props.modelValue
})

const emit = defineEmits(['update:modelValue', 'change'])
function change () {
  let val = valueInput.value
  if (props.trimText) {
    val = val.trim()
  }
  emit('update:modelValue', val)
  emit('change', val)
}
</script>