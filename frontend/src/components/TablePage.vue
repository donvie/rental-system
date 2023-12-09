<template>
  <div>
    <!-- selection="single" -->
    <q-table
      bordered
      flat
      @row-click="onRowClick"
      :title="title"
      :rows="rows"
      title-class="text-h5"
      :columns="columns"
      row-key="_id"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, getCurrentInstance, computed } from "vue";

const props = defineProps({
  title: String,
  columns: Array,
  serviceName: String,
  serviceEquality: Object,
  serviceSort: Object,
});

const app = getCurrentInstance().appContext.config.globalProperties;

const selected = ref([]);
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const pagination = ref({
  sortBy: "",
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
});
const $q = useQuasar();

// emulate ajax call
// SELECT * FROM ... WHERE...LIMIT...
async function fetchFromServer(startRow, count, filter, sortBy, descending) {
  let query = {
    $limit: count,
    $skip: startRow,
    $sort: {},
  };

  // handle filter
  if (filter) {
    query.$search = filter;
  }

  // handle sortBy
  if (sortBy) {
    query.$sort[sortBy] = descending ? 1 : -1;
  }

  let response = {
    data: [],
    total: 0,
  };

  try {
    response = await app.$feathersClient.service("users").find({ query });
    console.log("Data", response);
  } catch (error) {
    console.error("error", error);
  }

  return response;
}

async function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;
  // ...and turn on loading indicator
  loading.value = true;

  // get all rows if "All" (0) is selected
  const fetchCount =
    rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

  // calculate starting row of data
  const startRow = (page - 1) * rowsPerPage;

  // fetch data from "server"
  const returnedData = await fetchFromServer(
    startRow,
    fetchCount,
    filter,
    sortBy,
    descending
  );
  console.log("returnedData", returnedData);

  // console.log('returnedData', returnedData.data.map(data => data.project))
  // clear out existing data and add new
  rows.value = returnedData.data;

  // update rowsCount with appropriate value
  pagination.value.rowsNumber = returnedData.total;

  // Update local pagination object
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;

  // ...and turn of loading indicator
  loading.value = false;
}

function loadRequest() {
  // get initial data from server (1st page)
  onRequest({
    pagination: pagination.value,
    filter: undefined,
  });
}

function onRowClick(evt, row, index) {}

onMounted(() => {
  loadRequest();
});
</script>
