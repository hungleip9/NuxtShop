import ImageCropUpload from 'vue-image-crop-upload';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ImageCropUpload', ImageCropUpload);
});
