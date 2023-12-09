<template>
  <div class="q-pa-md flex flex-center">
    <q-card style="width: 500px">
      <q-list>
        <q-item-label header class="text-h5 text-primary">Profile</q-item-label>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="96px">
              <img :src="`http://localhost:3030/${$user.imagePath}`" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Profile Picture </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-uploader
              :hide-upload-btn="true"
              ref="uploadRef"
              label="Change Profile"
              :headers="[
                { name: 'id', value: id },
                { name: 'createdById', value: id },
              ]"
              bordered
              flat
              color="primary"
              fieldName="files"
              class="full-width"
              url="http://localhost:3030/upload-profile"
            >
            </q-uploader>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input label="First Name" v-model="currentUser.firstName"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input label="Middle Name" v-model="currentUser.middleName"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input label="Last Name" v-model="currentUser.lastName"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input label="Email" v-model="currentUser.email"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                label="Complete Address"
                v-model="currentUser.completeAddress"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-select
                v-model="currentUser.gender"
                :options="['Male', 'Female']"
                label="Gender"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                label="Contact Number"
                v-model="currentUser.contactNumber"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                class="q-mb-sm"
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                label="Update password"
              >
                <template v-slot:append v-if="password && password.length > 0">
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-btn
                @click="updateUser()"
                class="full-width"
                label="Update "
                color="primary"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, getCurrentInstance, watch } from "vue";

const $q = useQuasar();
const app = getCurrentInstance().appContext.config.globalProperties;
const id = ref("");
const currentUser = ref(app.$user);
const isLoading = ref(false);
const uploadRef = ref(null);
const isPwd = ref(true);

const password = ref("");

function updateUser() {
  const isEquipmentUpdated = ref(false);
  const user = {
    firstName: currentUser.value.firstName,
    middleName: currentUser.value.middleName,
    lastName: currentUser.value.lastName,
    email: currentUser.value.email,
    completeAddress: currentUser.value.completeAddress,
    gender: currentUser.value.gender,
    contactNumber: currentUser.value.contactNumber,
  };

  if (password.value !== "") {
    user.password = password.value;
  }

  app.$feathersClient
    .service("users")
    .patch(currentUser.value._id, user)
    .then((response) => {
      $q.notify({
        position: "top",
        color: "positive",
        timeout: 2000,
        icon: "check",
        message: "Profile has been successfully updated.",
      });
      id.value = response._id;
      isEquipmentUpdated.value = true;
      isLoading.value = false;
    })
    .catch((e) => {
      console.error("Authentication error", e);
      $q.notify({
        position: "top",
        color: "negative",
        timeout: 2000,
        icon: "error",
        message: "Error!",
      });
      isLoading.value = false;
    });

  watch(isEquipmentUpdated, (value) => {
    if (value) {
      uploadRef.value.upload();
    }
  });
}
</script>
