<template>
  <!-- :isLoading="pageLoading" -->
    <!-- <container > -->
     
     <h1>This is login view</h1>
      <!-- <div class="auth">
        <form @submit.prevent="login" autocomplete="off">
          <p class="product-title">Voice Firewall Gateway</p>
          <div class="input">
            <label for="auth_username">Username</label>
            <input
              type="text"
              placeholder="Username..."
              id="auth_username"
              v-model="input.username"
            />
          </div>
          <div class="input">
            <label for="auth_password">Password</label>
            <input
              type="password"
              placeholder="Password..."
              id="auth_password"
              v-model="input.password"
            />
          </div> -->
          <!-- :disabled="!isValid" -->
        
          <!-- <button type="submit" class="button is-primary" >
            Login
          </button>
        </form>
      </div> -->



    <!-- </container> -->
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import router from '@/router';
  import { authenticate } from '@/api/authenticate';
  // import { errLog } from '@/utils/dev';
  // import { save as saveToStore } from '@/services/store';
  // import { showNotice } from '@/services/view';
  
  import { ILoginCredentials} from '@/models/IUtilModels'
  // import Container from '@/components/common/Container.vue';
  
  export default defineComponent({
    // components: {
    //   Container,
    // },
    setup() {
      // let baseUrl = process.env.VUE_APP_API_URL;
      // const isLoading = ref(false);
      // const pageLoading = ref(true);
      // const store = useStore();
  
      // watch(
      //   () => '../../images/login.jpg',
      //   () => {
      //     pageLoading.value = false;
      //   },
      //   { immediate: true }
      // );
  
      // const input = ref({
      //   username: '',
      //   password: '',
      // });
  
      // const isValid = computed(() => {
      //   return Object.values(input.value).every(Boolean);
      // });
      
    //   const input = ref({
    //   username: '',
    //   password: '',
    // });

    let baseUrl ="http://localhost:8000"
    // const login = async () => {
    //   const { username, password: _password } = input.value;
    //   // isLoading.value = true;

    //   const body: ILoginCredentials = {
    //     username: "admin",
    //     password: "Pa$$w0rd",
    //     apiRoot:baseUrl
    //   }

    //   const response = await authenticate(body);

    //   if(response !== undefined && response.status === 401) {
    //     console.warn('error logging !!!!')
    //     // // isLoading.value = false;
    //     // errLog('Login', response.status );
    //     //   showNotice({
    //     //     props: {
    //     //       type: 'error',
    //     //       duration: 5000,
    //     //       message: `Seems like an error has occurred!: ${
    //     //         response.data.detail || 'Unknown error'
    //     //       }.`,
    //     //     },
    //     //   });
    //   } else if (response !== undefined && response.status === 200) {

    //     console.info(' logging successfull !!!!')

    //     debugger
    //     // saveToStore('auth', {
    //     //     username,
    //     //     apiRoot:baseUrl,
    //     //     isAdmin: response.data.is_admin,
    //     //     access_token: response.data.access,
    //     //     requiresReset: response.data.requires_reset,
    //     //     isAllowed: !response.data.requires_reset,
    //     //   });

    //       //!!todo!!
    //       // store.dispatch('user/loginUser', true);
    //       // isLoading.value = false;

    //       // if (response.data.requires_reset) {
    //       //   router.push({
    //       //     path: '/user-management/reset-user-password',
    //       //   });
    //       // }
    //       // else if (response.data.is_admin && !response.data.requires_reset) {
    //       //   router.push({
    //       //     path: '/',
    //       //   });
    //       // }
    //       // window.location.reload()
    //   } 
    //   // // ==don't add before UX chapter
    //   // else {
    //   //     showNotice({
    //   //       props: {
    //   //         type: 'error',
    //   //         duration: 5000,
    //   //         message: `${response} has occurred, please try again later.`
    //   //       },
    //   //     });
    //   // }
    // };


    const login = async () => {
      const body: ILoginCredentials = {
        username: "admin",
        password: "Pa$$w0rd",
        apiRoot: baseUrl
      }
      const response = await authenticate(body);
      if (response !== undefined && response.status === 401) {
        console.warn('error logging !!!!')
      } else if (response !== undefined && response.status === 200) {
        console.info(' logging successfull !!!!', response)
      }
    };
    login()
  
      return {
        // isLoading,
        // input,
        // isValid,
        // pageLoading,
  
        // login,
      };
    },
  });
  </script>
  
    <!-- background-image: url('../../assets/images/login.jpg'); -->
  <style lang="scss" scoped>
  .auth {
    background-size: cover;
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
  
    > form {
      .product-title {
        margin: 10px auto 20px;
        color: #fff;
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: bold;
      }
      .logo {
        .icon {
          color: #fff;
        }
      }
      margin: 0 10% !important;
      padding: 30px 60px 80px;
      min-width: 480px;
      max-width: 480px;
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 20px;
  
      label {
        color: #fff;
      }
      input[type='text'],
      input[type='password'],
      select {
        color: #fff;
        background: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        border-radius: 0 !important;
      }
  
      select {
        option {
          color: #000;
        }
      }
  
      input[type='text']:focus,
      input[type='password']:focus,
      select {
        outline: none;
      }
  
      input[type='text']:valid,
      input[type='password']:valid,
      select {
        background: transparent;
      }
  
      .button {
        margin-top: 30px;
        background-color: transparent;
        border: 1px solid #fff;
        border-radius: 30px;
      }
    }
  
    @media only screen and (max-width: 900px) {
      > form {
        margin: 0 auto !important;
      }
    }
  
    @media only screen and (max-width: 760px) {
      > form {
        margin: 0 auto !important;
        min-width: 320px;
        max-width: 320px;
      }
    }
  }
  </style>
  