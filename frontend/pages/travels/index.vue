<script setup lang="ts">

import TravelRepository from "../../repositories/TravelRepository";

const travels = ref([])

TravelRepository.findAll().then((results) => {
  travels.value = results
})

</script>

<template>

  <h2 class="text-2xl font-bold">Travels</h2>

  <div class="mt-4">

    <div class="grid grid-cols-12 gap-4" v-if="travels.length > 0">

      <Travel
          v-for="(travel, i) of travels" :key="travel.id"
          v-bind="{ travel }"
      />

    </div>

    <div v-else>
      <div class="p-4 mb-4 text-sm rounded-lg bg-blue-50" role="alert">
        <b>No way!</b>
        Seems there are no travels available at the moment. Grab a coffee and come back in 5 minutes ☺️
      </div>
    </div>
  </div>

</template>
