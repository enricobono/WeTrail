<template>
  <div class="text-slate-800">
    <header>

      <nav class="bg-slate-100 border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 py-1 md:p-4">
          <NuxtLink
              to="/"
              class="text-3xl font-black" style="color: #ff4758">
            WE<span style="color: #4d4d4d">TRAIL</span>
          </NuxtLink>

          <div class="w-auto">
            <ul class="font-medium flex p-0 flex-row md:space-x-8 mt-0">
              <li>
                <NuxtLink
                    to="/" class="block py-2 px-3 rounded hidden md:block md:bg-transparent md:p-0 hover:text-blue-500" aria-current="page">
                  Travels
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                    to="/checkout" class="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:text-blue-500" aria-current="page">
                  Checkout
                </NuxtLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>

    </header>

    <div class="p-4 max-w-screen-xl mx-auto">
      <slot/>
    </div>

    <footer class="bg-gray-600 border-t fixed bottom-0 left-0 w-full">
      <div class="max-w-screen-xl mx-auto p-2 text-center text-slate-300 text-sm">
        <NuxtLink to="/" class="hover:underline">WeTrail</NuxtLink>
        © 2024 - All rights reserved
      </div>
    </footer>

  </div>
</template>

<script setup>

</script>
