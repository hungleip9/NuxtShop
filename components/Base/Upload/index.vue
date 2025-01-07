<template>
  <div>
    <ImageCropUpload
      :fieldName="'file'"
      :cropBoxWidth="200"
      :cropBoxHeight="200"
      :autoCropArea="1.0"
      :langType="'vi'"
      :noSquare="true"
      @crop-success="cropSuccess"
    />
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['imageDataUrl'])

const cropSuccess = (imageDataUrl: any, field: any ) => {
  emit('imageDataUrl', imageDataUrl )
  _closeModal(`upload-detail`)
}

</script>