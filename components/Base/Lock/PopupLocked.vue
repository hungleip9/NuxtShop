<template>
  <BasePopup :name="`popup-upgred-user-${rule}`"
    :footer="true"
    :labelBtnSubmit="'Nâng cấp'"
    :title="'Nâng cấp tài khoản'"
    :hideBack="true"
    @submit="handleNangCap">
    <div>Để sử dụng tính năng này vui lòng nâng cấp lên phiên bản cao hơn.</div>
  </BasePopup>
</template>

<script lang="ts" setup>
const props = defineProps({
  rule: {
    type: String,
    default: ''
  }
})
async function handleNangCap () {
  await _closeModal(`popup-upgred-user-${props.rule}`)
  await nextTick()
  await _navigateProduction('nang-cap-tai-khoan')
}
</script>