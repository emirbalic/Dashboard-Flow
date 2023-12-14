<template>
  <!-- <router-view /> -->
  <LoginView></LoginView>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ILoginCredentials} from '@/models/IUtilModels'

import { authenticate } from '@/api/authenticate';
import router from '@/router';

import LoginView from '@/views/user/LoginView.vue';


export default defineComponent({

  components: {
    LoginView
  },

  setup() {

    // VUE_APP_API_URL=http://localhost:8000
    // let baseUrl = process.env.VUE_APP_API_URL;

    const input = ref({
      username: '',
      password: '',
    });

    let baseUrl ="http://localhost:8000"
    const login = async () => {
      const { username, password: _password } = input.value;
      // isLoading.value = true;

      const body: ILoginCredentials = {
        username: "admin",
        password: "Pa$$w0rd",
        apiRoot:baseUrl
      }

      const response = await authenticate(body);

      if(response !== undefined && response.status === 401) {
        console.warn('error logging !!!!')
        // // isLoading.value = false;
        // errLog('Login', response.status );
        //   showNotice({
        //     props: {
        //       type: 'error',
        //       duration: 5000,
        //       message: `Seems like an error has occurred!: ${
        //         response.data.detail || 'Unknown error'
        //       }.`,
        //     },
        //   });
      } else if (response !== undefined && response.status === 200) {

        console.info(' logging successfull !!!!')

        debugger
        // saveToStore('auth', {
        //     username,
        //     apiRoot:baseUrl,
        //     isAdmin: response.data.is_admin,
        //     access_token: response.data.access,
        //     requiresReset: response.data.requires_reset,
        //     isAllowed: !response.data.requires_reset,
        //   });

          //!!todo!!
          // store.dispatch('user/loginUser', true);
          // isLoading.value = false;

          // if (response.data.requires_reset) {
          //   router.push({
          //     path: '/user-management/reset-user-password',
          //   });
          // }
          // else if (response.data.is_admin && !response.data.requires_reset) {
          //   router.push({
          //     path: '/',
          //   });
          // }
          // window.location.reload()
      } 
      // // ==don't add before UX chapter
      // else {
      //     showNotice({
      //       props: {
      //         type: 'error',
      //         duration: 5000,
      //         message: `${response} has occurred, please try again later.`
      //       },
      //     });
      // }
    };

    // login()
  }
})

</script>

<style lang="scss">
</style>
