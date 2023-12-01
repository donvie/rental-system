<template>
  <q-page padding>
    <q-btn
      label="Back to home"
      to="/"
      icon="arrow_back"
      color="primary"
      outline
    />
    <q-list separator style="margin-bottom: 57px">
      <q-item-label header class="text-h6"
        >Cart {{ equipments.length }}</q-item-label
      >
      <q-item v-for="(equipment, index) in equipments" :key="index">
        <q-item-section side>
          <q-btn
            unelevated
            no-caps
            dense
            size="sm"
            icon="delete"
            flat
            color="negative"
          />
        </q-item-section>

        <q-item-section avatar>
          <q-avatar size="80px" rounded>
            <img :src="`http://loremflickr.com/640/480/transport?${n}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Machinery: {{ equipment.machinery }}</q-item-label>
          <q-item-label>brand: {{ equipment.brand }}</q-item-label>
          <q-item-label>Qty: {{ equipment.stocks }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn unelevated size="sm" round color="positive" icon="add" />
          <q-btn
            unelevated
            size="sm"
            round
            color="negative"
            class="q-mt-xs"
            icon="remove"
          />
        </q-item-section>
      </q-item>
      <!-- <q-item class="text-center">
        <q-item-section>
          <q-item-label> Basket is empty </q-item-label>
        </q-item-section>
      </q-item> -->
    </q-list>

    <div align="right">
      <q-btn
        unelevated
        size="17px"
        dense
        color="primary"
        label="Send Request"
      />
    </div>

    <!-- <q-dialog v-model="placeOrderLayout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-red">
          <q-toolbar>
            <q-btn flat v-close-popup dense color="white" icon="arrow_back" />
            <q-toolbar-title>Review Order</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn
              label="Place order"
              size="17px"
              class="full-width"
              no-caps
              color="red"
              dense
              unelevated
            />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page class="q-pa-lg">
            <q-list>
              <q-item-label header class="text-h6">Orders</q-item-label>
              <q-item v-for="n in 10" :key="n">
                <q-item-section avatar>
                  <q-avatar size="80px" rounded>
                    <q-img src="https://cdn.quasar.dev/img/quasar.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section v-if="cart.menu">
                  <q-item-label>Name: dada</q-item-label>
                  <q-item-label>Bundle: dadad</q-item-label>
                  <q-item-label caption>Price: Php dada</q-item-label>
                  <q-item-label caption>Qty: 3232</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator spaced />

            <q-list
              v-if="
                carts
                  .filter((cart) => cart.isChecked)
                  .some((cart) => cart.menu.type === 'Unlimited')
              "
            >
              <q-item-label header class="text-h6"
                ># of Customer(s) for Unlimited</q-item-label
              >
              <q-item
                v-for="discount in $sortBy(discounts, ['sort'])"
                :key="discount.id"
              >
                <q-item-section>
                  <q-item-label>
                    {{ discount.name }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ discount.discount }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <div class="text-grey-8 items-center row q-gutter-sm">
                    <q-btn
                      size="12px"
                      color="negative"
                      @click="discount.quantity--"
                      unelevated
                      dense
                      round
                      icon="remove"
                    />
                    <span>{{ discount.quantity }}</span>
                    <q-btn
                      size="12px"
                      color="positive"
                      @click="discount.quantity++"
                      unelevated
                      dense
                      round
                      icon="add"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator spaced />

            <q-list>
              <q-item-label header class="text-h6">Add-ons</q-item-label>
              <q-item v-for="addon in addOns" :key="addon.id">
                <q-item-section>
                  <q-item-label> Name: {{ addon.name }} </q-item-label>
                  <q-item-label caption>
                    Price: Php {{ addon.price }}
                  </q-item-label>
                  <q-item-label caption>
                    Qty: {{ addon.quantity }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-sm">
                    <q-btn
                      size="12px"
                      color="negative"
                      :disable="addon.quantity <= 0"
                      @click="addon.quantity--"
                      unelevated
                      dense
                      round
                      icon="remove"
                    />
                    <q-btn
                      size="12px"
                      color="positive"
                      @click="addon.quantity++"
                      unelevated
                      dense
                      round
                      icon="add"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <q-input
              color="red"
              class="q-mt-md"
              filled
              v-model="remarks"
              label="Remarks"
              type="textarea"
              placeholder="You can write here whether your order is dine in/ dine out."
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const isChecked = ref(false);

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
// import { sumBy } from "lodash";
// export default {
//   props: ["carts", "tableNumber"],
//   data() {
//     return {
//       remarks: "",
//       addOns: [],
//       discounts: [],
//       dine: "Dine in",
//       dineOptions: ["Dine in", "Dine out"],
//       placeOrderLayout: false,
//       sumBy,
//     };
//   },
//   mounted() {
//     this.$bind(
//       "menus",
//       this.$db.collection("menus").where("type", "==", "Add-ons")
//     ).then((addOns) => {
//       this.addOns = addOns;
//     });

//     this.$bind("discounts", this.$db.collection("discounts")).then(
//       (discounts) => {
//         this.discounts = discounts;
//       }
//     );
//   },
//   methods: {
//     checkoutOrder() {
//       if (
//         this.carts.filter(
//           (cart) => cart.isChecked && cart.menu.type === "Unlimited"
//         ).length > 4
//       ) {
//         this.$q.notify({
//           position: "top-left",
//           timeout: 1500,
//           icon: "warning",
//           message: "Choose more than 4 unlimited flavors only.",
//           color: "amber",
//         });
//       } else {
//         this.placeOrderLayout = true;
//       }
//     },
//     removeMenu(cartId) {
//       this.$db
//         .collection("carts")
//         .doc(cartId)
//         .delete()
//         .then(() => {})
//         .catch((error) => {});
//     },
//     placeOrder() {
//       // cordova.plugins.barcodeScanner.scan((result) => {
//       this.$q
//         .dialog({
//           title: "Table Number: " + this.tableNumber,
//           message: "Are you sure you want to place your order?",
//           ok: {
//             color: "red",
//             unelevated: true,
//           },
//           cancel: {
//             color: "red",
//             flat: true,
//           },
//           persistent: true,
//         })
//         .onOk(() => {
//           this.$db
//             .collection("orders")
//             .add({
//               tableNumber: this.tableNumber,
//               user: this.$q.localStorage.getItem("user"),
//               menus: this.carts
//                 .filter((cart) => cart.isChecked)
//                 .map((cart) => cart.menu),
//               discounts: this.discounts,
//               addOns: this.addOns,
//               status: "Pending",
//               remarks: this.remarks,
//               totalPrice: 0,
//               createdAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
//             })
//             .then(() => {
//               this.$q.notify({
//                 position: "top-left",
//                 timeout: 1500,
//                 icon: "check",
//                 message: "Order has been succesfully placed.",
//                 color: "positive",
//               });
//               this.$router.push("/order_history");
//             });
//         })
//         .onCancel(() => {})
//         .onDismiss(() => {});

//       // },function (error) {
//       //   this.$q.notify({
//       //     position: 'top-left',
//       //     timeout: 1500,
//       //     icon: 'close',
//       //     message: 'Scanning failed' + error,
//       //     color: 'negative'
//       //   })
//       // }, {
//       //   preferFrontCamera : false, // iOS and Android
//       //   showFlipCameraButton : true, // iOS and Android
//       //   showTorchButton : true, // iOS and Android
//       //   torchOn: false, // Android, launch with the torch switched on (if available)
//       //   saveHistory: true, // Android, save scan history (default false)
//       //   prompt : "Place a barcode inside the scan area", // Android
//       //   resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//       //   formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//       //   orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//       //   disableAnimations : true, // iOS
//       //   disableSuccessBeep: false // iOS and Android
//       // })
//     },
//   },
// };
</script>

<style></style>
