<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-primary q-mb-md">List of rentals</div>
    <q-tabs
      v-model="status"
      class="text-primary q-mb-md"
      @click="loadRequests()"
    >
      <q-tab name="Pending" label="Pending" />
      <q-tab name="Open" label="Open" />
      <q-tab name="To be started" label="To be started" />
      <q-tab name="Delivered" label="Delivered" />
      <q-tab name="To be returned" label="To be returned" />
      <q-tab name="Returned" label="Returned" />
    </q-tabs>

    <q-input
      style="max-width: 600px"
      v-model="search"
      outlined
      dense
      class="q-mb-md"
      label="Search.."
    >
      <template v-slot:after>
        <q-btn @click="loadRequests()" color="primary" icon="search" />
      </template>
    </q-input>

    <q-list bordered separator>
      <q-item
        v-for="(request, index) in requests.data"
        clickable
        :key="index"
        @click="
          selectedRequest = request;
          isLayoutOpen = true;
        "
      >
        <q-item-section avatar>
          <q-avatar size="80px" rounded>
            <img :src="`http://localhost:3030/${request.imagePath}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-subtitle2">
          <q-item-label>
            Machinery:
            <span class="text-weight-bold text-primary">{{
              request.machinery
            }}</span></q-item-label
          >
          <q-item-label
            >brand:
            <span class="text-weight-bold text-primary">{{
              request.brand
            }}</span></q-item-label
          >
          <q-item-label
            >Qty:
            <span class="text-weight-bold text-primary">{{
              request.quantity
            }}</span></q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="isLayoutOpen">
      <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>{{ selectedRequest.machinery }} </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white" v-if="$user.type === 'admin'">
          <q-toolbar class="q-pa-xs">
            <div class="row justify-between full-width">
              <q-select
                outlined
                class="col-8"
                use-chips
                v-model="selectedRequest.status"
                :options="[
                  'Pending',
                  'Open',
                  'To be started',
                  'Delivered',
                  'To be returned',
                  'Returned',
                ]"
                label="Status"
              />
              <!-- <q-toolbar-title></q-toolbar-title> -->
              <q-btn
                push
                icon="update"
                padding="md sm"
                unelevated
                @click="updateStatus()"
                color="primary"
                label="Update Status"
              />
            </div>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page>
            <q-card flat
              ><q-img
                height="300px"
                :src="`http://localhost:3030/${selectedRequest.imagePath}`"
              />
              <q-card-section class="q-gutter-md">
                <q-input
                  label="Brand"
                  v-model="selectedRequest.brand"
                  readonly
                />
                <q-input
                  label="Year Acquired"
                  v-model="selectedRequest.yearAcquired"
                  readonly
                />
                <q-input
                  label="Capacity"
                  v-model="selectedRequest.capacity"
                  readonly
                />
                <q-input
                  label="Serial No."
                  v-model="selectedRequest.serialNo"
                  readonly
                />
                <q-input
                  label="Stocks"
                  v-model="selectedRequest.stocks"
                  readonly
                />
                <q-input
                  label="Quantity"
                  v-model="selectedRequest.quantity"
                  readonly
                />
                <q-input
                  label="Remarks"
                  v-model="selectedRequest.remarks"
                  readonly
                />
              </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, getCurrentInstance } from "vue";
const app = getCurrentInstance().appContext.config.globalProperties;
const status = ref("Pending");
const requests = ref({});
const isLayoutOpen = ref(false);
const selectedRequest = ref({});
const search = ref("");
const $q = useQuasar();

onMounted(() => {
  loadRequests();
});

function loadRequests() {
  let query = {
    status: status.value,
    $limit: 50000,
    $sort: {
      createdAt: -1,
    },
  };

  if (app.$user.type === "user") {
    query["user._id"] = app.$user._id;
  }

  if (search.value !== "") {
    query.$search = search.value;
  }

  app.$feathersClient
    .service("requests")
    .find({ query })
    .then((response) => {
      requests.value = response;
      console.log("response", response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateStatus() {
  const request = {
    status: selectedRequest.value.status,
    updatedBy: app.$user,
  };
  app.$feathersClient
    .service("requests")
    .patch(selectedRequest.value._id, request)
    .then((response) => {
      isLayoutOpen.value = false;
      $q.notify({
        position: "top",
        color: "positive",
        timeout: 2000,
        icon: "check",
        message: "Status has been updated successfully.",
      });

      console.log("response", response);
    })
    .catch((error) => {
      isLayoutOpen.value = false;
      console.log(error);
    });
}
</script>
