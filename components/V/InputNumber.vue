<template>
  <a-input v-model:value="valueInput"
    :placeholder="placeholder"
    :size="size"
    @keypress="onlyNumber($event)"
    @input="updateValue">
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
  size: {
    type: null,
    default: ''
  }
});
const valueInput = ref('')
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
function updateValue (event: any) {
  emit('update:modelValue', event.target.value)
}
</script>