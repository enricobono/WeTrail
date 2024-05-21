<script setup lang="ts">

defineProps({
  mood: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})


</script>

<template>
  <div class="">
    <div class="mb-1">{{ mood }}:</div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" :style="{'width': score +'%'}"></div>
    </div>

  </div>
</template>