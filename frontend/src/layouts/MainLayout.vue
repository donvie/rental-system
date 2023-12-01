<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="headerCustomStyle">
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" to="/">
          <q-icon name="agriculture" size="42px" />
        </q-btn>

        <q-toolbar-title>FARM EQUIPMENT RENTAL SYSTEM</q-toolbar-title>

        <!-- <q-btn
          to="admin"
          flat
          v-close-popup
          round
          dense
          label="Admin"
          class="q-mr-md"
        >
        </q-btn> -->

        <!-- <q-btn
          to="basket"
          flat
          v-close-popup
          round
          dense
          icon="shopping_cart"
          class="q-mr-md"
        >
          <q-badge color="red" floating>4</q-badge>
        </q-btn> -->

        <q-btn icon="account_circle" flat label="T. Test">
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

              <q-item clickable v-close-popup to="/history" exact>
                <q-item-section avatar>
                  <q-icon color="primary" name="history" />
                </q-item-section>
                <q-item-section>History</q-item-section>
              </q-item>

              <q-item clickable v-close-popup exact to="login">
                <q-item-section avatar>
                  <q-icon color="primary" name="logout" to="login" />
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
          <q-btn icon="fab fa-github" flat dense color="grey-8"></q-btn>
          <q-btn icon="fab fa-facebook" flat dense color="grey-8"></q-btn>
          <q-btn icon="fab fa-twitter" flat dense color="grey-8"></q-btn>
          <q-btn icon="fab fa-instagram" flat dense color="grey-8"></q-btn>
          <br />

          <div class="text-body1 q-mt-sm text-grey-8 text-weight-bold">
            Copyright ©, 2023 FARM EQUIPMENT RENTAL SYSTEM, All Rights Reserved
          </div>
        </q-card-section>
      </q-card>
      <!-- <q-toolbar class="text-center">
        <q-toolbar-title class="text-caption"
          >Copyright ©, 2023 FARM EQUIPMENT RENTAL SYSTEM, All Rights
          Reserved</q-toolbar-title
        >
      </q-toolbar> -->
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.headerCustomStyle
  height: 57px !important
  display: flex
  align-items: center !important
</style>
