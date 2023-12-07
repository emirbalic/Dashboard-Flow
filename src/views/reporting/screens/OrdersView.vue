<template>
  <!-- <div class="settings-screen"> -->
  <header>
    <span class="title">
      Reporting / Orders
    </span>

    <button class="button is-primary" style="margin-right: 2.8rem;" @click="openCreateModal">
      <Plus_Icon class="nav_icon" />
      New order
    </button>
  </header>


  <!-- @click="closeDropdown" -->
  <div class="body">
    <div class="filters">
      <div class="filter-wrapper">
        <p>Shipped country:</p>
        <!--  -->
        <select id="select" v-model="filteredCountry">
          <option value="all">All countries</option>
          <option v-for="(country, i) in countries" :key="i" :value="country">
            {{ country }}</option>
        </select>
      </div>
      <div class="filter-wrapper">
        <p>Shipped city:</p>
        <!-- v-model="selectedService" id="select" -->
        <select v-model="filteredCity">
          <option value="all">All cities</option>
          <option v-for="(city, i) in cities" :key="i" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
      <div class="filter-wrapper">
        <p>Search:</p>
        <input type="text" placeholder="Search on values" class="attach_input" v-model="search"
          @keyup.enter="filterList" />
        <button class="attach_button" @click="filterList">
          <Search_Icon class="btn-icon" />
        </button>
      </div>
      <div class="filter-wrapper">
        <p>Refresh:</p>
       <button class="refresh_button" @click="refreshList">REFRESH</button>
      </div>
    </div>

    <!-- after creating table -->
    <create-order-modal v-if="isCreateModalVisible" @close-modal="closeModal" @update-list="updateList">
    </create-order-modal>

    <!-- after creating create order modal -->
    <confirm-delete-modal v-if="isDeleteModalVisible" :entity-type="ENTITY_TYPE" :entity-title="entityTitle"
      @close-modal="closeModal" @handle-delete="handleDeleteRecord">
    </confirm-delete-modal>


    <!-- after creating create order modal -->
    <edit-order-modal v-if="isEditModalVisible" @close-modal="closeModal" :shipped-name="shippedName"
      :shipped-address="shippedAddress" :shipped-city="shippedCity" :shipped-country="shippedCountry"
      :shipped-postal-code="shippedPostalCode" @handle-edit="handleEditRecord">
    </edit-order-modal>


    <h3>System found {{ orders?.length }} orders</h3>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Order date<Sorting_Icon style="vertical-align: -5px; margin-left: 5px;"></Sorting_Icon>
          </th>
          <th>Customer Name</th>
          <th>Product Name</th>
          <th>Required Date</th>
          <!-- <th>Shipped Date</th> -->
          <!-- <th>Shipped Via</th> -->
          <th>Shipped Name</th>
          <th>Shipped Address</th>

          <th>Shipped Postal Code</th>
          <th>Shipped City</th>
          <!-- <th>Shipped Region</th> -->
          <th>Shipped Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- @click="openDetails() -->
        <tr v-for="(item, i) in orders" :key="i">

          <td @click=openDetails(item)>{{ item.id }}</td>
          <td @click=openDetails(item)>{{ formatDate(item.order_date) }}</td>
          <td @click=openDetails(item)>{{ item.customer.last_name }}</td>
          <td @click=openDetails(item)>{{ item.product.product_name }}</td>
          <td @click=openDetails(item)>{{ formatDate(item.required_date) }}</td>
          <td @click=openDetails(item)>{{ item.shipped_name }}</td>
          <td @click=openDetails(item)>{{ item.shipped_address }}</td>
          <td @click=openDetails(item)>{{ item.shipped_postal_code }}</td>
          <td @click=openDetails(item)>{{ item.shipped_city }}</td>
          <td @click=openDetails(item)>{{ item.shipped_country }}</td>
          <td>
            <span>

              <Edit_Icon class="table_icon" @click="openEditModal(item.id, item.shipped_name, item.shipped_address, item.shipped_city,
                item.shipped_postal_code, item.shipped_country)" />
            </span>
            <span style="margin-left: .8rem;" @click="() => openDeleteModal(item.id, item.id)">
              <Trash_Icon class="table_icon" />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pagination :current-page="currentPage" :is-tab-changed="isTabChanged" :count="count" :number-of-pages="numberOfPages"
    @reset-tab="resetTabs" @update-page="updatePage" @update-table-size="updateTableSize"></pagination>
</template>

