<template>
  <q-page>
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg746i7C5QRVIbW5ddSfHTH9Gr_6UlWBHGIQ&usqp=CAU"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-JH6hMkjRt3vx2V4MlFxds5f1322jXa-Pw&usqp=CAU"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://png.pngtree.com/background/20210709/original/pngtree-green-organic-food-ecological-farm-poster-background-material-picture-image_854784.jpg"
      />
    </q-carousel>

    <div class="q-pa-md">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card
          class="my-card"
          v-for="(equipment, index) in equipments"
          :key="index"
          @click="isLayoutOpen = true"
        >
          <q-img :src="`http://loremflickr.com/640/480/transport?${index}`" />

          <q-card-section>
            <div class="text-subtitle1 text-primary">
              {{ equipment.machinery }}
            </div>
            <div class="text-subtitle2">
              Brand:
              <span class="text-weight-bold text-primary">{{
                equipment.brand
              }}</span>
            </div>
            <div class="text-subtitle2">
              Available Stocks:
              <span class="text-weight-bold text-primary">{{
                equipment.stocks
              }}</span>
            </div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn unelevated color="primary" class="full-width"> View </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="isLayoutOpen">
      <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>four wheel drive tractor</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar class="q-pa-xs">
            <q-toolbar-title></q-toolbar-title>
            <q-btn
              push
              icon="send"
              padding="md sm"
              unelevated
              @click="islayout = true"
              color="primary"
              label="Request now"
            />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page>
            <q-card flat>
              <q-img :src="`http://loremflickr.com/640/480/transport`" />

              <q-card-section>
                <div class="text-subtitle2">
                  Brand:
                  <span class="text-weight-bold text-primary">kubota</span>
                </div>
                <div class="text-subtitle2">
                  Year Acquired:
                  <span class="text-weight-bold text-primary">2017</span>
                </div>
                <div class="text-subtitle2">
                  Capacity:
                  <span class="text-weight-bold text-primary">3608</span>
                </div>
                <div class="text-subtitle2">
                  Serial No:
                  <span class="text-weight-bold text-primary">N/A</span>
                </div>
                <div class="text-subtitle2">
                  Stocks: <span class="text-weight-bold text-primary">1</span>
                </div>
              </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>

    <q-dialog v-model="islayout">
      <!-- <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn flat @click="drawerR = !drawerR" round dense icon="menu" />
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar class="q-pa-xs">
            <q-toolbar-title></q-toolbar-title>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding> -->
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter details</div>
        </q-card-section>

        <q-card-section>
          <q-input
            type="number"
            filled
            v-model="quantity"
            label="Quantity"
            class="q-mb-md"
          />
          <q-input type="textarea" filled v-model="remarks" label="Remarks" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            push
            icon="save"
            padding="md sm"
            unelevated
            to="/history"
            color="primary"
            label="Send Request"
          />
        </q-card-actions>
      </q-card>
      <!-- </q-page>
        </q-page-container> -->
      <!-- </q-layout> -->
    </q-dialog>
  </q-page>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  watch,
  computed,
} from "vue";

const app = getCurrentInstance().appContext.config.globalProperties;

const slide = ref(1);
const autoplay = ref(true);
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const isLayoutOpen = ref(false);
const islayout = ref(false);
const quantity = ref(0);
const remarks = ref("");
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

onMounted(async () => {
  const response = await app.$feathersClient.service("equipments").find();
  console.log("dads", response);
  app.$feathersClient
    .service("equipments")
    .find({})
    .then((response) => {
      console.log("res", response);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
