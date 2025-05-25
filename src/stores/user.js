import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    name: '',
  }),
  actions: {
    setUserInfo(userId, name) {
      this.userId = userId
      this.name = name
    },
    clearUserInfo() {
      this.userId = ''
      this.name = ''
    }
  },
  persist: true
}) 