<script setup>
import { RouterView } from 'vue-router';
import { useDisplay } from 'vuetify'
</script>

<template>
  <RouterView></RouterView>
</template>

<style>
    @font-face {
        font-family: 'BoutiqueBitmap9x9';
        src: url('/fonts/BoutiqueBitmap9x9_1.92.ttf') format('truetype');
    }

    body {
        font-family: 'BoutiqueBitmap9x9', monospace;
    }
</style>