<script setup lang="ts">
import formatDate from '../helpers/formatDate'
import formatCurrency from '../helpers/formatCurrency'

defineProps({
  travel: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="col-span-6 sm:col-span-6 md:col-span-4 xl:col-span-3 bg-white shadow-lg border border-slate-200 overflow-hidden rounded-lg">

    <div class="flex flex-col h-full">
      <div class="relative">
        <NuxtLink :to="'/travels/' + travel.slug">
          <img class="w-full" :src="travel.image" width="300" height="300" alt="{{ travel.name }}">
        </NuxtLink>
      </div>
      <div class="grow flex flex-col p-4">
        <div class="grow mb-4 space-y-0">
          <a href="" target="_blank">
            <h3 class="text-lg font-semibold mb-1">
              {{ travel.name }}
            </h3>
          </a>
          <div class="">
            Dates: {{ formatDate(travel.startingDate) }} - {{ formatDate(travel.endingDate) }}
          </div>
          <div>
            Available seats:
            <span :class="{'bg-amber-100 text-amber-600 font-medium   rounded-full px-2 py-0.5 mb-4': travel.totalSeats - travel.reservedSeats <= 3}">
                    {{ travel.totalSeats - travel.reservedSeats }}
                  </span>
          </div>
          <div>
            Price:
            <span class="inline-flex  font-medium bg-green-100 text-green-600 rounded-full px-2 py-0.5 mb-4">
                {{ formatCurrency(travel.price) }}
              </span>
          </div>
        </div>
        <div class="flex justify-end">
          <NuxtLink :to="'/travels/' + travel.slug"
                    class="bg-slate-700 hover:bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-md">
            Get More Info
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>