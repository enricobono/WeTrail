<script setup>

import {useBookingStore} from "../stores/booking";
import BookingRepository from "../repositories/BookingRepository";
import TravelRepository from "../repositories/TravelRepository";
import formatDate from '../helpers/formatDate'
import formatCurrency from '../helpers/formatCurrency'
import moment from 'moment';

const bookingStore = useBookingStore()
const travel = ref({})
const booking = ref({})
const bookingWasDeleted = ref(false)
const reservationExpiresIn = ref('')
const reservationExpired = ref(false)

bookingStore.getBookingId().then((id) => {
  if (id === null) {
    booking.value = null
    return
  }

  BookingRepository.find(id).then((results) => {
    if (results === null) {

      booking.value = null
      return
    }

    booking.value = results
    TravelRepository.find(booking.value.travelId).then((travelResults) => {
      travel.value = travelResults

      const expirationDate = moment(booking.value.updatedAt).add(15, 'minutes')

      const reservationExpirationInterval = setInterval(() => {
        if (moment().isAfter(expirationDate)) {
          reservationExpired.value = true
          clearInterval(reservationExpirationInterval)
          return
        }

        reservationExpiresIn.value = moment(expirationDate.diff(moment())).format('mm:ss')
      }, 1000)

    })
  })
})

async function deleteBooking() {
  await bookingStore.delete(booking.value.id).then(() => {
    booking.value = null
    bookingWasDeleted.value = true
  });
}

</script>

<template>

  <h2 class="text-2xl font-bold">Bookings</h2>

  <div class="mt-4">

    <div v-if="booking">

      <Alert v-if="reservationExpired"
             :level="'warning'"
             :message="'Your reservation has expired.'"
             :cta="'Choose a new travel now'"
             :link="'/travels'"/>

      <Alert v-if="!reservationExpired"
             :level="'info'"
             :message="'Your reservation has been received. You have 15 minutes to complete the payment.'"/>


      <div class="shadow-lg border border-slate-200 rounded-lg">
        <div class="flex">
          <div>
            <img class="rounded-tl-lg w-full" :src="travel.image" width="300" height="300" alt="{{ travel.name }}">
          </div>

          <div class="p-4 w-full">
            <h3 class="text-lg font-semibold mb-1">
              {{ travel.name }}
            </h3>
            <div class="">
              Dates: {{ formatDate(travel.startingDate) }} - {{ formatDate(travel.endingDate) }}
            </div>
            <div>
              Price:
              <span class="inline-flex  font-medium bg-green-100 text-green-600 rounded-full px-2 py-0.5">
                      {{ formatCurrency(booking.grandTotal) }}
                    </span>
            </div>
            <div>
              Reserved seats: {{ booking.seats }}
            </div>
            <div>
              <button class="underline text-sm hover:text-blue-500" @click="deleteBooking()">Delete booking</button>
            </div>

          </div>
        </div>

        <div class="border-t p-4 bg-slate-50">
          <div>
            <div class="flex justify-end">

              <div v-if="reservationExpired">
                <span class="mr-2">
                  Your reservation has expired
                </span>
                <NuxtLink :to="'/travels/' + travel.slug"
                          class="inline-block bg-slate-700 hover:bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-md">
                  Start over
                </NuxtLink>
              </div>
              <div v-else>
                <span class="mr-2" v-if="!reservationExpired">
                  Your reservation expires in {{ reservationExpiresIn }} minutes
                </span>
                <button @click="proceedToPayment()" v-if="!reservationExpired"
                        class="bg-slate-700 hover:bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-md">
                  Proceed to payment
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>

    <div v-else-if="bookingWasDeleted">

      <Alert
          :level="'info'"
          :message="'Your reservation was deleted.'"
          :cta="'Choose a new travel now'"
          :link="'/travels'"
      />

    </div>
    <div v-else>

      <Alert
          :level="'warning'"
          :message="'Seems there are no bookings, yet.'"
          :cta="'Book a new travel now'"
          :link="'/travels'"
      />

    </div>
  </div>


</template>
