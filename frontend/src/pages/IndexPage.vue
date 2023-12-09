<template>
  <q-page>
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      height="300px"
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

    <div class="q-pa-lg">
      <div class="text-h5 text-primary q-mb-md">List of equipments</div>

      <q-input
        style="max-width: 600px"
        dense
        v-model="search"
        outlined
        class="q-mb-md"
        label="Search.."
      >
        <template v-slot:after>
          <q-btn @click="loadEquipments()" color="primary" icon="search" />
        </template>
      </q-input>

      <div class="row items-start q-gutter-md">
        <q-card
          v-if="$user.type === 'admin'"
          class="my-card flex flex-center"
          @click="
            action = 'add';
            selectedEquipment = {};
            isAddEquipmentLayoutOpen = true;
          "
        >
          <q-card-section align="center">
            <q-icon name="add" size="72px" color="primary" />
            <div class="text-subtitle1 text-primary text-weight-bold">
              Add Equipment
            </div>
          </q-card-section>
        </q-card>
        <q-card
          class="my-card"
          v-for="(equipment, index) in equipments.data"
          :key="index"
        >
          <q-img
            height="150px"
            :src="
              equipment.imagePath
                ? `http://localhost:3030/${equipment.imagePath}`
                : 'src/assets/noimage.png'
            "
          >
            <div
              class="absolute-top-right q-pa-none q-ma-none transparent"
              v-if="$user.type === 'admin'"
            >
              <q-btn
                text-color="primary"
                icon="edit"
                @click="
                  action = 'edit';
                  selectedEquipment = equipment;
                  isAddEquipmentLayoutOpen = true;
                "
                round
                class="q-mr-xs"
                color="white"
                dense
              />
              <q-btn
                text-color="negative"
                icon="delete"
                @click="deleteEquipment(equipment)"
                round
                color="white"
                dense
              />
            </div>
          </q-img>

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
            <q-btn
              @click="viewEquipment(equipment)"
              unelevated
              color="primary"
              class="full-width"
            >
              View
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="isLayoutOpen">
      <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>{{ selectedEquipment.machinery }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white" v-if="$user.type === 'user'">
          <q-toolbar class="q-pa-xs">
            <q-toolbar-title></q-toolbar-title>
            <q-btn
              push
              icon="send"
              padding="md sm"
              unelevated
              @click="
                quantity = 0;
                (remarks = ''), (islayout = true);
              "
              color="primary"
              label="Rent now"
            />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page>
            <q-card flat
              ><q-img
                height="300px"
                :src="`http://localhost:3030/${selectedEquipment.imagePath}`"
              />

              <q-card-section class="q-gutter-md">
                <div class="text-subtitle2">
                  Brand:
                  <span class="text-weight-bold text-primary">{{
                    selectedEquipment.brand
                  }}</span>
                </div>
                <div class="text-subtitle2">
                  Year Acquired:
                  <span class="text-weight-bold text-primary">{{
                    selectedEquipment.yearAcquired
                  }}</span>
                </div>
                <div class="text-subtitle2">
                  Capacity:
                  <span class="text-weight-bold text-primary">{{
                    selectedEquipment.capacity
                  }}</span>
                </div>
                <div class="text-subtitle2">
                  Serial No:
                  <span class="text-weight-bold text-primary">{{
                    selectedEquipment.serialNo
                  }}</span>
                </div>
                <div class="text-subtitle2">
                  Stocks:
                  <span class="text-weight-bold text-primary">{{
                    selectedEquipment.stocks
                  }}</span>
                </div>
              </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>

    <q-dialog v-model="islayout">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter details</div>
        </q-card-section>

        <q-card-section>
          <!-- {{ selectedEquipment.stocks < quantity }}
          {{ selectedEquipment.stocks }}
          {{ quantity }} -->
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
          <!-- :disable="selectedEquipment.stocks >= quantity" -->
          <q-btn
            push
            icon="save"
            padding="md sm"
            unelevated
            @click="creteRequest()"
            color="primary"
            label="Send Rent"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isAddEquipmentLayoutOpen">
      <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>{{
              action === "add" ? "Add Equipment" : "Edit equipment"
            }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar class="q-pa-xs">
            <q-toolbar-title></q-toolbar-title>
            <q-btn
              icon="save"
              v-if="action === 'add'"
              unelevated
              @click="addEquipment()"
              color="primary"
              label="Save"
            />
            <q-btn
              icon="save"
              v-if="action === 'edit'"
              unelevated
              @click="editEquipment()"
              color="primary"
              label="Save"
            />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <!-- <q-img
              v-if="action === 'edit'"
              class="q-mb-lg"
              height="300px"
              :src="`http://localhost:3030/${selectedEquipment.imagePath}`"
            /> -->

            <q-uploader
              :hide-upload-btn="true"
              ref="uploadRef"
              label="Upload Image"
              :headers="[
                { name: 'id', value: id },
                { name: 'createdById', value: $user._id },
              ]"
              bordered
              flat
              color="primary"
              fieldName="files"
              class="full-width q-mb-lg"
              url="http://localhost:3030/uploads"
            >
            </q-uploader>
            <q-input
              class="q-mb-lg"
              v-model="selectedEquipment.machinery"
              label="Machinery"
            />
            <q-input
              class="q-mb-lg"
              v-model="selectedEquipment.brand"
              label="Brand"
            />
            <q-input
              class="q-mb-lg"
              v-model="selectedEquipment.yearAcquired"
              label="Year Acquired"
            />
            <q-input
              class="q-mb-lg"
              v-model="selectedEquipment.capacity"
              label="Capacity"
            />
            <q-input
              class="q-mb-lg"
              v-model="selectedEquipment.serialNo"
              label="Serial No"
            />
            <q-input
              type="number"
              v-model="selectedEquipment.stocks"
              label="Stocks"
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  watch,
  computed,
} from "vue";

