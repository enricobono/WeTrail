<script setup>

</script>

<template>
  <div class="text-slate-800">
    <header >

      <nav class="bg-slate-100 border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NuxtLink
              to="/"
              class="text-3xl font-black" style="color: #ff4758">
            WE<span style="color: #4d4d4d">TRAIL</span>
          </NuxtLink>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <NuxtLink
                    to="/" class="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:text-blue-500" aria-current="page">
                  Travels
                </NuxtLink>
              </li>              <li>
                <NuxtLink
                    to="/booking" class="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:text-blue-500" aria-current="page">
                  Bookings
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
        <NuxtLink to="/" class="hover:underline">WeTrail</NuxtLink> © 2024 - All rights reserved
      </div>
    </footer>

  </div>
</template>