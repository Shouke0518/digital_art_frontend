<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const handleSelect = (key) => {
        router.push(key);
    };
</script>

<template>
  <v-bottom-navigation
    :elevation="24"
    active
    color="primary"

    grow
  >
    <v-btn @click="handleSelect('/caterpillar')">
      <span>未定</span>
    </v-btn>

    <v-btn @click="handleSelect('/cow')">
      <span>未定</span>
    </v-btn>

    <v-btn @click="handleSelect('/mousecode')">
      <span>未定</span>
    </v-btn>

    <v-btn @click="handleSelect('/turtle')">
      <span>未定</span>
    </v-btn>
  </v-bottom-navigation>
</template>
