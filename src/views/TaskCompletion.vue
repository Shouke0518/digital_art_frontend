<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-h4 text-center pt-6">
            恭喜完成任務！
          </v-card-title>
          <v-card-text class="text-center">
            <div class="text-h6 mb-4">
              您已成功完成「 {{ title }} 」
            </div>
            <v-btn
              color="primary"
              size="large"
              @click="showConfetti"
              class="mb-4"
            >
              慶祝一下！
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import apiClient from '../api/api'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const title = ref(route.query.title || '任務完成')

// 標準化任務標題（去除空白、換行、<br>等）
function normalizeTitle(str) {
  return str.replace(/\s|\n|\r|\t|\+/g, '').replace(/<br\s*\/?>/gi, '');
}

// 任務名稱映射（key 已標準化）
const taskNameMap = {
  '《陌聲顯影機》': 'echo',
  '《Re:Style-性別視角下的造型共創》': 'gender',
  '《蓮花開～祝你有美好的一天》': 'lotus',
  '《Muu》': 'muu',
  '霹靂毛蟲計數挑戰': 'caterpillar',
  '吹牛逼呢!!!你吹牛逼呢!!!': 'cow',
  '摩斯密碼解碼遊戲': 'mouseCode',
  '銀色戰車淪落為烏龜...': 'turtle'
}

const showConfetti = () => {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    
    window.confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
    window.confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}

onMounted(async () => {
  // 動態加載 confetti
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
  script.onload = () => {
    showConfetti()
  }
  document.head.appendChild(script)

  try {
    // 標準化 title 再查映射
    const normalizedTitle = normalizeTitle(title.value)
    const currentTask = taskNameMap[normalizedTitle]
    if (currentTask) {
      await apiClient.post(`/users/${userStore.userId}/complete-task`, null, {
        params: {
          taskName: currentTask
        }
      })
    } else {
      console.warn('找不到對應任務代碼，標題：', title.value, '標準化後：', normalizedTitle)
    }
  } catch (error) {
    console.error('Error updating task completion:', error)
  }
})

const goToNextTask = () => {
  router.push('/task-list')
}
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style> 