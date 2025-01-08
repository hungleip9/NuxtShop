<template>
  <div :class="`box-radio flex ${radioNgang ? 'flex-col w-full' : 'items-center justify-center'} align-center`" :style="styleCustom">
    <template v-if="useSwiper">
      <BaseSwiper>
        <SwiperSlide v-for="(item, index) in optionMap"
          :key="`${item.value}-${index}`"
          class="radio-item swiper-slide"
          :class="getClass(item.value)"
          @click="updateValue(item)">
            <span>{{ item.label }}</span>
            <div v-if="radioNgang" class="ml-1">
              <div class="border border-gray-500 rounded-3xl w-[20px] h-[20px]" :class="getClassActiveIcon(item.value)"></div>
            </div>
        </SwiperSlide>
      </BaseSwiper>
    </template>
    <template v-else>
      <div v-for="(item, index) in optionMap"
        :key="`${item.value}-${index}`"
        class="radio-item"
        :class="getClass(item.value)"
        @click="updateValue(item)">
          <div class="whitespace-nowrap">{{ item.label }}</div>
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
interface Option {label: string, value: any, permission?: string}
const props = defineProps({
  option: {
    type: Array as () => Option[] | any[],
    required: true
  },
  styleCustom: {
    type: String,
    default: ''
  },
  modelValue: {
    type: null,
    default: () => ([]),
    required: true
  },
  useSwiper: {
    type: Boolean,
    default: false
  },
  radioNgang: {
    type: Boolean,
    default: false
  },
  fakeRadio: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue', 'change'])
const permission = ref('')
const optionMap = ref<Option[]>([])
watch(() => props.option, () => {
  optionMap.value = props.option && props.option.length ? [...props.option] : []
})
onMounted(() => {
  optionMap.value = props.option && props.option.length ? [...props.option] : []
})
function getClass(str: string) {
  if (props.modelValue &&
    props.modelValue.length &&
    str &&
    props.modelValue.includes(str) &&
    !props.radioNgang
  ) {
    return "filter-active";
  } else {
    return "";
  }
}
function getClassActiveIcon(str: string) {
  if (props.modelValue &&
    props.modelValue.length &&
    str &&
    props.modelValue.includes(str) &&
    props.radioNgang
  ) {
    return "activeIcon";
  } else {
    return "";
  }
}
async function updateValue(item: Option) {
  if (!item) return
  const val = item.value
  if (item.permission && !hasRule(item.permission)) {
  } else {
    let data = props.modelValue && props.modelValue.length ? [...props.modelValue] : []
    if (props.fakeRadio) {
      if (data.includes(val)) {
        data = []
      } else {
        data = [val]
      }
    } else {
      if (data.includes(val)) {
        data = data.filter((e: any) => e !== val)
      } else {
        data.push(val)
      }
    }
    emit('update:modelValue', data)
    emit('change', val)
  }
}
</script>

<style lang="scss" scoped>
.box-radio {
  .radio-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
    padding: 0.2rem 0.75rem;
    border-radius: 12px;
    margin-right: 2px;

    &:hover {
      color: var(--text-weight);
      background-color: var(--border-color);
    }
  }

  .filter-active {
    color: #fff;
    background-color: var(--text-primary);
  }
  .activeIcon {
    background-color: var(--text-primary);
    border-color: var(--text-primary);
  }
}</style>
