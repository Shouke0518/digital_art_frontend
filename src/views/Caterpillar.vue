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
              class="mb-6"
              max-height="400"
              contain
            ></v-img>

            <v-card-text class="text-h6 mt-6">
              請找出台科的公共藝術裝置<br>
              《 霹靂毛蟲 》<br>
              並數一數總共有幾隻腳?
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import caterpillarImage from '@/assets/images/Caterpillar.png'

const router = useRouter()
const userAnswer = ref('')
const correctAnswer = 32 // 假設正確答案是16隻腳
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('error')

const checkAnswer = () => {
  if (!userAnswer.value) return
  
  if (parseInt(userAnswer.value) === correctAnswer) {
    // 獲取標題
    const title = document.querySelector('.v-card-title').textContent
    // 直接跳轉到完成畫面
    router.push({
      path: '/task-completion',
      query: { title }
    })
  } else {
    snackbarText.value = '再試一次吧！💪'
    snackbarColor.value = 'error'
    snackbar.value = true
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
