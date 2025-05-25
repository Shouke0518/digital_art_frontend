<script setup>
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import apiClient from '@/api/api'

const isCheckingUser = ref(false)

onMounted(async () => {
  const userStore = useUserStore()
  const userId = userStore.userId
  const name = userStore.name
  if (!userId || isCheckingUser.value) return
  
  isCheckingUser.value = true
  try {
    await apiClient.get(`/users/${userId}`)
    console.log('user found')
    // 有找到就什麼都不做
  } catch (error) {
    if (error.response && error.response.status === 404) {
      try {
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
        console.log('user created')
      } catch (createError) {
        console.error('Failed to create user:', createError)
      }
    }
  } finally {
    isCheckingUser.value = false
  }
})
</script>

<template>
  <RouterView></RouterView>
</template>