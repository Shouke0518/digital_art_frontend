<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import apiClient from '@/api/api'

onMounted(async () => {
  const userStore = useUserStore()
  const userId = userStore.userId
  const name = userStore.name
  if (!userId) return
  try {
    await apiClient.get(`/users/${userId}`)
    // 有找到就什麼都不做
  } catch (error) {
    if (error.response && error.response.status === 404) {
      await apiClient.post('/users/add', {
        userId,
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
    }
  }
})
</script>

<template>
  <RouterView></RouterView>
</template>