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
      <tbody >
        <!-- @click="openDetails() -->
        <tr  v-for="(item, i) in orders" :key="i" >
          
          <td @click=openDetails(item.id)>{{ item.id }}</td>
          <td @click=openDetails(item.id)>{{ formatDate(item.order_date) }}</td>
          <td @click=openDetails(item.id)>{{ item.customer.last_name }}</td>
          <td @click=openDetails(item.id)>{{ item.product.product_name }}</td>
          <td @click=openDetails(item.id)>{{ formatDate(item.required_date) }}</td>
          <td @click=openDetails(item.id)>{{ item.shipped_name }}</td>
          <td @click=openDetails(item.id)>{{ item.shipped_address }}</td>
          <td @click=openDetails(item.id)>{{ item.shipped_postal_code }}</td>
          <td @click=openDetails(item.id)>{{ item.shipped_city }}</td>
          <td @click=openDetails(item.id)>{{ item.shipped_country }}</td>
          <td >
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
</template>

<script lang="ts">
import { onBeforeMount, computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

import { deleteRecordFromOrders, editRecordInOrders, loadOrders } from '@/api/reporting';


import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import { IOrder } from '@/models/IOrder';

import CreateOrderModal from '../modals/CreateOrderModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import EditOrderModal from '../modals/EditOrderModal.vue';
import router from '@/router';
import formatDate from '@/composables/util'

export default defineComponent({
  components: {
    CreateOrderModal,
    ConfirmDeleteModal,
    EditOrderModal,

    Edit_Icon,
    Plus_Icon,
    Sorting_Icon,
    Trash_Icon
  },
  setup() {

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

    const orders = ref();
    const shippedName = ref('');
    const shippedPostalCode = ref('');
    const shippedCountry = ref('');
    const shippedCity = ref('');
    const shippedAddress = ref('');

   

    const openDetails = (id: string) => {
      router.push({
        name: 'order-details',
        params: {
        
          id,
        
        }
      })
      console.log('going to details');
      
    }

    // option: string, id: number, type: string
    const openEditModal = (id: string, name: string, address: string, postalCode: string, city: string, country: string) => {
      shippedName.value = name;
      shippedAddress.value = address;
      shippedCity.value = city;
      shippedPostalCode.value = postalCode;
      shippedCountry.value = country;
      orderIdToUpdate.value = id;

      isEditModalVisible.value = true;
      // console.log('should open edit now?', isEditModalVisible.value);
      // console.log('shippedName >> ', shippedName.value);
    }

    const openDeleteModal = (id: string, title: string) => {
      entityTitle.value = title;
      isDeleteModalVisible.value = true;
      orderIdToDelete.value = id;

      // console.log('should open delete now?', isDeleteModalVisible.value)
    };

    const handleDeleteRecord = () => {
      isDeleteModalVisible.value = false;
      deleteRecordFromOrders(orderIdToDelete.value).then(() => {
        updateList();
      })

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

      console.log('this is editedOrder', editedOrder);


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
        });
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

    const updateList = async () => {


      orders.value = await loadOrders();
      // console.log(orders.value);


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
    })

    return {
      ENTITY_TYPE,
      entityTitle,

      isCreateModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,

      orders,

      shippedName,
      shippedAddress,
      shippedCity,
      shippedCountry,
      shippedPostalCode,

      // closeDropdown,
      openDetails,

      closeModal,
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

<style lang="scss" scoped></style>