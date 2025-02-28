<template>
  <a-input-password
  v-model:value="valueInput"
  :placeholder="placeholder"
  :type="type"
  :size="size"
  autocomplete="off"
  :visibilityToggle="visibilityToggle"
  @change="change">
    <template #prefix>
      <slot></slot>
    </template>
  </a-input-password>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: null,
    default: ''
  },
  size: {
    type: null,
    default: ''
  },
  visibilityToggle: {
    type: Boolean,
    default: true
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

const emit = defineEmits(['update:modelValue', 'change'])
function change () {
  emit('update:modelValue', valueInput.value)
  emit('change', valueInput.value)
}
</script>