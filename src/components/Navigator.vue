<script setup>
    import { ref, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
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
    <v-btn @click="handleSelect('/cow')">
      <span>任務一</span>
    </v-btn>

    <v-btn @click="handleSelect('/muu')">
      <span>任務二</span>
    </v-btn>

    <v-btn @click="handleSelect('/caterpillar')">
      <span>任務三</span>
    </v-btn>

    <v-btn @click="handleSelect('/mousecode')">
      <span>任務四</span>
    </v-btn>
  </v-bottom-navigation>
</template>
