<template>
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6" elevation="0">
            <h1 class="text-h3 text-center mb-6">《Re:Style-性別視角下的造型共創》</h1>
            
            <v-img
              :src="genderImage"
              class="mb-6"
              max-height="400"
              contain
            ></v-img>
  
            <v-card-text class="text-body-1 mb-6">
                男生一定要短髮俐落？女生就該穿上裙子？
                我們是否早已習慣，替不同性別貼上既定的樣貌與審美標準？
                本展邀請您走進「性別視角互換」的互動體驗——在為模特兒換裝的過程中，試著從「他者的身體」出發，思考您眼中的性別形象是如何形成的。也許，從造型的選擇中，您會看見自己眼裡對性別的期待與想像，甚至開始鬆動那些看不見的框架。
            </v-card-text>
  
            <v-card-text>
              <h2 class=" text-left mb-4">尚未客製化：</h2>
              <v-form @submit.prevent="submitAnswer">
                <v-text-field
                  v-model="answer"
                  label="aaaaaaaa"
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
  import genderImage from '@/assets/images/Gender.png'
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