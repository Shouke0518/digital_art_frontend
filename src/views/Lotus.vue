<template>
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6" elevation="0">
            <h1 class="text-h3 text-center mb-6">《蓮花開～祝你有美好的一天》</h1>
            
            <v-img
              :src="lotusImage"
              class="mb-6"
              max-height="400"
              contain
            ></v-img>
  
            <v-card-text class="text-body-1 mb-6">
                通訊軟體的出現，讓長輩們產生獨特的社交方式。無論颳風下雨，春夏秋冬，天天都能收到那一張——親愛的朋友，呷飽未？

                這不僅僅是一張圖片，
                也是一種長久而緊密的連結，
                更是現代的年輕人所缺乏的。

                停下腳步，欣賞蓮花，按下按鈕，好好感受來自長輩圖的愛與關懷<3333
            </v-card-text>
  
            <v-card-text>
              <h2 class=" text-left mb-4">回答我! Look at my eyes：</h2>
              <v-form @submit.prevent="submitAnswer">
                <v-text-field
                  v-model="answer"
                  label="未定"
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
  import lotusImage from '@/assets/images/Lotus.png'
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