<template>

    <div class="border-t p-4 w-full">

      <h3 class="text-lg font-semibold mb-2">
        Billing information
      </h3>

      <div class="grid md:grid-cols-2 md:gap-6">

        <div class="relative z-0 w-full mb-5 group">
          <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
          <input type="text" id="firstName" v-model="booking.firstName"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
          <input type="text" id="lastName" v-model="booking.lastName"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required/>
        </div>

      </div>


      <div class="grid md:grid-cols-2 md:gap-6">

        <div class="relative z-0 w-full mb-5 group">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" id="email" v-model="booking.email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
          <input type="text" id="phoneNumber" v-model="booking.phoneNumber"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+39 340 1234567" required/>
        </div>

      </div>


      <div class="grid md:grid-cols-2 md:gap-6">

        <div class="relative z-0 w-full mb-5 group">
          <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <input type="text" id="address" v-model="booking.address"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input type="text" id="city" v-model="booking.city"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" required/>
        </div>

      </div>


      <div class="grid md:grid-cols-4 md:gap-6 ">

        <div class="relative z-0 w-full mb-5 group col-span-2">
          <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province/State</label>
          <input type="text" id="province" v-model="booking.province"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Province or state" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group pr-4 md:pr-0">
          <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white2">Country</label>
          <input type="text" id="country" v-model="booking.country"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <label for="zipCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip code</label>
          <input type="text" id="zipCode" v-model="booking.zipCode"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Zip code" required/>
        </div>
      </div>

      <div class="flex items-start mb-1">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with WeTrail's Terms and Conditions</label>
      </div>

    </div>
    <div class="border-t p-4 w-full">

      <h3 class="text-lg font-semibold mb-2">
        Payment information
      </h3>

      <div class="grid md:grid-cols-2 md:gap-6">

        <div class="relative z-0 w-full mb-5 group">
          <label for="creditCardNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credit card number</label>
          <input type="text" id="creditCardNumber" v-model="booking.creditCardNumber"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 inputmode="numeric" pattern="[0-9\s]{13,19}" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" required/>
        </div>
      </div>

      <div class="grid md:grid-cols-8 md:gap-6">
        <div class="relative z-0 w-full mb-5 group col-span-2">
          <label for="creditCardName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issued to</label>
          <input type="text" id="creditCardName" v-model="booking.creditCardName"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group  pr-4 md:pr-0">
          <label for="expirationMonth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration month</label>
          <input type="text" id="expirationMonth" v-model="booking.expirationMonth"
                 inputmode="numeric" pattern="[0-9]{2}" maxlength="2"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="MM" required/>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <label for="expirationYear" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration year</label>
          <input type="text" id="expirationYear" v-model="booking.expirationYear"
                 inputmode="numeric" pattern="[0-9]{2}" maxlength="2"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YY" required/>
        </div>

      </div>

    </div>


</template>

<script setup lang="ts">

defineProps({
  booking: {
    type: Object,
    required: true
  }
})

</script>