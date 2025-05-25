<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title class="text-h4 text-center pt-6">
            任務已完成
          </v-card-title>
          <v-card-text>
            <div v-if="loading">載入中...</div>
            <div v-else-if="error">{{ error }}</div>
            <div v-else>
              <v-list>
                <v-list-item
                  v-for="task in taskList"
                  :key="task.key"
                >
                  <v-list-item-title>{{ task.label }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <span v-if="user && user[task.key]">✅ 已完成</span>
                    <span v-else>❌ 未完成</span>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>

              <div v-if="isAllTasksCompleted" class="mt-6">
                <p class="text-h6 mb-4">
                  恭喜您完成所有任務！<br>
                  請留下您的電子信箱，我們將為您寄送精美電子卡片。
                </p>
                <v-form @submit.prevent="submitEmail">
                  <v-text-field
                    v-model="email"
                    label="電子信箱"
                    variant="outlined"
                    :rules="emailRules"
                    class="mb-4"
                    :disabled="hasSubmittedEmail"
                  ></v-text-field>
                  <v-btn
                    color="primary"
                    type="submit"
                    block
                    :loading="submitting"
                    :disabled="hasSubmittedEmail"
                  >
                    {{ hasSubmittedEmail ? '已提交' : '送出' }}
                  </v-btn>
                </v-form>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 成功提示對話框 -->
    <v-dialog
      v-model="showSuccessDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5 text-center pt-6">
          提交成功！
        </v-card-title>
        <v-card-text class="text-center">
          <v-icon
            color="success"
            size="64"
            class="mb-4"
          >
            mdi-check-circle
          </v-icon>
          <p class="text-h6">
            感謝您的參與！<br>
            我們將盡快為您寄送電子卡片。
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn
            color="primary"
            @click="showSuccessDialog = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import apiClient from '@/api/api'

const userStore = useUserStore()
const userId = userStore.userId
const user = ref(null)
const loading = ref(true)
const error = ref('')
const email = ref('')
const submitting = ref(false)
const hasSubmittedEmail = ref(false)
const showSuccessDialog = ref(false)

const emailRules = [
  v => !!v || '請輸入電子信箱',
  v => /.+@.+\..+/.test(v) || '請輸入有效的電子信箱'
]

const taskList = [
  { key: 'echo', label: '陌聲顯影機' },
  { key: 'gender', label: 'Re:Style-性別視角下的造型共創' },
  { key: 'lotus', label: '蓮花開～祝你有美好的一天' },
  { key: 'muu', label: 'Muu' },
  { key: 'caterpillar', label: '霹靂毛蟲計數挑戰' },
  { key: 'cow', label: '吹牛逼呢!!!你吹牛逼呢!!!' },
  { key: 'mouseCode', label: '摩斯密碼解碼遊戲' },
  { key: 'turtle', label: '銀色戰車淪落為烏龜...' }
]

const isAllTasksCompleted = computed(() => {
  if (!user.value) return false
  return taskList.every(task => user.value[task.key])
})

const checkEmailSubmission = async () => {
  try {
    const { data } = await apiClient.get(`/user-emails/${userId}`)
    if (data) {
      hasSubmittedEmail.value = true
      email.value = data.email
    }
  } catch (e) {
    console.error('檢查電子信箱提交狀態失敗:', e)
  }
}

const submitEmail = async () => {
  if (!email.value || hasSubmittedEmail.value) return
  
  submitting.value = true
  try {
    await apiClient.post(`/user-emails/${userId}`, { 
      email: email.value,
      name: userStore.name 
    })
    hasSubmittedEmail.value = true
    showSuccessDialog.value = true
  } catch (e) {
    snackbarText.value = '送出失敗，請重試'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
  submitting.value = false
}

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await apiClient.get(`/users/${userId}`)
    user.value = data
    if (isAllTasksCompleted.value) {
      await checkEmailSubmission()
    }
  } catch (e) {
    error.value = '查詢用戶資料失敗'
  }
  loading.value = false
})
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}

:deep(.v-dialog) {
  border-radius: 16px;
}
</style> 