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
    <v-btn @click="handleSelect('/echo')">
      <span>任務一</span>
    </v-btn>

    <v-btn @click="handleSelect('/gender')">
      <span>任務二</span>
    </v-btn>

    <v-btn @click="handleSelect('/lotus')">
      <span>任務三</span>
    </v-btn>

    <v-btn @click="handleSelect('/muu')">
      <span>任務四</span>
    </v-btn>
  </v-bottom-navigation>
</template>
