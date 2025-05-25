<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-title class="text-h3 text-center mb-4">
            摩斯密碼解碼遊戲
          </v-card-title>

          <v-card-text class="text-center">
            <v-img
            :src="mousecodeImage"
            class="mb-6"
            max-height="400"
            contain
            ></v-img>
            
            <p class="text-body-1 mb-6">
              請仔細聆聽音頻中的摩斯密碼，並解碼出正確的答案。
              解出來的英數字是條碼號，
              請根據條碼號去台科大圖書館找尋書名，去吧柯南!!。
            </p>

            <audio
              ref="audioRef"
              src="/morse.wav"
              @timeupdate="handleTimeUpdate"
              @loadedmetadata="handleLoadedMetadata"
              @ended="isPlaying = false"
              style="display:none"
            ></audio>

            <div class="d-flex align-center mb-4">
              <v-btn
                icon
                variant="text"
                @click="togglePlay"
                class="mr-4"
              >
                <v-icon size="36">{{ isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle' }}</v-icon>
              </v-btn>

              <v-slider
                v-model="currentTime"
                :max="duration"
                @update:modelValue="onSliderInput"
                :step="0.1"
                class="mx-4"
              >
                <template v-slot:prepend>
                  {{ formatTime(currentTime) }}
                </template>
                <template v-slot:append>
                  {{ formatTime(duration) }}
                </template>
              </v-slider>
            </div>

            <v-row justify="center" class="mt-4">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="barcodeInput"
                  label="請輸入摩斯密碼解碼結果"
                  variant="outlined"
                  dense
                  hide-details
                  class="mb-4"
                  color="primary"
                ></v-text-field>

                <v-text-field
                  v-model="bookTitleInput"
                  label="請輸入解碼後的書名"
                  variant="outlined"
                  dense
                  hide-details
                  class="mb-4"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mousecodeImage from '@/assets/images/MouseCode.png'
const router = useRouter()
const audioRef = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const barcodeInput = ref('')
const bookTitleInput = ref('')
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('error')
const isPlaying = ref(false)

const correctBarcode = 'C357658'
const correctBookTitle = '你想活出怎樣的人生'

const handleTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

const handleLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
  }
}

const handleSeek = (event) => {
  if (audioRef.value) {
    const seekTime = (event.target.value / 100) * duration.value
    audioRef.value.currentTime = seekTime
    currentTime.value = seekTime
  }
}

const onSliderInput = (val) => {
  if (audioRef.value) {
    audioRef.value.currentTime = val
  }
}

const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const checkAnswer = () => {
  const isBarcodeCorrect = barcodeInput.value.trim().toUpperCase() === correctBarcode
  const isBookTitleCorrect = bookTitleInput.value.trim().includes(correctBookTitle)
  
  if (isBarcodeCorrect && isBookTitleCorrect) {
    // 獲取標題
    const title = document.querySelector('.v-card-title').textContent
    // 直接跳轉到完成畫面
    router.push({
      path: '/task-completion',
      query: { title }
    })
  } else {
    snackbarText.value = '答案不正確，請再試一次！'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
:deep(.v-field__outline__notch__label),
:deep(.v-slider),
:deep(.v-slider__thumb),
:deep(.v-slider__track),
:deep(.v-slider__track-container),
:deep(.v-slider__track-fill),
:deep(.v-slider__track-background) {
  font-family: "BoutiqueBitmap9x9";
}

:deep(.v-snackbar__content) {
  text-align: center;
  justify-content: center;
}
</style>