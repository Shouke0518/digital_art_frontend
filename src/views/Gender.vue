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
              <h2 class="text-h5 text-center mb-4">
                <span class="d-block">💥性別破框小測驗</span>
                <span class="d-block">5題小挑戰！</span>
                <span class="d-block">你能破框幾題？💥</span>
              </h2>
              <div v-if="!isCompleted">
                <p class="text-subtitle-1 mb-2">Q{{ currentQuestion + 1 }}. {{ questions[currentQuestion].question }}</p>
                
                <v-radio-group v-model="selectedAnswer" class="mb-4">
                  <v-radio
                    v-for="(option, index) in questions[currentQuestion].options"
                    :key="index"
                    :label="option"
                    :value="option"
                    class="custom-radio"
                    color="primary"
                    @click="updateOption(option)"
                  ></v-radio>
                </v-radio-group>
                
                <v-btn
                  color="primary"
                  block
                  variant="elevated"
                  class="mb-2"
                  @click="handleAnswer"
                >
                  提交答案
                </v-btn>

                <v-btn
                  color="info"
                  block
                  variant="outlined"
                  @click="showKnowledge = !showKnowledge"
                  class="mb-4"
                >
                  {{ showKnowledge ? '隱藏提示' : '查看提示' }}
                </v-btn>

                <v-alert
                  v-if="showKnowledge"
                  type="info"
                  class="mt-4"
                >
                  {{ questions[currentQuestion].knowledge }}
                </v-alert>
              </div>

              <div v-else class="text-center">
                <h3 class="text-h5 mb-4" v-if="score >= 3">你已完成了性別破框測驗！</h3>
                <h3 class="text-h5 mb-4" v-else>你未完成性別破框測驗！</h3>
                <p class="text-body-1" v-if="score >= 3">服飾本無性別之分，真正限制我們的，其實是固有的觀念。</p>
                <p class="text-body-1" v-else>請重新測驗</p>
                <v-btn
                  color="primary"
                  class="mt-4"
                  @click="resetQuiz"
                  variant="elevated"
                >
                  重新測驗
                </v-btn>
              </div>
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
  import genderImage from '@/assets/images/Gender.png'
  
  const router = useRouter()
  const questions = [
    {
      question: '哪一種穿著在歷史上曾經是男性的主流？',
      options: ['緊身褲', '背心', '連衣裙'],
      correctAnswer: '緊身褲',
      knowledge: '🧠 小知識：文藝復興時期的男性穿緊身褲表示體格與身分！'
    },
    {
      question: '哪個顏色在20世紀初是「男孩色」？',
      options: ['藍色', '粉紅色', '綠色'],
      correctAnswer: '粉紅色',
      knowledge: '🧠 小知識：20世紀初粉紅色被認為力量感，給男生穿；反而藍色被認為柔和，給女生穿。'
    },
    {
      question: '誰最早發明束胸衣（Corset）？',
      options: ['貴族夫人', '女僕人', '男設裁縫師'],
      correctAnswer: '男設裁縫師',
      knowledge: '🧠 小知識：束胸衣是由男性裁縫師設計的，初衷是為了讓女性展現「理想體態」，被當作「禮貌」「端莊」的象徵。'
    },
    {
      question: '哪個曾經是女生不「穿/戴」上會被責備的東西？',
      options: ['帽子', '內衣', '長袖衣'],
      correctAnswer: '帽子',
      knowledge: '📌 小知識：在19世紀，女性出門不戴帽子會被視為不體面、不守禮教。帽子甚至象徵女性的婚姻狀態與社會階級。'
    },
    {
      question: '哪個產品其實最早是為男性設計的？',
      options: ['香水', '指甲油', '耳環'],
      correctAnswer: '香水',
      knowledge: '🧠 小知識：在18 世紀歐洲，貴族男性用香水展現地位！'
    }
  ]
  
  const currentQuestion = ref(0)
  const selectedAnswer = ref('')
  const score = ref(0)
  const isCompleted = ref(false)
  const showKnowledge = ref(false)

  const snackbar = reactive({
    show: false,
    text: '',
    color: 'error'
  })
  
  const handleAnswer = () => {
    if (!selectedAnswer.value) {
      snackbar.color = 'error'
      snackbar.text = '請選擇一個答案'
      snackbar.show = true
      return
    }

    const isCorrect = selectedAnswer.value === questions[currentQuestion.value].correctAnswer

    if (isCorrect) {
      score.value++
      if (currentQuestion.value < questions.length - 1) {
        currentQuestion.value++
        selectedAnswer.value = ''
        showKnowledge.value = false
      } else {
        if (score.value >= 3) {
          // 獲取標題
          const title = document.querySelector('h1').textContent
          // 直接跳轉到完成畫面
          router.push({
            path: '/task-completion',
            query: { title }
          })
        } else {
          isCompleted.value = true
        }
      }
    } else {
      snackbar.color = 'error'
      snackbar.text = '再想想看！'
      snackbar.show = true
    }
  }
  
  const resetQuiz = () => {
    currentQuestion.value = 0
    selectedAnswer.value = ''
    score.value = 0
    isCompleted.value = false
    showKnowledge.value = false
  }

  const updateOption = (option) => {
    selectedAnswer.value = option;
  }
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 12px;
  }
  
  /* 所有文字元素使用 global.css 效果 */
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(p),
  :deep(.v-card-text),
  :deep(.v-radio),
  :deep(.v-btn),
  :deep(.v-alert),
  :deep(.v-snackbar__content),
  :deep(.v-radio__label),
  :deep(.v-radio-group),
  :deep(.v-selection-control),
  :deep(.v-selection-control__input),
  :deep(.v-selection-control__ripple),
  :deep(.v-label),
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

  :deep(.v-radio) {
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  :deep(.v-radio.v-radio--selected) {
    background-color: rgba(var(--v-theme-primary), 0.1);
  }

  :deep(.v-radio:hover) {
    background-color: rgba(var(--v-theme-primary), 0.2);
  }

  :deep(.v-radio .v-selection-control__input) {
    transform: scale(1.2);
  }

  :deep(.v-radio .v-selection-control__ripple) {
    transform: scale(1.2);
  }
  </style>