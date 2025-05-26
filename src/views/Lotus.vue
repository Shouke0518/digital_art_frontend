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
            <h2 class="text-left mb-4">用戶資訊：</h2>
            <p class="text-left mb-4">userId：{{ userStore.userId }}</p>
            <p class="text-left mb-4">name：{{ userStore.name }}</p>
            <h2 class="text-left mb-4">寫給想要祝福的人<br>想對他說祝福的話：</h2>
            <v-form @submit.prevent="submitWish">
              <v-text-field
                v-model="formData.email"
                label="收件信箱"
                variant="outlined"
                class="mb-4"
                color="primary"
              ></v-text-field>

              <v-text-field
                v-model="formData.recipient"
                label="收件者"
                variant="outlined"
                class="mb-4"
                color="primary"
              ></v-text-field>

              <v-textarea
                v-model="formData.message"
                label="想祝福的話"
                variant="outlined"
                rows="4"
                class="mb-4"
                color="primary"
              ></v-textarea>

              <v-text-field
                v-model="formData.sender"
                label="寄信者"
                variant="outlined"
                class="mb-4"
                color="primary"
              ></v-text-field>

              <v-btn
                block
                color="primary"
                type="submit"
                class="white--text"
              >
                送出祝福
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
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
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../api/api'
import lotusImage from '@/assets/images/Lotus.png'
import { useUserStore } from '../stores/user'

const router = useRouter()
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const userStore = useUserStore()

const formData = ref({
  userId: '',
  name: '',
  email: '',
  recipient: '',
  message: '',
  sender: ''
})

const submitWish = async () => {
  try {
    // 從 userStore 獲取 userId
    formData.value.userId = userStore.userId
    formData.value.name = userStore.name
    await apiClient.post('/wish', formData.value)
    
    // 獲取標題
    const title = document.querySelector('h1').textContent
    // 直接跳轉到完成畫面
    router.push({
      path: '/task-completion',
      query: { title }
    })
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      snackbarText.value = error.response.data.error
    } else {
      snackbarText.value = '送出失敗，請重試'
    }
    snackbarColor.value = 'error'
    snackbar.value = true
    console.error(error)
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

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
:deep(.v-field__outline__notch__label),
:deep(.v-textarea),
:deep(.v-textarea__input) {
  font-family: "BoutiqueBitmap9x9";
}

:deep(.v-snackbar__content) {
  text-align: center;
  justify-content: center;
}
</style>