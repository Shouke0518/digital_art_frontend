<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const audioRef = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const barcodeInput = ref('')
const bookTitleInput = ref('')
const isCorrect = ref(false)
const showResult = ref(false)
const isPlaying = ref(false)

const correctBarcode = 'C357658'
const correctBookTitle = '摩斯密碼解碼書'

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
  if (barcodeInput.value === correctBarcode || bookTitleInput.value === correctBookTitle) {
    isCorrect.value = true
    showResult.value = true
  } else {
    showResult.value = true
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h4 text-center mb-4">
            摩斯密碼解碼遊戲
          </v-card-title>

          <v-card-text>
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
                <v-icon size="36">{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
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

            <v-text-field
              v-model="barcodeInput"
              label="請輸入條碼號"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="bookTitleInput"
              label="請輸入書名"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-btn
              color="primary"
              block
              @click="checkAnswer"
              class="mt-4"
            >
              確認答案
            </v-btn>

            <v-alert
              v-if="showResult"
              :type="isCorrect ? 'success' : 'error'"
              class="mt-4"
            >
              {{ isCorrect ? '恭喜你答對了！' : '答案不正確，請再試一次！' }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
