<template>

  <h2 class="text-2xl font-bold">Checkout</h2>

  <div class="mt-4">

    <div v-if="bookingWasDeleted">

      <Alert
          level="info"
          message="Your reservation was deleted."
          cta="Choose a new travel now"
          link="/travels"
      />

    </div>
    <div v-else-if="!booking">

      <Alert
          level="warning"
          message="Seems there are no bookings, yet."
          cta="Book a new travel now"
          link="/travels"
      />

    </div>
    <div v-else>

      <div ref="alertsReference">

        <Alert v-if="reservationExpired"
               level="warning"
               message="Your reservation has expired."
               cta="Choose a new travel now"
               link="/travels"/>

        <Alert v-if="!reservationExpired && step === 'review'"
               level="info"
               message="Your reservation has been received. You have 15 minutes to complete the payment."/>

        <Alert v-if="paymentError && step === 'checkout'"
               level="danger"
               message="There was an error with your payment. Please review your payment information or try with a different card."/>
      </div>


      <div class="shadow-lg border border-slate-200 rounded-lg mb-16">
        <div class="flex flex-col md:flex-row">
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
              Grand total:
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

        <div v-if="step !== 'review'">

          <form ref="formReference" @submit.stop.prevent="onSubmit()">
            <CheckoutPayment
                :booking="booking"/>
          </form>


        </div>

        <div class="border-t p-4 bg-slate-50" ref="paymentReference">
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
                <span class="mr-2" v-if="!reservationExpired && reservationExpiresIn && step !== 'payment'">
                  Your reservation expires in {{ reservationExpiresIn }} minutes
                </span>
                <button @click="proceedToPayment()" v-if="!reservationExpired && step === 'review'"
                        class="bg-slate-700 hover:bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-md">
                  Proceed to payment
                </button>
                <button @click="pay()" v-if="!reservationExpired && step !== 'review'"
                        :disabled="step === 'payment'"
                        class="bg-slate-700 hover:bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-md disabled:bg-slate-400 disabled:border-slate-300 text-center inline-flex items-center">
                  <span v-if="step !== 'payment'">Pay now</span>

                  <svg v-if="step === 'payment'" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  <span v-if="step === 'payment'">Processing...</span>

                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script setup lang="ts">

import { useBookingStore } from "../../stores/bookingStore";
import TravelApi from "../../api/TravelApi";
import BookingApi from "../../api/BookingApi";
import formatDate from '../../helpers/formatDate'
import formatCurrency from '../../helpers/formatCurrency'
import moment from 'moment';
import { navigateTo } from "nuxt/app";
import { Booking } from "../../types/booking.interface";

const bookingStore = useBookingStore()
const step = ref('review')
const travel = ref({})
const booking = ref({})
const paymentError = ref(false)
const bookingWasDeleted = ref(false)
const reservationExpired = ref(false)
const reservationExpiresIn = ref('')
const formReference = ref<HTMLElement | null>(null)
const alertsReference = ref<HTMLElement | null>(null)
const paymentReference = ref<HTMLElement | null>(null)


bookingStore.getBookingId().then(async (id: string) => {
  BookingApi.find(id).then((results) => {
    booking.value = results

    if (booking.value.status === 'paid') {
      navigateTo('/checkout/payment-accepted')
    }

    TravelApi.find(booking.value.travelId).then((travelResults) => {
      travel.value = travelResults

      const expirationDate = moment(booking.value.expiredAt)

      const reservationExpirationInterval = setInterval(() => {
        if (moment().isAfter(expirationDate)) {
          reservationExpired.value = true
          clearInterval(reservationExpirationInterval)
          return
        }

        reservationExpiresIn.value = moment(expirationDate.diff(moment())).format('mm:ss')
      }, 1000)

    }).catch(() => {
    })
  }).catch(() => {
    booking.value = null
  })
}).catch(() => {
  booking.value = null
})

async function deleteBooking() {
  await bookingStore.delete(booking.value.id).then(() => {
    booking.value = null
    bookingWasDeleted.value = true
  });
}

function proceedToPayment() {
  step.value = 'checkout'
  paymentReference.value?.scrollIntoView({ behavior: 'smooth' })
}

function pay() {
  formReference.value.requestSubmit()
}

function onSubmit() {
  step.value = 'payment'

  // Simulate delayed response
  setTimeout(() => {
    BookingApi.pay(booking.value as Booking).then((bookingId) => {
      navigateTo('/checkout/payment-accepted')
    }).catch((error) => {
      step.value = 'checkout'
      paymentError.value = true
      paymentReference.value?.scrollIntoView({ behavior: 'smooth' })
    })
  }, 2000)


}

</script>