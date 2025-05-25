<template>
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6" elevation="0">
            <h1 class="text-h3 text-center mb-6">《Muu》</h1>
            
            <v-img
              :src="muuImage"
              class="mb-6"
              max-height="400"
              contain
            ></v-img>
  
            <v-card-text class="text-body-1 mb-6">
                「說不出口的，就交給牠吧！」 這場互動體驗是一個不需要對話、不用解釋、也不怕被評價的「情緒出口」。 透過 Muu 的存在，把那些無形的情緒視覺化、實體化，讓使用者能夠看見自己每天情緒的變化。
            </v-card-text>
  
            <v-card-text>
              <h2 class=" text-left mb-4">《Muu》實體的節數加上Muu在結果圖講話的行數是多少呢？：</h2>
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
  import { useRouter } from 'vue-router'
  import muuImage from '@/assets/images/Muu.png'
  
  const router = useRouter()
  const answer = ref('')
  const snackbar = reactive({
    show: false,
    text: '',
    color: 'error'
  })
  
  const submitAnswer = () => {
    // 模擬發送到後端
    console.log('提交答案:', answer.value)
    
    // 檢查答案是否包含"23"
    const hasTwentyThree = answer.value.includes('23')
    
    if (hasTwentyThree) {
      // 獲取標題
      const title = document.querySelector('h1').textContent
      // 直接跳轉到完成畫面
      router.push({
        path: '/task-completion',
        query: { title }
      })
    } else {
      snackbar.color = 'error'
      snackbar.text = '再想想看！'
      snackbar.show = true
    }
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