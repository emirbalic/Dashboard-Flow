<template>
    <!-- <container class="app" >  </container> -->


  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button @click="addOrder">Get orders in app</button>

  </nav> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { loadOrders } from '@/api/overview';

export default defineComponent({

  // setup() {

  //   // const addOrder = () => {
  //   //   loadOrders();
  //   // }

  //   // return {
  //   //   addOrder
  //   // };
  // }
})

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
