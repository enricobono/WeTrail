<script setup lang="ts">
import formatDate from '../../helpers/formatDate'
import formatCurrency from '../../helpers/formatCurrency'
import TravelRepository from "../../repositories/TravelRepository";
import { useBookingStore } from "../../stores/booking";
import { navigateTo } from "nuxt/app";
import BookingRepository from "../../repositories/BookingRepository";
import moment from "moment/moment";

const route = useRoute()
const bookingStore = useBookingStore()
const travel = ref({})
const seats = ref(1)
const error = ref('')


TravelRepository.findOneBySlug(route.params.slug).then((results) => {
  travel.value = results
  console.log(travel);

  bookingStore.getBookingId().then((id: string | null) => {
    if (id == null) {
      return
    }

    BookingRepository.find(id).then((booking) => {
      if (booking === null) {
        return
      }

      if (booking.travelId !== travel.value.id) {
        return
      }

      const expirationDate = moment(booking.updatedAt).add(15, 'minutes')
      if (moment().isAfter(expirationDate)) {
        return
      }

      navigateTo('/booking')
    })
  })
})


function reserve() {
  error.value = ''

  if (seats.value <= 0) {
    error.value = 'You need to be alive in order to book a travel.'
    return
  }

  TravelRepository.findOneBySlug(route.params.slug).then((results) => {
    travel.value = results

    if (seats.value > travel.value.totalSeats - travel.value.reservedSeats) {
      error.value = `Sorry, only ${travel.value.totalSeats - travel.value.reservedSeats} seats available for this travel.`
      return
    }

    bookingStore.book(travel.value.slug, seats.value).then(() => {
      console.log('now I can navigate to /booking');

      navigateTo({ path: '/booking' })
    })
  })
}

</script>

<template>

  <h2 class="text-2xl font-bold">Reserve your seat today!</h2>

  <div class="mt-4">
    <div class="shadow-lg border border-slate-200 rounded-lg">
      <div class="flex">
        <div>
          <img class="rounded-tl-lg w-full" :src="travel.image" width="300" height="300" alt="{{ travel.name }}">
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
              <span :class="{'bg-amber-100 text-amber-600 font-medium rounded-full px-2 py-0.5 mb-4': travel.totalSeats - travel.reservedSeats <= 3}">
                {{ travel.totalSeats - travel.reservedSeats }}
              </span>
            </div>
            <div>
              Price:
              <span class="inline-flex  font-medium bg-green-100 text-green-600 rounded-full px-2 py-0.5">
                {{ formatCurrency(travel.price * seats) }}
              </span>
            </div>

            <div class="flex flex-col md:flex-row mx-auto">
              <TravelMood mood="Nature" :score="travel.moodNature" color="bg-emerald-300"/>
              <TravelMood mood="Relax" :score="travel.moodRelax" color="bg-yellow-400"/>
              <TravelMood mood="History" :score="travel.moodHistory" color="bg-slate-400"/>
              <TravelMood mood="Culture" :score="travel.moodCulture" color="bg-blue-200"/>
              <TravelMood mood="Party" :score="travel.moodParty" color="bg-amber-500"/>
            </div>

            <div class="grid gap-4 md:grid-cols-3 mt-4">
              <div>
                <label for="seats" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Seats to reserve
                </label>
                <input type="number" min="1" :max="travel.totalSeats - travel.reservedSeats" step="1"
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
        </div>
      </div>

      <div class="border-t p-4 bg-slate-50">
        <div>
          <div class="flex justify-end">

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
