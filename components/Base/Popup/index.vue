<template>
	<a-modal :id="name"
		v-model:open="visible"
		:class="classProp"
		:closable="closable"
		:centered="true"
		:mask="true"
		:maskClosable="clickToClose"
		:zIndex="zIndex"
		:style="{ width: width, height: height }"
		@ok="submit"
		@cancel="emit('close')">
		<template #title>
			<template v-if="title">
				<div class="flex flex-row items-center" ref="modalTitleRef" style="width: 100%; cursor: move">
					<template v-if="!customHeader">
						<div class="font-bold h-full mr-4">{{ title }}</div>
						<div v-if="exchange" class="text-sm ml-2 italic h-full">{{ exchange }}</div>
					</template>
					<slot v-else name="header">
					</slot>
				</div>
			</template>
		</template>
		<template #modalRender="{ originVNode }">
			<div :style="transformStyle">
				<component :is="originVNode" />
			</div>
		</template>
		<slot></slot>
		<template #footer>
			<template v-if="footer">
				<div class="flex flex-row items-center justify-end pt-4">
					<a-button v-if="footerClose"
						type="text"
						@click="_closeModal(name)">
						Đóng
					</a-button>
					<a-button
						v-if="!hideBtnSubmit"
						:disabled="disabledBtnSubmit"
						type="primary" 
						@click="submit()">
						{{ labelBtnSubmit }}
					</a-button>
				</div>
			</template>
		</template>
	</a-modal>
</template>
<script lang="ts" setup>
import { useDraggable } from '@vueuse/core';
const { $listen } = useNuxtApp()
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		default: "",
	},
  exchange: {
    type: String,
		default: "",
  },
	width: {
		type: String,
		default: "",
	},
	height: {
		type: String,
		default: "",
	},
	classProp: {
		type: String,
		default: "",
	},
	clickToClose: {
		type: Boolean,
		default: true,
	},
	footer: {
		type: Boolean,
		default: false,
	},
	labelBtnSubmit: {
		type: String,
		default: 'Gửi'
	},
	disabledBtnSubmit: {
		type: Boolean,
		default: false,
	},
  hideBtnSubmit: {
		type: Boolean,
		default: false,
	},
  closable: {
    type: Boolean,
		default: true,
  },
  showHeader: {
    type: Boolean,
		default: true,
  },
  footerClose: {
    type: Boolean,
		default: true,
  },
	customHeader: {
		type: Boolean,
		default: false,
	},
	zIndex: {
		type: Number,
		default: 1000,
	}
})
const emit = defineEmits(['clear', 'submit', 'open', 'close'])
const visible = ref(false)
watch(visible, (val) => {
	if (!val) {
		emit('clear')
		emit('close')
	}
});
// draggable
const modalTitleRef = ref();
const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
const { x, y, isDragging } = useDraggable(modalTitleRef);
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value ? modalTitleRef.value.getBoundingClientRect() : 0;
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});
watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});
const transformStyle = computed(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
// end draggable

onMounted(() => {
	$listen('openModal', (popupName: any) => {
		onOpen(popupName)
	})
	$listen('closeModal', (popupName: any) => {
		onClose(popupName)
	})
})
function submit () {
	emit('submit')
}
function onOpen (popupName: string) {
	if (popupName != props.name) return
	visible.value = true;
	emit('open')
}
function onClose (popupName: string) {
	if (popupName != props.name) return
	visible.value = false;
}
</script>