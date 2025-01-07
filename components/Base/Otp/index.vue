<template>
  <div class="otp-inputs">
    <input
      v-for="index in length"
      :key="index"
      type="text"
      maxlength="1"
      @input="onInput(index, $event)"
      @keydown="onKeyDown(index, $event)"
      @paste="onPaste"
      onclick="this.select()"
      :autocomplete="'off'"
      :autofocus="index === 1"
      ref="otpInputs"
      class="otp-field"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: null,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'passlength']);

const otpInputs = ref<any[]>([]);

const onInput = (index: any, event: any) => {
  const char = event.data || '';
  if (!char.match(/\d/)) {
    event.target.value = '';
    emitOtp();
    return;
  }
  if (index < props.length) {
    otpInputs.value[index]?.focus();
    otpInputs.value[index]?.select();
  }
  emitOtp();
};

const onKeyDown = (index: any, event: any) => {
  if (event.key === 'Backspace' && index > 0 && !otpInputs.value[index - 1].value) {
    otpInputs.value[index-1].value = ''
    otpInputs.value[index-2]?.focus();
  } else if (event.key === 'ArrowLeft'){
    setTimeout(() => {
      otpInputs.value[index-2]?.select();
      if (index==1) otpInputs.value[0]?.select();
    }, 10);
  } else if (event.key === 'ArrowRight'){
    setTimeout(() => {
      otpInputs.value[index]?.select();
      if (index==props.length) otpInputs.value[index-1]?.select();
    }, 10);
  }
};

const onPaste = async (event: any) => {
  event.preventDefault();
  // @ts-ignore
  const text = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
  const otpArray = text.split('').slice(0, props.length);
  otpArray.forEach((char: any, index: number) => {
    otpInputs.value[index].value = char;
    if (index < props.length - 1) {
      otpInputs.value[index + 1].focus();
    }
  });
  emitOtp();
};

function emitOtp () {
  const otp = otpInputs.value.map(input => input.value).join('');
  emit('update:modelValue', otp);
  if (otp && otp.length == props.length) {
    emit('passlength')
  }
};

</script>

<style scoped lang="scss">
.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.otp-field {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  color: var(--text);
  text-align: center;
  font-size: 20px;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &.valid {
    border-color: #28a745;
  }
  
  &.invalid {
    border-color: #dc3545;
  }
}
</style>

