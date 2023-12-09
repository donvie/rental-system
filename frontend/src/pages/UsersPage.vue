<template>
  <q-page padding>
    <div class="text-h5 text-primary q-mb-md">List of users</div>
    <q-btn
      icon="add"
      label="Add an account"
      color="primary"
      class="q-mb-md"
      to="register"
    />
    <TablePage
      :serviceEquality="serviceEquality"
      :serviceSort="serviceSort"
      :columns="columns"
      :title="'List of users'"
    >
    </TablePage>
  </q-page>
</template>

<script>
export default {
  name: "PAR",
};
</script>

<script setup>
import TablePage from "src/components/TablePage.vue";

const columns = [
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: "firstName",
    sortable: true,
  },
  {
    name: "middleName",
    label: "Middle Name",
    align: "left",
    field: "middleName",
    sortable: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    align: "left",
    field: "lastName",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "completeAddress",
    label: "Complete Address",
    align: "completeAddress",
    field: "completeAddress",
    sortable: true,
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    align: "contactNumber",
    field: "contactNumber",
    sortable: true,
  },
  {
    name: "type",
    label: "Type",
    align: "type",
    field: "type",
    sortable: true,
  },
];

const serviceEquality = {};

const serviceSort = {};
</script>
