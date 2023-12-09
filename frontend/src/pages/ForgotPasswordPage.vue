<template>
  <q-layout class="bg-image">
    <q-page-container>
      <q-page class="flex flex-center" padding>
        <q-card bordered class="my-login no-shadow q-pa-lg">
          <q-item class="q-mt-md">
            <q-item-section>
              <q-item-label class="text-h4">Forgot Password</q-item-label>
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
            />
            <q-input
              ref="passwordRef"
              class="q-mb-sm"
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              label="New password"
              :rules="[(val) => !!val || 'Password is required']"
            >
              <template v-slot:append v-if="password && password.length > 0">
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-select
              ref="securityQuestionsRef"
              class="q-mb-sm"
              v-model="securityQuestions"
              :options="securityQuestionsOptions"
              label="Security Question"
              :rules="[(val) => !!val || 'Security question is required']"
            />
            <q-input
              ref="answerRef"
              class="q-mb-sm"
              v-model="answer"
              label="Answer"
              :rules="[(val) => !!val || 'Answer is required']"
            />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn to="login" outline color="primary">Back to login</q-btn>
            <q-btn
              @click="forgotPassword()"
              :loading="isLoading"
              :disable="isLoading"
              unelevated
              color="primary"
              >Change password</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, getCurrentInstance, watch } from "vue";

const id = ref("");
const $q = useQuasar();
const app = getCurrentInstance().appContext.config.globalProperties;
const email = ref("");
const emailRef = ref(null);
const password = ref("");
const passwordRef = ref(null);
const answer = ref("");
const securityQuestions = ref("");
const securityQuestionsOptions = [
  "In what city were you born?",
  "What is the name of your favorite pet?",
  "What is your mother's maiden name?",
  "What high school did you attend?",
  "What was the name of your elementary school?",
  "What was the make of your first car?",
  "What was your favorite food as a child?",
  "Where did you meet your spouse?",
  "What year was your father (or mother) born?",
];
const answerRef = ref("");
const securityQuestionsRef = ref("");
const isLoading = ref(false);
const isPwd = ref(true);
const uploadRef = ref(null);

function forgotPassword() {
  emailRef.value.validate();
  passwordRef.value.validate();
  answerRef.value.validate();
  securityQuestionsRef.value.validate();

  if (
    !emailRef.value.hasError ||
    !passwordRef.value.passwordRef ||
    !answerRef.value.answerRef ||
    !securityQuestionsRef.value.securityQuestionsRef
  ) {
    isLoading.value = true;
    app.$feathersClient
      .service("password-reset")
      .find({
        query: {
          email: email.value,
          password: password.value,
          securityQuestions: securityQuestions.value,
          answer: answer.value,
        },
      })
      .then((response) => {
        console.log("ress", response);
        if (response.message == "Password reset successfully") {
          $q.notify({
            position: "top",
            color: "positive",
            timeout: 2000,
            icon: "check",
            message: "Password has been changed successfully.",
          });
          console.log(response); // Handle the response from the server
        } else {
          $q.notify({
            position: "top",
            color: "negative",
            timeout: 2000,
            icon: "close",
            message: "Error! The details did not match our records.",
          });
        }
        isLoading.value = false;
      })
      .catch((error) => {
        $q.notify({
          position: "top",
          color: "negative",
          timeout: 2000,
          icon: "close",
          message: "Error! The details did not match our records.",
        });

        isLoading.value = false;
        console.error(error);
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
  height: auto

.bg-image
  background-image: linear-gradient(135deg, #598216 0%, #e5b2ca 100%)
</style>
