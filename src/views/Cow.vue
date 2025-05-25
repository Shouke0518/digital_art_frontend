<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-title class="text-h3 text-center mb-4">
            吹牛逼呢!!!<br>
            你吹牛逼呢!!!
          </v-card-title>
          
          <v-card-text class="text-center">
            <v-img
              :src="cowImage"
              class="mb-6"
              max-height="400"
              contain
            ></v-img>

            <v-card-text class="text-h6 mt-6">
              請找到牛牛並提交你與牛牛的合照<br>
              請注意! 每人只有5次機會
            </v-card-text>

            <v-card-text class="text-subtitle-1 mb-4">
              剩餘偵測次數：{{ remainingDetections }}
            </v-card-text>

            <v-row justify="center" class="mt-4">
              <v-col cols="12" sm="6" md="4">
                <v-file-input
                  v-model="file"
                  accept="image/*"
                  label="選擇圖片"
                  prepend-icon="mdi-camera"
                  @change="onFileChange"
                  class="mb-4"
                  outlined
                  dense
                  hide-details
                  :disabled="remainingDetections <= 0"
                ></v-file-input>

                <v-img
                  v-if="previewUrl"
                  :src="previewUrl"
                  width="100%"
                  class="mx-auto mb-4"
                  contain
                ></v-img>

                <v-btn
                  block
                  color="primary"
                  class="white--text"
                  :disabled="!file || remainingDetections <= 0"
                  @click="uploadImage"
                  elevation="2"
                >
                  開始偵測
                </v-btn>
              </v-col>
            </v-row>

            <v-snackbar
              v-model="snackbar"
              :color="snackbarColor"
              timeout="3000"
              class="mt-6 mx-auto"
              max-width="400"
              dense
              text
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api/api';
import cowImage from '@/assets/images/Cow.png';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const file = ref(null);
const previewUrl = ref(null);
const result = ref(null);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('error');
const detectedLabels = ref([]);
const detectedObjects = ref([]);
const remainingDetections = ref(5);

// 定義關鍵字
const humanKeywords = ['person', 'human', 'man', 'woman', 'people', 'animal'];
const cowKeywords = [
    // 基本名稱
    'cow', 'cattle', 'bull', 'calf', 'bovine', 'bovinae',
    // 品種
    'holstein', 'angus', 'jersey', 'brahman', 'hereford',
    // 狀態和特徵
    'dairy cow', 'beef cattle', 'heifer', 'steer', 'ox',
    'cowhide', 'cowbell',
    // 動作和行為
    'grazing', 'mooing', 'milking'
];

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    previewUrl.value = URL.createObjectURL(selectedFile);
  }
};

const checkDetection = (labels, objects) => {
  // 合併兩個陣列並轉換為小寫
  const allDetections = [...labels, ...objects].map(item => item.toLowerCase());
  
  // 檢查是否包含人和牛
  const hasHuman = allDetections.some(detection => humanKeywords.includes(detection));
  const hasCow = allDetections.some(detection => cowKeywords.includes(detection));
  
  return hasHuman && hasCow;
};

const fetchRemainingDetections = async () => {
  try {
    const response = await apiClient.get('/animal/remaining', {
      params: {
        userId: userStore.userId,
        animalType: 'cow'
      }
    });
    remainingDetections.value = response.data.remaining;
  } catch (error) {
    console.error('獲取剩餘次數失敗:', error);
  }
};

const uploadImage = async () => {
  if (!file.value) return;
  
  const formData = new FormData();
  formData.append('image', file.value);
  formData.append('userId', userStore.userId);
  formData.append('animalType', 'cow');
  
  try {
    const response = await apiClient.post('detect', formData);
    detectedLabels.value = response.data.labels || [];
    detectedObjects.value = response.data.objects || [];
    remainingDetections.value = response.data.remaining;
    
    if (checkDetection(detectedLabels.value, detectedObjects.value)) {
      // 獲取標題
      const title = document.querySelector('.v-card-title').textContent
      // 直接跳轉到完成畫面
      router.push({
        path: '/task-completion',
        query: { title }
      })
    } else {
      snackbarText.value = '檢測未通過：圖片中必須同時包含人和牛';
      snackbarColor.value = 'error';
      snackbar.value = true;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      snackbarText.value = error.response.data.error;
    } else {
      snackbarText.value = '偵測失敗，請重試';
    }
    snackbarColor.value = 'error';
    snackbar.value = true;
    console.error(error);
  }
};

onMounted(() => {
  fetchRemainingDetections();
});
</script>

<style scoped>
:deep(h1),
:deep(h2),
:deep(h3),
:deep(p),
:deep(.v-card-text),
:deep(.v-card-title),
:deep(.v-btn),
:deep(.v-alert),
:deep(.v-snackbar__content),
:deep(.v-text-field),
:deep(.v-text-field__input),
:deep(.v-field__input),
:deep(.v-field__outline),
:deep(.v-field__outline__start),
:deep(.v-field__outline__end),
:deep(.v-field__outline__notch),
:deep(.v-field__outline__notch__leading),
:deep(.v-field__outline__notch__trailing),
:deep(.v-field__outline__notch__label) {
  font-family: "BoutiqueBitmap9x9";
}

:deep(.v-snackbar__content) {
  text-align: center;
  justify-content: center;
}
</style>