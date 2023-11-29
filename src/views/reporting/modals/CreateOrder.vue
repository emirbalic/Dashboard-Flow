<template>
    <Modal @close="closeModal">
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Order properties</span>
                    <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                </div>
            </div>
            <error-message-header v-if="hasError" :message="errorMessage"></error-message-header>
            <label>
                <strong>
                    <small>
                        Product
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select v-model="productId">
                <option value="" disabled selected>Select Product</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.product_name }}
                </option>
            </select>

            <label>
                <strong>
                    <small>

                        Customer
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <div class="content-wrapper">

                <select v-model="customerId">
                    <option value="" disabled selected>Select Customer</option>
                    <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                        {{ customer.title }} {{ customer.first_name }} {{ customer.last_name }}
                    </option>
                </select>
            </div>

            <label>
                <strong>
                    <small>
                        Required date

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            





            <input type="date" v-model="requiredDate" />
            <label>
                <strong>
                    <small>
                        Shipped Name

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedName" />
            <label>
                <strong>
                    <small>
                        Shipped Address

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedAddress" />
            <label>
                <strong>
                    <small>
                        Shipped City

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedCity" />
            <label>
                <strong>
                    <small>
                        Shipped Postal Code

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedPostalCode" />
            <label>
                <strong>
                    <small>
                        Shipped Country

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedCountry" />

            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeModal()">CANCEL</button>
                    <button class="confirm" @click="addNewRecord()">CONFIRM</button>
                    <!-- :disabled="!buttonEnable" -->
                </div>
            </div>
        </div>
    </Modal>
</template>
  
<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';

import Modal from '@/components/common/Modal.vue'
import { addNewOrder } from '@/api/reporting';


// import { showNotice } from '@/services/view';
// import Loader from '@/components/common/Loader.vue';
// import { get as getFromStore } from '@/services/store';

import { loadProducts } from '@/api/reporting';
import { loadCustomers } from '@/api/customers';
// import Down_Icon from '@/assets/icons/Down_Icon.vue';

//loadCustomers

import ErrorMessageHeader from '@/components/common/ErrorMessageHeader.vue';


import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { IOrder } from '@/models/IOrder';


export default defineComponent({
    components: {
        Close_Icon,
        // Down_Icon,

        ErrorMessageHeader,
        // Loader,
        Modal,

    },
    emits: ['close-modal', 'update-list'],

    setup(_, context) {

        const buttonEnable = ref(false)
        const customers = ref()
        const products = ref()
        const description = ref('')
        const errorMessage = ref("")
        const hasError = ref(false)

        const productId = ref('');
        const customerId = ref('');
        const requiredDate = ref('');
        const shippedName = ref('');
        const shippedAddress = ref('');
        const shippedCity = ref('');
        const shippedCountry = ref('');
        const shippedPostalCode = ref('');

        // const loggedUser = getFromStore('auth.username');
        const serviceKey = ref('')

        // let newRecord: Partial<IService> = {};

        // watch(
        //     () => [description.value, serviceKey.value],
        //     () => {
        //         if (description.value === '' || serviceKey.value === '') {
        //             buttonEnable.value = false;
        //         } else {
        //             buttonEnable.value = true;
        //         }
        //     }
        // );

        const getCustomers = async () => {
            // store.dispatch('ruleManagement/setRules', {});
            customers.value = await loadCustomers();
            console.log('customers downloaded');

        };
        const getProducts = async () => {
            // store.dispatch('ruleManagement/setRules', {});
            products.value = await loadProducts();
            console.log('products downloaded', products.value);
        };

       

        const addNewRecord = () => {

            // console.log("product id== ", productId.value);
            // console.log("customer id== ", customerId.value);
            // console.log("requiredDate id== ", requiredDate.value);
            // console.log("shippedName id== ", shippedName.value);
            // console.log("shippedAddress id== ", shippedAddress.value);
            // console.log("shippedCity id== ", shippedCity.value);
            // console.log("shippedCountry id== ", shippedCountry.value);
            // console.log("shippedPostalCode id== ", shippedPostalCode.value);

            let newOrderRecord: Partial<IOrder> = {};
            newOrderRecord.customerId = customerId.value;
            newOrderRecord.productId = productId.value;
            newOrderRecord.requiredDate = requiredDate.value;
            newOrderRecord.shippedName = shippedName.value;
            newOrderRecord.shippedAddress = shippedAddress.value;
            newOrderRecord.shippedCity = shippedCity.value;
            newOrderRecord.shippedCountry = shippedCountry.value;
            newOrderRecord.shippedPostalCode = shippedPostalCode.value;

            // console.log('new rec ==> ', newOrderRecord);

            let test = addNewOrder(newOrderRecord);

             console.log('test ', test);
             
            
            
            // if (validateNewRecord()) {
            //     newRecord.description = description.value;
            //     newRecord.service_key = serviceKey.value;
            //     newRecord.created_by = createdBy.value;
            //     newRecord.created_by = loggedUser;

            //     addSingleRecordToService(newRecord)
            //         .then(() => {
            //             showNotice({
            //                 props: {
            //                     type: 'success',
            //                     duration: 5000,
            //                     message: `Successfully added a new record`,
            //                 },
            //             });
            //         })
            //         .then(() => {
            //             cleanModal();
            //             closeModal();
            //             updateList();
            //         })
            //         .catch((error) => {

            //             let key = Object.keys(error.response.data)[0];
            //             let errorObject = error.response.data[key];
            //             key = key.split("_").join(" ");
            //             key = key.charAt(0).toUpperCase() + key.slice(1);
            //             hasError.value = true;
            //             errorMessage.value = key + " - " + errorObject;

            //         })
            // }
        };

        const cleanModal = () => {
            description.value = '';
            serviceKey.value = ''
        };

        const closeModal = () => {
            context.emit('close-modal');
        };

        const updateList = () => {
            context.emit('update-list');
        };

        onBeforeMount(() => {
            // console.log(`the component is still not mounted.`)
            getCustomers()
            getProducts()

        })

        const validateNewRecord = () => {
            if (description.value === '' && serviceKey.value === '')
                return false;
            return true;
        };

        return {
            buttonEnable,
            customers,
            customerId,
            description,
            errorMessage,
            hasError,
            products,
            productId,
            serviceKey,
            requiredDate,
            shippedName,
            shippedAddress,
            shippedCity,
            shippedCountry,
            shippedPostalCode,

            addNewRecord,
            closeModal,
            updateList
        };
    },
});
</script>
  
<!-- <style lang="scss" >
// scoped src="@/styles/_rule-management-modal.scss"
</style> -->
  