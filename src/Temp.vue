<template>
  <h1>This is login view</h1>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

import { authenticate } from '@/api/authenticate';

import { ILoginCredentials } from '@/models/IUtilModels'

export default defineComponent({

  setup() {
  
    let baseUrl = "http://localhost:8000"
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
    };
  },
});
</script>
  