<template>
    <component
      :is="tag"
      class="container"
      :class="{ 'is-overlay': isOverlay, 'is-loading': isLoading }"
    >
    <!-- v-if="isLoggedIn" -->
      <template >
        <!-- <slot name="loader" v-if="isLoading">
          <loader :message="''"></loader>
        </slot> -->
        <!-- <slot v-else></slot> -->
      </template>
      <!-- <template v-else>
        <div class="loadScreen" v-show="isLoading">
          <loader :message="''"></loader>
        </div>
        <slot></slot>
      </template> -->
    </component>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
//   import Loader from '@/components/common/Loader.vue';
//   import { get as getFromStore } from '@/services/store';
  
  export default defineComponent({
    props: {
      tag: {
        type: String,
        default: 'div',
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      isOverlay: {
        type: Boolean,
        default: false,
      },
      loadingMessage: {
        type: [String],
        default: null,
      },
    },
    components: {
    //   loader: Loader,
    },
    setup(_, context) {
    //   const hasLoaderSlot = computed(() => !!context.slots.loader);
    //   const isLoggedIn = computed(() => {
    //     return getFromStore('auth.access_token');
    //   });
  
      return {
        // hasLoaderSlot,
        // isLoggedIn,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .loadScreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    z-index: 10000;
    .loader {
      margin-top: 20%;
    }
  }
  </style>