<template>
  <q-layout class="bg-image">
    <q-page-container>
      <q-page class="flex flex-center" padding>
        <q-card bordered class="my-login no-shadow q-pa-lg">
          <q-item class="q-mt-md">
            <q-item-section>
              <q-item-label class="text-h4">Add an account</q-item-label>
            </q-item-section>
          </q-item>

          <q-card-section class="q-mt-sm">
            <q-uploader
              :hide-upload-btn="true"
              ref="uploadRef"
              :multiple="false"
              label="Upload Image"
              :headers="[
                { name: 'id', value: id },
                { name: 'createdById', value: id },
              ]"
              bordered
              flat
              color="primary"
              fieldName="files"
              class="full-width q-mb-lg"
              url="http://localhost:3030/upload-profile"
            >
            </q-uploader>
            <q-select
              v-model="type"
              :options="['user', 'admin']"
              label="Type"
            />
            <q-input v-model="firstName" label="First Name" />
            <q-input v-model="middleName" label="Middle Name" />
            <q-input v-model="lastName" label="Last Name" />
            <q-input v-model="completeAddress" label="Complete Address" />
            <q-input v-model="contactNumber" label="Contact Number" />
            <q-select
              v-model="gender"
              :options="['Male', 'Female']"
              label="Gender"
            />
            <q-input
              ref="emailRef"
              v-model="email"
              label="Email"
              :rules="[(val) => !!val || 'Username is required']"
            />
            <q-input
              ref="passwordRef"
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              label="Password"
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
              :rules="[(val) => !!val || 'Password is required']"
              v-model="securityQuestions"
              :options="securityQuestionsOptions"
              label="Security Question"
            />
            <q-input
              ref="answerRef"
              :rules="[(val) => !!val || 'Answer is required']"
              v-model="answer"
              label="Answer"
            />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn to="users" outline color="primary">Go back</q-btn>
            <q-btn
              @click="signUp()"
              :loading="isLoading"
              :disable="isLoading"
              unelevated
              color="primary"
              >Sign up</q-btn
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
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const completeAddress = ref("");
const contactNumber = ref("");
const gender = ref("");
const email = ref("");
const emailRef = ref(null);
const password = ref("");
const passwordRef = ref(null);
const isLoading = ref(false);
const isPwd = ref(true);
const uploadRef = ref(null);
const answer = ref("");
const securityQuestions = ref("");
const type = ref("user");
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
function signUp() {
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
    const isEquipmentCreated = ref(false);
    isLoading.value = true;
    const user = {
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      completeAddress: completeAddress.value,
      gender: gender.value,
      contactNumber: contactNumber.value,
      type: type.value,
      imagePath: "",
      securityQuestions: securityQuestions.value,
      answer: answer.value,
    };

    app.$feathersClient
      .service("users")
      .create(user)
      .then((response) => {
        id.value = response._id;
        $q.notify({
          position: "top",
          color: "positive",
          timeout: 2000,
          icon: "check",
          message: "You have successfully created an account.",
        });
        isLoading.value = false;
        isEquipmentCreated.value = true;
        app.$router.push("/users");
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

    watch(isEquipmentCreated, (value) => {
      if (value) {
        uploadRef.value.upload();
      }
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
