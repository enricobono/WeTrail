<script setup>

</script>

<template>
  <div class="text-slate-800">
    <header class="mb-8 p-2 border-b bg-slate-100">
      <NuxtLink
          to="/"
          class="text-3xl font-black" style="color: #ff4758">
        WE<span style="color: #4d4d4d">TRAIL</span>
      </NuxtLink>
    </header>

    <div class="p-4">
      <slot/>
    </div>

    <footer class="bg-gray-600 border-t fixed bottom-0 left-0 w-full">
      <div class="w-full mx-auto p-2 text-center text-slate-300 text-sm">
        <NuxtLink to="/" class="hover:underline">WeTrail</NuxtLink> © 2024 - All rights reserved
      </div>
    </footer>

  </div>
</template>