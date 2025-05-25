<script setup>
import { RouterView } from 'vue-router';
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import apiClient from '@/api/api'

const isCheckingUser = ref(false)
const userStore = useUserStore()

// 監聽 userId 的變化
watch(() => userStore.userId, async (newUserId) => {
  if (!newUserId || isCheckingUser.value) {
    console.log('watch - skipping: no userId or already checking')
    return
  }
  
  isCheckingUser.value = true
  try {
    console.log('watch - checking user:', newUserId)
    await apiClient.get(`/users/${newUserId}`)
    console.log('user found')
    // 有找到就什麼都不做
  } catch (error) {
    console.log('watch - error:', error.response?.status)
    if (error.response && error.response.status === 404) {
      try {
        console.log('watch - creating user:', newUserId)
        await apiClient.post('/users/add', {
          userId: newUserId,
          name: userStore.name,
          qualification: false,
          echo: false,
          gender: false,
          lotus: false,
          muu: false,
          caterpillar: false,
          cow: false,
          mouseCode: false,
          turtle: false
        })
        console.log('user created')
      } catch (createError) {
        console.error('Failed to create user:', createError)
      }
    }
  } finally {
    isCheckingUser.value = false
  }
}, { immediate: true })

onMounted(() => {
  console.log('App.vue onMounted - userId:', userStore.userId)
  console.log('App.vue onMounted - name:', userStore.name)
})
</script>

<template>
  <RouterView></RouterView>
</template>