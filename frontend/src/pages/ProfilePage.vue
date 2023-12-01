<template>
  <div class="q-pa-md flex flex-center">
    <q-card style="width: 500px">
      <q-list>
        <q-item-label header class="text-h5">Profile</q-item-label>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Name:</q-item-label>
            <q-item-label caption>Test TEst</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Contact Number:</q-item-label>
            <q-item-label caption>09457518654</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Email Address:</q-item-label>
            <q-item-label caption>test@yahoo.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Address:</q-item-label>
            <q-item-label caption
              >Brgy. 22 San Guillermo San Nicolas Ilocos Norte</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
