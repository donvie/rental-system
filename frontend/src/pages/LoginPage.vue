<template>
  <q-layout class="bg-image">
    <q-page-container>
      <q-page class="flex flex-center" padding>
        <q-card bordered class="my-login no-shadow q-pa-lg">
          <q-item class="q-mt-md">
            <q-item-section>
              <q-item-label class="text-h4">Log in</q-item-label>
              <q-item-label class="text-subtitle1">
                FARM EQUIPMENT RENTAL SYSTEM
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-card-section class="q-mt-sm">
            <q-input
              ref="emailRef"
              class="q-mb-sm"
              v-model="email"
              label="Email"
              :rules="[(val) => !!val || 'Username is required']"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              ref="passwordRef"
              class="q-mb-sm"
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              label="Password"
              :rules="[(val) => !!val || 'Password is required']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append v-if="password && password.length > 0">
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              label="Sign up"
              to="/signup"
              type="button"
              outline
              color="primary"
            />
            <q-btn
              @click="logIn()"
              :loading="isLoading"
              :disable="isLoading"
              unelevated
              color="primary"
              >Log in</q-btn
            >
          </q-card-actions>

          <q-card-actions align="center">
            <q-btn to="forgot-password" flat color="primary"
              >Forgot Password?</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, getCurrentInstance } from "vue";

const $q = useQuasar();
const app = getCurrentInstance().appContext.config.globalProperties;
const email = ref("");
const emailRef = ref(null);
const password = ref("");
const passwordRef = ref(null);
const isLoading = ref(false);
const isPwd = ref(true);

function logIn() {
  emailRef.value.validate();
  passwordRef.value.validate();

  if (!emailRef.value.hasError || !passwordRef.value.hasError) {
    isLoading.value = true;
    app.$feathersClient
      .authenticate({
        strategy: "local",
        email: email.value,
        password: password.value,
      })
      .then((data) => {
        app.$user = data.user;
        app.$router.push("/");
        console.log("data", data);
        $q.notify({
          position: "top",
          color: "positive",
          timeout: 2000,
          icon: "check",
          message: "You have successfully logged in.",
        });
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
  }
}
</script>

<style lang="sass" scoped>
.toolbar
  min-height: 36px
.my-login
  width: 100%
  max-width: 450px
  height: 460px

.bg-image
  background-image: linear-gradient(135deg, #598216 0%, #e5b2ca 100%)
</style>
