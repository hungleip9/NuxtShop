<template>
  <div v-if="text" class="text-tool-tip">
    <div class="text-tool-tip-content" :style="`-webkit-line-clamp: ${line};width:${width}px`">{{text}}</div>
    <span class="tool-tip-text">{{textShow || text}}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  textShow: {
    type: String,
    default: ''
  },
  line: {
    type: String,
    default: '2'
  },
  width: {
    type: String,
    default: '100'
  }
})
</script>

<style lang="scss" scoped>
 .text-tool-tip {
  position: relative;
  display: inline-block;
 }
.text-tool-tip-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.tool-tip-text {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 117%;
  left: -5%;
  margin-left: -60px;
}
.tool-tip-text:before {
  content: "";
  position: absolute;
  top: -14px;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.text-tool-tip:hover .tool-tip-text {
  visibility: visible;
}
</style>
