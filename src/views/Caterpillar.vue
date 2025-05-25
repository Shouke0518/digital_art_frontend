<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-title class="text-h3 text-center mb-4">
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

            <v-card-text class="text-h6 mt-6">
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
                  class="mb-4"
                  @keyup.enter="checkAnswer"
                  :rules="[v => !!v || '請輸入數字']"
                  color="primary"
                ></v-text-field>

                <v-btn
                  block
                  color="primary"
                  class="white--text"
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
              class="mt-6 mx-auto"
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
const correctAnswer = 32 // 假設正確答案是16隻腳
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
