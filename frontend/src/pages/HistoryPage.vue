<template>
  <div class="q-pa-md">
    <q-tabs v-model="tab" class="text-primary">
      <q-tab name="mails" label="Pending" />
      <q-tab name="alarms" label="Open" />
      <q-tab name="movies" label="To be started" />
      <q-tab name="movies" label="Delivered" />
      <q-tab name="movies" label="To be returned" />
      <q-tab name="movies" label="Returned" />
    </q-tabs>

    <q-list bordered separator>
      <q-item v-for="(equipment, index) in equipments" :key="index">
        <q-item-section avatar>
          <q-avatar size="80px" rounded>
            <img :src="`http://loremflickr.com/640/480/transport?${index}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-subtitle2">
          <q-item-label
            >Machinery:
            <span class="text-weight-bold text-primary">{{
              equipment.machinery
            }}</span></q-item-label
          >
          <q-item-label
            >brand:
            <span class="text-weight-bold text-primary">{{
              equipment.brand
            }}</span></q-item-label
          >
          <q-item-label
            >Qty:
            <span class="text-weight-bold text-primary">{{
              equipment.stocks
            }}</span></q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("mails");
const equipments = ref([
  {
    machinery: "four wheel drive tractor",
    brand: "kubota",
    yearAcquired: "2017",
    capacity: "3608",
    serialNo: "N/A ",
    stocks: 1,
  },
  {
    machinery: "Harvester",
    brand: "kubota",
    yearAcquired: "2018",
    capacity: "dc70",
    serialNo: "N/A",
    stocks: 2,
  },
]);
</script>