<script lang="ts">
import { onBeforeMount, computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
// import dayjs from 'dayjs';

import { deleteRecordFromOrders, editRecordInOrders, loadOrders } from '@/api/reporting';


import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Search_Icon from '@/assets/icons/Search_Icon.vue';
import { IOrder } from '@/models/IOrder';

import Pagination from '@/components/common/Pagination.vue';


import CreateOrderModal from '../modals/CreateOrderModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import EditOrderModal from '../modals/EditOrderModal.vue';
import router from '@/router';
import { formatDate } from '@/composables/util'
// import { extractValues } from '@/composables/util'

import { loadCountries } from '@/api/common';
import { loadCities } from '@/api/common';


export default defineComponent({
  components: {
    CreateOrderModal,
    ConfirmDeleteModal,
    EditOrderModal,

    Search_Icon,
    Edit_Icon,
    Pagination,
    Plus_Icon,
    Sorting_Icon,
    Trash_Icon
  },
  setup() {

    let assignPage = ref();

    let currentPage = ref(
      assignPage.value === undefined ? 1 : assignPage.value
    );

    let isTabChanged = ref<boolean>(false);
    const updateRange = () => {
      currentPage.value = 1;
      updateList();
    };

    const numberOfPages = computed(() => {
      const data = store.getters['actionlist/getNumberOfPages'];
      return Number(data);
    });
    let maxPagesShown = ref(3);
    let perPage = ref(10);
    const pagesShown = computed(() => {
      return maxPagesShown.value <= numberOfPages.value - currentPage.value
        ? maxPagesShown.value
        : numberOfPages.value - currentPage.value + 1;
    });

    const count = computed(() => {
      const data = store.getters['actionlist/getCount'];
      return Number(data);
    });

    const updatePage = (page: number) => {
      if (page <= 0 || page > numberOfPages.value) return;
      currentPage.value = page;
      updateList();
    };

    const updateTableSize = (pageSize: any) => {
      perPage.value = pageSize.value;
      updateList();
      updateRange();
    };

    const resetTabs = () => {
      isTabChanged.value = false;
    };


    // const extractValues = (data: any) => {
    //   var names = data.map( (item: any) => {
    //     return item['shipped_city'];
    //   });
    //   return names
    // }
    const cities = ref();

    const getCities = async () => {



      let data: any = await loadCities();

      // var names = extractValues(data);
      var names = data.map((item: any) => {
        return item['shipped_city'];
      });

      cities.value = names;
      // console.log(cities.value);
      // console.log(names);


    }
    const countries = ref();

    const getCountries = async () => {

      let data: any = await loadCountries();
      var names = data.map((item: any) => {
        return item['shipped_country'];
      });
      // var names = extractValues(data);
      countries.value = names;
      // console.log(names);
      // console.log(countries.value);


    }

    const store = useStore();

    const isCreateModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isEditModalVisible = ref(false);


    const ENTITY_TYPE = 'order with ID ';
    const entityTitle = ref()


    const orderIdToDelete = ref('');

    const orderIdToUpdate = ref('');

    const closeModal = () => {


      isCreateModalVisible.value = false;
      isDeleteModalVisible.value = false;
      isEditModalVisible.value = false;

      orderIdToDelete.value = '';

    };

    const shippedName = ref('');
    const shippedPostalCode = ref('');
    const shippedCountry = ref('');
    const shippedCity = ref('');
    const shippedAddress = ref('');

    const setDataForDetailsPage = (item: IOrder) => {
      return store.dispatch('orderManagement/setOrderDetails', {
        ...item,
      });
    };

    const openDetails = (item: IOrder) => {
      let id = item.id

      setDataForDetailsPage(item);

      router.push({
        name: 'order-details',
        params: {

          id,

        }
      })
      // console.log('going to details');

    }

    // option: string, id: number, type: string
    const openEditModal = (id: string, name: string, address: string, city: string, postalCode: string, country: string) => {
      shippedName.value = name;
      shippedAddress.value = address;
      shippedCity.value = city;
      shippedPostalCode.value = postalCode;
      shippedCountry.value = country;
      orderIdToUpdate.value = id;

      isEditModalVisible.value = true;

    }

    const openDeleteModal = (id: string, title: string) => {
      entityTitle.value = title;
      isDeleteModalVisible.value = true;
      orderIdToDelete.value = id;

      // console.log('should open delete now?', isDeleteModalVisible.value)
    };

    const handleDeleteRecord = () => {
      isDeleteModalVisible.value = false;
      //test your catch with
      deleteRecordFromOrders('15')
      deleteRecordFromOrders(orderIdToDelete.value)
        .then(() => {
          updateList();
        })
        .catch((error) => console.log(error))

      // console.log('deleting order nr. ',orderIdToDelete.value);


      //   showNotice({
      //     props: {
      //       type: 'success',
      //       duration: 5000,
      //       message: `Successfully deleted a record`,
      //     },
      //   });
      // });
    };
    const handleEditRecord = (editedOrder: any) => {
      isEditModalVisible.value = false;



      editRecordInOrders(
        orderIdToUpdate.value,
        editedOrder)
        // .then(() => {
        //   showNotice({
        //     props: {
        //       type: 'success',
        //       duration: 5000,
        //       message: `Successfully updated description`,
        //     },
        //   });
        // })
        .then(() => {
          closeModal();
          updateList();
          orderIdToUpdate.value = '';
        })
        .catch(err => console.log(err)
        );
    };



    //   const rules = computed(() => {
    //   let data = store.getters['ruleManagement/getRules'];
    //   if (!data) return

    //   // data.sort((a: any, b: any) => parseInt(a.priority) - parseInt(b.priority));

    //   // data.forEach((record: IOrder) => {

    //   //   switch (record.type) {
    //   //     case "HLR_check":
    //   //       record.type_short = "Failed HLR check";
    //   //       break;
    //   //     case "Number_format":
    //   //       record.type_short = "Invalid number format";
    //   //       break;
    //   //     case "Number_matching":
    //   //       record.type_short = "Number matching";
    //   //       break;

    //   //   }
    //   // });

    //   let formattedData: any[] = []

    //   // data.forEach((e: any) => {
    //   //   if (e.services.indexOf(selectedService.value) >= 0 || selectedService.value === 'all' || e.services.length === 0) {
    //   //     formattedData.push(e)
    //   //   }
    //   // })
    //   return formattedData;
    // });

    // const orders = ref();
    const orders = computed(() => {
      let data = store.getters['orderManagement/getOrders'];
      // console.log('debugging data... ', data);

      if (!data) return

      return data;
    });

    const filteredCountry = ref('');
    const filteredCity = ref('');
    const search = ref('');

    const updateList = async () => {

      // ====== and this is now obsolete for we are using the store
      // // this is just because of pagination, originaly do the one line only
      // let data: any = await loadOrders();
      // orders.value = data.results;

      //   console.log('filteredCountry', filteredCountry.value);
      // console.log('filteredCity', filteredCity.value);
      // console.log('search', search.value);

      return Promise.allSettled([
        store.dispatch('orderManagement/setOrders', {
          filteredCountry: filteredCountry.value,
          filteredCity: filteredCity.value,
          search: search.value
        }),
      ]);
    }

    const filterList = () => {
      
      updateList()
    }
    const refreshList = () => {
      filteredCountry.value = '';
      filteredCity.value = '';
      search.value = '';

      updateList()
    }

    const openCreateModal = () => {
      // console.log('opened');

      isCreateModalVisible.value = true;

    };

    // const closeDropdown = () => {
    //   // console.log('closed dropdown');
    //   // closeModal()
    // };

    onBeforeMount(() => {
      // console.log(`the component is still not mounted.`)
      updateList()
      getCities()
      getCountries()
    })

    return {

      currentPage,
      isTabChanged,
      count,
      numberOfPages,
      resetTabs,
      updatePage,
      updateTableSize,

      ENTITY_TYPE,
      entityTitle,

      cities,
      countries,

      isCreateModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,

      orders,

      filteredCountry,
      filteredCity,
      search,
      // const ruleId = ref<number>();

      shippedName,
      shippedAddress,
      shippedCity,
      shippedCountry,
      shippedPostalCode,

      // closeDropdown,
      openDetails,
      refreshList,

      closeModal,
      filterList,
      formatDate,
      openEditModal,
      handleDeleteRecord,
      handleEditRecord,
      openDeleteModal,
      openCreateModal,
      updateList
    }
  }
})
</script>

<style lang="scss" scoped>
// .attach_button {
//     margin-left: 0px;
//     border: none;
//     color: white;
//     background-color: $color-brand-1;
//     border-radius: 0 10px 10px 0;
//     width: 4rem;
//     height: 3.5rem;

//     &:hover {
//         background-color: $color-brand-action-1;
//         border-color: $color-brand-action-1;
//         cursor: pointer;
//     }
// }
</style>