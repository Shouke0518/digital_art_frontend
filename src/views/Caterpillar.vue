<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="text-h3 text-center justify-center py-6 primary--text custom-font">
            霹靂毛蟲計數挑戰
          </v-card-title>
          
          <v-card-text class="text-center">
            <v-img
              :src="caterpillarImage"
              alt="霹靂毛蟲"
              max-width="800"
              class="mx-auto"
              contain
              eager
            ></v-img>

            <v-card-text class="text-h6 mt-6 text--primary custom-font">
              請數一數這隻霹靂毛蟲有幾隻腳？
            </v-card-text>

            <v-row justify="center" class="mt-4">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="userAnswer"
                  type="number"
                  label="請輸入數字"
                  outlined
                  dense
                  hide-details
                  class="mb-4 custom-font"
                  @keyup.enter="checkAnswer"
                  :rules="[v => !!v || '請輸入數字']"
                  color="primary"
                ></v-text-field>

                <v-btn
                  block
                  color="secondary"
                  class="white--text custom-font"
                  :disabled="!userAnswer"
                  @click="checkAnswer"
                  elevation="2"
                >
                  確認答案
                </v-btn>
              </v-col>
            </v-row>

            <v-alert
              v-if="showResult"
              :type="isCorrect ? 'success' : 'error'"
              class="mt-6 mx-auto custom-font"
              max-width="400"
              dense
              text
            >
              {{ resultMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import caterpillarImage from '@/assets/caterpillar.png'

const userAnswer = ref('')
const correctAnswer = 16 // 假設正確答案是16隻腳
const showResult = ref(false)
const isCorrect = ref(false)
const resultMessage = ref('')

const checkAnswer = () => {
  if (!userAnswer.value) return
  
  showResult.value = true
  isCorrect.value = parseInt(userAnswer.value) === correctAnswer
  
  if (isCorrect.value) {
    resultMessage.value = '恭喜你答對了！🎉'
  } else {
    resultMessage.value = '再試一次吧！💪'
  }
}
</script>

<style>
/* 全局樣式 */
:root {
  --custom-font: 'BoutiqueBitmap9x9', monospace;
}

.custom-font {
  font-family: var(--custom-font) !important;
}

/* Vuetify 樣式覆蓋 */
.v-application .primary--text {
  color: #464B9D !important;
}

.v-application .secondary {
  background-color: #F5A518 !important;
  border-color: #F5A518 !important;
}

.v-application .text--primary {
  color: #231815 !important;
}

/* 確保按鈕文字也使用自定義字體 */
.v-btn {
  font-family: var(--custom-font) !important;
}

/* 確保輸入框文字也使用自定義字體 */
.v-text-field input {
  font-family: var(--custom-font) !important;
}

/* 確保提示文字也使用自定義字體 */
.v-alert {
  font-family: var(--custom-font) !important;
}
</style>
