<script setup lang="ts">

defineProps({
  level: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  cta: {
    type: String
  }
})

</script>


<template>

  <div class="p-4 mb-4 text-sm rounded-lg" role="alert" :class="{
    'bg-amber-100': level === 'warning',
    'bg-blue-50': level === 'info'
  }">
    <p>
      <b v-if="level === 'warning'">Oops!</b>
      <b v-else>Yatta!</b>

      {{ message }}
      <NuxtLink :to="link" v-if="link"
                class="hover:bg-slate-900 hover:text-white hover:border hover:border-slate-700 py-2 px-4 rounded-md mr-2 underline">
        {{ cta }}
      </NuxtLink>
    </p>
  </div>

</template>