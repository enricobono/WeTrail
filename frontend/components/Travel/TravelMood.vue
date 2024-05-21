<script setup lang="ts">

defineProps({
  mood: {
    type: String,
    required: true
  },
  score: {
    type: Number
  },
  color: {
    type: String
  }
})


</script>

<template>
  <div class="w-full pr-4">
    <div class="mb-1">{{ mood }}:</div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="h-2.5 rounded-full dark:bg-gray-300" :class="color" :style="{'width': score +'%'}"></div>
    </div>
  </div>
</template>