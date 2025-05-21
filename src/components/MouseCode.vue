<script setup>
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()
const audioRef = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)
const barcode = ref('')
const bookTitle = ref('')
const isCorrect = ref(false)
const showResult = ref(false)

const correctBarcode = 'C357658'
const correctBookTitle = '摩斯密碼解謎'

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
    const seekTime = (event.offsetX / event.target.offsetWidth) * duration.value
    audioRef.value.currentTime = seekTime
    currentTime.value = seekTime
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

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const checkAnswer = () => {
  isCorrect.value = barcode.value === correctBarcode || bookTitle.value === correctBookTitle
  showResult.value = true
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            摩斯密碼解謎
          </v-card-title>

          <v-card-text>
            <div class="d-flex flex-column align-center mb-4">
              <audio
                ref="audioRef"
                src="/morse-code.mp3"
                @timeupdate="handleTimeUpdate"
                @loadedmetadata="handleLoadedMetadata"
                class="mb-2"
              ></audio>

              <div class="d-flex align-center mb-2">
                <v-btn
                  :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
                  @click="togglePlay"
                  class="mr-2"
                ></v-btn>
                <span class="text-caption">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
              </div>

              <div
                class="timeline-container"
                @click="handleSeek"
                style="width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; cursor: pointer;"
              >
                <div
                  :style="{
                    width: `${(currentTime / duration) * 100}%`,
                    height: '100%',
                    background: '#1976D2',
                    borderRadius: '10px'
                  }"
                ></div>
              </div>
            </div>

            <v-text-field
              v-model="barcode"
              label="請輸入條碼號"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="bookTitle"
              label="請輸入書名"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-btn
              color="primary"
              block
              @click="checkAnswer"
            >
              確認答案
            </v-btn>

            <v-alert
              v-if="showResult"
              :type="isCorrect ? 'success' : 'error'"
              class="mt-4"
            >
              {{ isCorrect ? '恭喜你答對了！' : '答案不正確，請再試一次。' }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> 