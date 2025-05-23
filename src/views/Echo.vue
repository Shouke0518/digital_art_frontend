<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6" elevation="0">
          <h1 class="text-h3 text-center mb-6">《陌聲顯影機》</h1>
          
          <v-img
            :src="echoImage"
            class="mb-6"
            max-height="400"
            cover
          ></v-img>

          <v-card-text class="text-body-1 mb-6">
            在校園中，我們每日與無數陌生人擦肩而過，卻難以產生真實連結。《陌聲顯影機》透過一種「聲音先行、影像漸現」的互動設計，讓兩位參與者在不見外貌、不知姓名的前提下，以語音交流建立信任。隨著對談時間延長，對方的影像逐步清晰，最終短暫揭露真實樣貌，帶來微妙的人際轉折與情感連結。我們希望提供一個溫柔、安全、去除標籤的溝通場域，邀請大家重新思考何謂「認識」與「連結」。
          </v-card-text>

          <v-card-text>
            <h2 class=" text-left">《陌聲顯影機》的顏色</h2>
            <h2 class=" text-left mb-4">是哪兩種呢？：</h2>
            <v-form @submit.prevent="submitAnswer">
              <v-text-field
                v-model="answer"
                label="回答我! Look at my eyes"
                variant="outlined"
              ></v-text-field>
              <v-btn
                color="primary"
                type="submit"
                block
              >
                提交答案
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import echoImage from '@/assets/images/Echo.png'
const answer = ref('')
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
})

const submitAnswer = () => {
  // 模擬發送到後端
  console.log('提交答案:', answer.value)
  
  // 檢查答案是否包含"紅"和"藍"
  const hasRed = answer.value.includes('紅')
  const hasBlue = answer.value.includes('藍')
  
  if (hasRed && hasBlue) {
    snackbar.color = 'success'
    snackbar.text = '答對了！'
  } else {
    snackbar.color = 'error'
    snackbar.text = '再想想看！'
  }
  
  snackbar.show = true
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

:deep(h1) {
  font-family: "BoutiqueBitmap9x9";
}

:deep(.v-card-text) {
  font-family: "BoutiqueBitmap9x9";
}

:deep(.v-snackbar__content) {
  text-align: center;
  justify-content: center;
}
</style>