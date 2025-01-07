<template>
  <draggable class="dragArea list-group"
    :list="modelValue"
    @change="updateValue">
    <slot />
  </draggable>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Array,
		required: true
  },
	keylocal: {
		type: String
	}
});
const emit = defineEmits(['update:modelValue', 'change'])
function updateValue (event: any) {
  emit('change', props.modelValue)
	if (!props.keylocal) return
	keyLocalStorage({type: 'SET', key: props.keylocal, value: props.modelValue})
}
</script>