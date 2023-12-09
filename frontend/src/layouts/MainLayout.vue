<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="headerCustomStyle">
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" to="/">
          <q-icon name="agriculture" size="42px" />
        </q-btn>

        <q-toolbar-title>FARM EQUIPMENT RENTAL SYSTEM </q-toolbar-title>

        <q-btn flat>
          <q-avatar size="42px" class="q-mr-xs">
            <img :src="`http://localhost:3030/${$user.imagePath}`" />
          </q-avatar>
          <span>{{ $user.firstName.charAt(0) }}. {{ $user.lastName }}</span>
          <q-menu>
            <q-list style="min-width: 350px">
              <q-item clickable v-close-popup to="/" exact>
                <q-item-section avatar>
                  <q-icon color="primary" name="home" />
                </q-item-section>
                <q-item-section>Home</q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="/profile" exact>
                <q-item-section avatar>
                  <q-icon color="primary" name="person" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="/rentals" exact>
                <q-item-section avatar>
                  <q-icon color="primary" name="history" />
                </q-item-section>
                <q-item-section>Rentals</q-item-section>
              </q-item>

              <q-item
                v-if="$user.type === 'admin'"
                clickable
                v-close-popup
                to="/users"
                exact
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="group" />
                </q-item-section>
                <q-item-section>Users</q-item-section>
              </q-item>

              <q-item clickable v-close-popup exact @click="logOut()">
                <q-item-section avatar>
                  <q-icon color="primary" name="logout" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer flat class="bg-transparent">
      <q-card class="q-mt-md row no-shadow" bordered>
        <q-card-section class="col-12 text-center q-pa-lg">
          <!-- <q-btn icon="fab fa-github" flat dense color="grey-8"></q-btn>
          <q-btn icon="fab fa-facebook" flat dense color="grey-8"></q-btn>
          <q-btn icon="fab fa-twitter" flat dense color="grey-8"></q-btn>
          <q-btn icon="fab fa-instagram" flat dense color="grey-8"></q-btn>
          <br /> -->

          <div class="text-body1 q-mt-sm text-grey-8 text-weight-bold">
            Copyright ©, 2023 FARM EQUIPMENT RENTAL SYSTEM, All Rights Reserved
          </div>
        </q-card-section>
      </q-card>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, getCurrentInstance } from "vue";
const app = getCurrentInstance().appContext.config.globalProperties;
const $q = useQuasar();

function logOut() {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to logout?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      app.$feathersClient.logout().then(() => {
        app.$user = null;
        app.$router.push("/login");
      });
      // console.log('>>>> OK')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}
</script>

<style lang="sass" scoped>
.headerCustomStyle
  height: 57px !important
  display: flex
  align-items: center !important
</style>
