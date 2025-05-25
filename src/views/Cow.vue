<script setup>
import { ref } from 'vue';
import apiClient from '../api/api';

const file = ref(null);
const previewUrl = ref(null);
const result = ref(null);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');
const detectedObjects = ref([]);

// 定義關鍵字
const humanKeywords = ['person', 'human', 'man', 'woman', 'people'];
const cowKeywords = ['cow', 'cattle', 'bull', 'calf', 'bovine'];

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    previewUrl.value = URL.createObjectURL(selectedFile);
  }
};

const checkObjects = (objects) => {
  const hasHuman = objects.some(obj => humanKeywords.includes(obj.toLowerCase()));
  const hasCow = objects.some(obj => cowKeywords.includes(obj.toLowerCase()));
  return hasHuman && hasCow;
};

const uploadImage = async () => {
  if (!file.value) return;
  
  const formData = new FormData();
  formData.append('image', file.value);
  
  try {
    const response = await apiClient.post('detect', formData);
    detectedObjects.value = response.data.objects || [];
    
    if (checkObjects(detectedObjects.value)) {
      console.log('檢測通過，發送結果給後端');
      snackbarText.value = '檢測通過！圖片中同時包含人和牛。';
      snackbarColor.value = 'success';
    } else {
      snackbarText.value = '檢測未通過：圖片中必須同時包含人和牛。';
      snackbarColor.value = 'error';
    }
    snackbar.value = true;
  } catch (error) {
    snackbarText.value = '偵測失敗，請重試';
    snackbarColor.value = 'error';
    snackbar.value = true;
    console.error(error);
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            圖片檢測
          </v-card-title>
          
          <v-file-input
            v-model="file"
            accept="image/*"
            label="選擇圖片"
            prepend-icon="mdi-camera"
            @change="onFileChange"
            class="mb-4"
          ></v-file-input>

          <v-img
            v-if="previewUrl"
            :src="previewUrl"
            width="400"
            class="mx-auto mb-4"
            contain
          ></v-img>

          <v-btn
            color="primary"
            block
            :disabled="!file"
            @click="uploadImage"
            class="mb-4"
          >
            開始檢測
          </v-btn>

          <v-card-text v-if="detectedObjects.length > 0">
            <div class="text-h6 mb-2">偵測到的物件：</div>
            <v-chip-group>
              <v-chip
                v-for="obj in detectedObjects"
                :key="obj"
                class="ma-1"
                :color="checkObjects([obj]) ? 'success' : 'grey'"
              >
                {{ obj }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          關閉
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>