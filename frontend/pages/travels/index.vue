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

      <Alert
          level="info"
          message="Seems there are no travels available at the moment. Grab a coffee and come back in 5 minutes ☺️"
      />

    </div>
  </div>

</template>

<script setup lang="ts">

import TravelApi from "../../api/TravelApi";

const travels = ref([])

TravelApi.findAll().then((results) => {
  travels.value = results
})

// console.log(DateTime.serialize('2024-06-01'));

</script>
