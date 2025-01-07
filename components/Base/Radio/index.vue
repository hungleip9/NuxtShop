<template>
	<div :class="`box-radio flex ${radioNgang ? 'flex-col w-full' : 'items-center justify-center'} ${customClass}`">
    <template v-if="useSwiper">
      <BaseSwiper>
        <SwiperSlide
        v-for="(item, index) in optionMap"
        :key="`${item.value}-${index}`"
        class="radio-item"
        :class="getClass(item.value)"
        @click="updateValue(item)">
          <span>{{item.label}}</span>
          <div v-if="item.permission && !hasRule(item.permission) && !radioNgang">
            <Icon icon="material-symbols-light:lock" width="20" height="20" />
          </div>
          <div v-if="radioNgang" class="ml-1">
            <div v-if="item.permission && !hasRule(item.permission)">
              <Icon icon="material-symbols-light:lock" width="20" height="20" />
            </div>
            <div v-else class="border border-gray-500 rounded-3xl w-[20px] h-[20px]" :class="getClassActiveIcon(item.value)"></div>
          </div>
        </SwiperSlide>
      </BaseSwiper>
    </template>
    <template v-else>
      <div v-for="(item, index) in optionMap"
        :key="`${item.value}-${index}`"
        class="radio-item flex flex-row items-center justify-between"
        :class="getClass(item.value)" @click="updateValue(item)">
          <span>{{item.label}}</span><div v-if="item.permission && !hasRule(item.permission) && !radioNgang">
            <Icon icon="material-symbols-light:lock" width="20" height="20" />
          </div>
          <div v-if="radioNgang" class="ml-1">
            <div v-if="item.permission && !hasRule(item.permission)">
              <Icon icon="material-symbols-light:lock" width="20" height="20" />
            </div>
            <div v-else class="border border-gray-500 rounded-3xl w-[20px] h-[20px]" :class="getClassActiveIcon(item.value)"></div>
          </div>
      </div>
    </template>
	</div>
  <BaseLockPopupLocked :rule="permission" />
</template>

<script lang="ts" setup>
const props = defineProps({
  option: {
    type: Array,
    required: true
  },
  modelValue: {
    type: null,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  },
  radioNgang: {
    type: Boolean,
    default: false
  },
  useSwiper: {
    type: Boolean,
    default: false
  },
  unset: {
    type: Boolean,
    default: false
  }
});
  const emit = defineEmits(['update:modelValue', 'change'])
  const permission = ref<string>('')
  const optionMap = ref<any>([])
  watch(()=> props.option, (val) => {
    optionMap.value = [...props.option]
  })
  onMounted (() => {
    optionMap.value = [...props.option]
  })
  function getClass(str: string) {
    if (props.modelValue == str && !props.radioNgang) {
      return "active";
    } else {
      return "";
    }
  }
  function getClassActiveIcon (str: string) {
    if (props.modelValue == str && props.radioNgang) {
      return "activeIcon";
    } else {
      return "";
    }
  }
  async function updateValue (item: any) {
    if (!item) return
    const val = item.value
    if (item.permission && !hasRule(item.permission)) {
      if (!useAuth().value.isAuthenticated) {
        _openModalLogin('login')
      } else {
        permission.value = item.permission
        await nextTick()
        _openModal(`popup-upgred-user-${item.permission}`)
      }
    } else { // có quyền
      if (props.unset && val === props.modelValue) { // mở unset
        emit('update:modelValue', null)
        emit('change', val, item)
      } else if (val !== props.modelValue) { //không mở unset
        emit('update:modelValue', val)
        emit('change', val, item)
      }
    }
  }
</script>

<style lang="scss" scoped>
.box-radio {
  .radio-item {
    cursor: pointer;
    padding: 0.2rem 0.75rem;
    border-radius: 12px;
    margin-right: 2px;
    &:hover {
      color: var(--text-weight);
      background-color: var(--border-color);
    }
  }
  .active {
    color: var(--text-weight);
    background-color: var(--border-color);
  }
  .activeIcon {
    background-color: var(--text-primary);
    border-color: var(--text-primary);
  }
}
.nganh-suc-manh {
    .radio-item {
      &:hover {
        color: #fff;
        background-color: var(--text-primary);
      }
    }
    .active {
      color: #fff;
      background-color: var(--text-primary);
    } 
}
.type-exchange {
  .radio-item {
    min-width: 60px;
    text-align: center;
    justify-content: center;
  }
}
</style>
