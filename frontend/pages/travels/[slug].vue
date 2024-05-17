<script setup lang="ts">
import formatDate from '../../helpers/formatDate'
import formatCurrency from '../../helpers/formatCurrency'
import TravelRepository from "../../repositories/TravelRepository";
import { useBookingStore } from "../../stores/booking";
import { navigateTo } from "nuxt/app";

const route = useRoute()
const booking = useBookingStore()
const travel = ref([])
const seats = ref(1)
const error = ref('')

TravelRepository.findOneBySlug(route.params.slug).then((results) => {
  travel.value = results
})

function reserve() {
  error.value = ''

  if (seats.value <= 0) {
    error.value = 'You need a living body in order to book a travel.'
    return
  }

  TravelRepository.findOneBySlug(route.params.slug).then((results) => {
    travel.value = results

    if (seats.value > travel.value.totalPax - travel.value.reservedPax) {
      error.value = `Sorry, only ${travel.value.totalPax - travel.value.reservedPax} seats available for this travel.`
      return
    }

    booking.book(travel.value.slug)
    navigateTo({path: '/booking'})
  })
}

</script>

<template>

  <h2 class="text-2xl font-bold">Reserve your seats today!</h2>

  <div class="mt-4">
    <div class="shadow-lg border border-slate-200 rounded-lg">
      <div class="flex">
        <div>
          <img class="rounded-l-lg w-full" :src="travel.image" width="300" height="300" alt="{{ travel.name }}">
        </div>

        <div class="p-4 w-full">
          <div>
            <h3 class="text-lg font-semibold mb-1">
              {{ travel.name }}
            </h3>
            <div class="">
              Dates: {{ formatDate(travel.startingDate) }} - {{ formatDate(travel.endingDate) }}
            </div>
            <div>
              Available seats:
              <span :class="{'bg-amber-100 text-amber-600 font-medium rounded-full px-2 py-0.5 mb-4': travel.totalPax - travel.reservedPax <= 3}">
                {{ travel.totalPax - travel.reservedPax }}
              </span>
            </div>
            <div>
              Price:
              <span class="inline-flex  font-medium bg-green-100 text-green-600 rounded-full px-2 py-0.5 mb-4">
                {{ formatCurrency(travel.price) }}
              </span>
            </div>
            <div class="grid gap-4 mb-4 md:grid-cols-3">
              <div>
                <label for="seats" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Seats to reserve
                </label>
                <input type="number" min="1" :max="travel.totalPax - travel.reservedPax" step="1"
                       id="seats" v-model="seats" placeholder="John" required

                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg lock w-full p-2.5"
                       :class="{'bg-red-50 border-red-500 text-red-900': error }"
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="error ">
                  {{ error }}
                </p>
              </div>
            </div>

          </div>
          <div class="flex justify-end mt-4">
            <NuxtLink to="/travels" class="hover:bg-slate-900 hover:text-white hover:border hover:border-slate-700 py-2 px-4 rounded-md mr-2 underline">
              Pick a different travel
            </NuxtLink>
            <button @click="reserve()"
                    class="bg-slate-700 hover:bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-md">
              Reserve now
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