const $q = useQuasar();

const app = getCurrentInstance().appContext.config.globalProperties;
const id = ref("");
const search = ref("");
const slide = ref(1);
const autoplay = ref(true);
const isAddEquipmentLayoutOpen = ref(false);
const isLayoutOpen = ref(false);
const islayout = ref(false);
const quantity = ref(0);
const remarks = ref("");
const action = ref("");
const selectedEquipment = ref({
  machinery: "",
  brand: "",
  yearAcquired: "",
  capacity: "",
  serialNo: "",
  stocks: "",
});
const equipments = ref([]);
const uploadRef = ref(null);
onMounted(() => {
  loadEquipments();
});

function loadEquipments() {
  let query = {
    $limit: 50000,
    $sort: {
      createdAt: -1,
    },
  };
  if (search.value !== "") {
    query.$search = search.value;
  }

  app.$feathersClient
    .service("equipments")
    .find({ query })
    .then((response) => {
      equipments.value = response;
      console.log("response", response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addEquipment() {
  const isEquipmentCreated = ref(false);

  app.$feathersClient
    .service("equipments")
    .create({
      machinery: selectedEquipment.value.machinery,
      brand: selectedEquipment.value.brand,
      yearAcquired: selectedEquipment.value.yearAcquired,
      capacity: selectedEquipment.value.capacity,
      serialNo: selectedEquipment.value.serialNo,
      stocks: selectedEquipment.value.stocks,
      createdAt: Date.now(),
      createdBy: app.$user,
    })
    .then((response) => {
      id.value = response._id;
      isEquipmentCreated.value = true;
    })
    .catch((error) => {
      console.error("Error creating equipment:", error);
    });

  watch(isEquipmentCreated, (value) => {
    if (value) {
      uploadRef.value.upload();
      isAddEquipmentLayoutOpen.value = false;
      $q.notify({
        position: "top",
        color: "positive",
        timeout: 2000,
        icon: "check",
        message: "Equipment has been added successfully.",
      });
    }
  });
}

function editEquipment() {
  const isEquipmentUpdated = ref(false);

  app.$feathersClient
    .service("equipments")
    .patch(selectedEquipment.value._id, selectedEquipment.value)
    .then((response) => {
      id.value = response._id;
      isEquipmentUpdated.value = true;
    })
    .catch((error) => {
      console.error("Error creating equipment:", error);
    });

  watch(isEquipmentUpdated, (value) => {
    if (value) {
      uploadRef.value.upload();
      isAddEquipmentLayoutOpen.value = true;
      $q.notify({
        position: "top",
        color: "positive",
        timeout: 2000,
        icon: "check",
        message: "Equipment has been updated successfully.",
      });
    }
  });
}

function creteRequest() {
  const request = {
    machinery: selectedEquipment.value.machinery,
    brand: selectedEquipment.value.brand,
    yearAcquired: selectedEquipment.value.yearAcquired,
    capacity: selectedEquipment.value.capacity,
    serialNo: selectedEquipment.value.serialNo,
    stocks: selectedEquipment.value.stocks,
    imagePath: selectedEquipment.value.imagePath,
    equipmentId: selectedEquipment.value.equipmentId,
    quantity: quantity.value,
    remarks: remarks.value,
    status: "Pending",
    createdAt: Date.now(),
    user: app.$user,
  };

  app.$feathersClient
    .service("requests")
    .create(request)
    .then((response) => {
      islayout.value = false;
      isLayoutOpen.value = false;
      $q.notify({
        position: "top",
        color: "positive",
        timeout: 2000,
        icon: "check",
        message: "The rental has been booked successfully.",
      });

      console.log("response", response);
    })
    .catch((error) => {
      $q.notify({
        position: "top",
        color: "negative",
        timeout: 2000,
        icon: "error",
        message: "The booking process failed!",
      });
      console.log(error);
    });
}

function deleteEquipment(equipment) {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      app.$feathersClient
        .service("equipments")
        .remove(equipment._id)
        .then((response) => {
          console.log("response", response);
          $q.notify({
            position: "top",
            color: "positive",
            timeout: 2000,
            icon: "check",
            message: "Equipment has been deleted successfully.",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .onCancel(() => {})
    .onDismiss(() => {});
}

function viewEquipment(equipment) {
  selectedEquipment.value = equipment;
  isLayoutOpen.value = true;
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 350px
  max-width: 250px
</style>
