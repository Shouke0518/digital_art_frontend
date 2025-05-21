<script setup>
import { ref } from 'vue';
import apiClient from '../api/api';

const file = ref(null);
const previewUrl = ref(null);
const result = ref(null);

const onFileChange = (event) => {
  file.value = event.target.files[0];
  previewUrl.value = file.value ? URL.createObjectURL(file.value) : null;
};

const uploadImage = async () => {
  if (!file.value) return;
  const formData = new FormData();
  formData.append('image', file.value);
  try {
    const response = await apiClient.post('detect', formData);
    result.value = response.data.message;
  } catch (error) {
    result.value = '偵測失敗，請重試';
    console.error(error);
  }
};
</script>

<template>
  <div>
    <input type="file" accept="image/*" @change="onFileChange" />
    <img v-if="previewUrl" :src="previewUrl" style="max-height: 300px" />
    <button :disabled="!file" @click="uploadImage">偵測</button>
    <p v-if="result">{{ result }}</p>
  </div>
</template>