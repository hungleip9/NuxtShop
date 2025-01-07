<template>
  <div
    :id="`locked-upgred-user-${props.rule}`"
    @click="!checkRule ? showPopupUpgredUser() : ''"
    class="box-locked cursor-pointer flex flex-row items-center relative"
    :class="classObject"
  >
    <div :class="!checkRule ? 'locked-user' : ''">
      <slot></slot>
    </div>
    <BaseIcon
      v-if="!checkRule"
      :class="absolute ? 'absolute right-0' : ''"
      size="20"
      icon="material-symbols-light:lock"
    />
    <BaseLockPopupLocked :rule="rule" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  rule: {
    type: String,
    default: ''
  },
  hidenFlex: {
    type: Boolean,
    default: false
  },
  absolute: {
    type: Boolean,
    default: false
  }
});
const checkRule = ref(true);
const classObject = ref({
  'readonly-text': true,
  'justify-center': true
});
watch(
  () => useGlobal().value.Permission,
  async () => {
    await getCheckRule();
    getClassObject();
  }
);
onMounted(async () => {
  await getCheckRule();
  getClassObject();
});
function getCheckRule() {
  if (!props.rule) {
    checkRule.value = true;
    return;
  }
  if (props.rule == 'yeu_thich') {
    checkRule.value = useAuth().value.isAuthenticated;
    return;
  }
  checkRule.value = hasRule(props.rule);
}
function getClassObject() {
  classObject.value = {
    'readonly-text': checkRule.value == false,
    'justify-center': props.hidenFlex == false
  };
}
function showPopupUpgredUser() {
  if (!props.rule) return;
  if (!useAuth().value.isAuthenticated) {
    _openModalLogin('login');
  } else {
    _openModal(`popup-upgred-user-${props.rule}`);
  }
}
</script>

<style lang="scss" scoped>
.box-locked {
  .locked-user {
    pointer-events: none;
  }
}
</style>
