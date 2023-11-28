<template>
  <!-- <div class="settings-screen"> -->
  <header>
    <span class="title">
      Reporting / Orders
    </span>
    <button class="button is-primary" style="margin-right: 2.8rem;" @click="openModal">
      <Plus_Icon class="nav_icon" />
      New order
    </button>
  </header>


  <div class="body" @click="closeDropdown">

    <!-- <confirm-delete-modal v-if="isDeleteModalVisible" :entity-type="ENTITY_TYPE" :entity-title="entityTitle"
            @close-modal="closeModal" @handle-delete="handleDeleteRecord">
        </confirm-delete-modal> -->

    <!-- <div class="filters">
  <div class="filter-wrapper">
    <p>Service:</p>
    <select v-model="selectedService" id="select">
      <option value="all">All services</option>
      <option v-for="(service, i) in serviceList" :key="i" :value="service.id">{{ service.service_key }} ({{ service.description }})</option>
    </select>
    <Down_Icon class="icon"></Down_Icon>
  </div>
</div> -->


    <!--   -->
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
          <th>Shipped Date</th>
          <th>Shipped Via</th>
          <th>Shipped Name</th>
          <th>Shipped Address</th>
         
          <th>Shipped City</th>
          <th>Shipped Region</th>
          <th>Shipped Postal Code</th>
          <th>Shipped Country</th> 
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in orders" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ formatDate(item.order_date) }}</td>
          <!-- <td class="align_column">
            <strong>
              {{ item.priority }}
            </strong>
          </td> -->
          <td>{{ item.customer.last_name }}</td>
          <td>{{ item.product.product_name }}</td>
          <td>{{ formatDate(item.required_date) }}</td>
          <td>{{ formatDate(item.shipped_date) }}</td>
          <td>{{ item.shipped_via }}</td>
          <td>{{ item.shipped_name }}</td>
          <td>{{ item.shipped_address }}</td>
          <td>{{ item.shipped_city }}</td>
          <td>{{ item.shipped_region }}</td>
          <td>{{ item.shipped_postal_code }}</td>
          <td>{{ item.shipped_country }}</td>
          <td>
              <span>
                <Edit_Icon class="table_icon" @click="goToEdit(item.type_short, item.id, item.type)" />
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
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

import { loadOrders } from '@/api/overview';


import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import { IOrder } from '@/models/IOrder';


export default defineComponent({
  components: {
    Edit_Icon,
    Plus_Icon,
    Sorting_Icon,
    Trash_Icon
  },
  setup() {

    const store = useStore();

    const orders = ref();

    const formatDate = (date: Date) => {
      return dayjs(date).format('DD/MM/YYYY');
    };

    const goToEdit = (option: string, id: number, type: string) => {
      // router.push({
      //   name: 'rule-management-rules-details',
      //   params: {
      //     option,
      //     id,
      //     type
      //   }
      // })
    }

    const openDeleteModal = (id: string, title: string) => {
      // entityTitle.value = title;
      // isDeleteModalVisible.value = true;
      // ruleRecordIdToDelete.value = id;
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

    const addOrder = async () => {


      orders.value = await loadOrders();
      console.log(orders.value);


    }
    const openModal = () => {
      console.log('opened');

    };

    const closeDropdown = () => {
      console.log('closed dropdown');
    };

    addOrder()
    return {
      orders,
      closeDropdown,
      formatDate,
      goToEdit,
      openDeleteModal,
      openModal
    }
  }
})
</script>

<style lang="scss" scoped>



</style>