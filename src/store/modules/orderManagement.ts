import { Commit } from "vuex";

import {
  loadOrders,
  // getOrderDetails,
  // addNewOrder,
  // deleteRecordFromOrders,
} from "@/api/reporting";

import { GlobalState } from "@/store/types";
// import { IOrder } from "@/models/IOrder";
// import { IOrder } from '@/models/IOrder';

export default {
  namespaced: true,

  mutations: {
    SET_ORDERS(state: GlobalState, context: any) {
      // console.log('debugging mutations... ', context);
      state.orders = context;
      // console.log('debugging state.orders... ', state.orders);

      // state.pages = context.number_of_pages;
      // state.pageNumber = context.page;
      // state.count = context.count;
    },
  },
  // SET_ORDER_DETAILS(state: GlobalState, context: IOrder) {
  //   console.log("context is >> ", context);
  //   state.orderDetails = context;
  // },

  //   SET_SERVICE_KEYS(state: GlobalState, context: any) {
  //     state.serviceKeys = context.results;
  //   },

  //   SET_RELOADED_ACTION_LIST_DETAILS(state: GlobalState, context: any) {
  //     state.actionListDetails = context;
  //   },

  //   SET_PAGE_NUMBER(state: GlobalState, contex: any) {
  //     state.pageNumber = contex;
  //   },
  //   SET_PAGINATION_DISTANCE(
  //     state: GlobalState,
  //     paginationDetailedInfo: IPaginationDetailedInfo
  //   ) {
  //     state.paginationDetailedInfo = paginationDetailedInfo;
  //   },
  // },

  actions: {
    async setOrders({ commit }: { commit: Commit }) {
      let data: any = await loadOrders();
      // console.log('SET_ORDERS debugging actions... ', data.results);

      commit("SET_ORDERS", data.results);
      return data.results;
    },

    // async setOrderDetails(
    //   { commit }: { commit: Commit },
    //   payload: IOrder
    // ) {
    //   // console.log("before >> ", payload);

    //   commit('SET_ORDER_DETAILS', payload);
    //   // console.log("after >> ", payload);
    //   // console.log("setting details with >> ", payload);
    // },
  },

  getters: {
    getOrders(state: GlobalState) {
      console.log(" getOrders debugging getters... ", state.orders);
      return state.orders;
    },

    // getCustomers(state: GlobalState) {
    //   return state.customers;
    // },
    // getProducts(state: GlobalState) {
    //   return state.products;
    // },

    // getOrderDetails(state: GlobalState) {
    //   console.log(' getOrderDetails debugging getters... ', state.orderDetails);
    //   return state.orderDetails;
    // },

    //   getReloadedActionlistDetails(state: GlobalState) {
    //     return state.actionListDetails;
    //   },

    //   getServiceKeys(state: GlobalState) {
    //     return state.serviceKeys;
    //   },

    //   getNumberOfPages(state: GlobalState) {
    //     return state.pages;
    //   },

    //   getPageNumber(state: GlobalState) {
    //     return state.pageNumber;
    //   },

    //   getCount(state: GlobalState) {
    //     return state.count;
    //   },

    //   getPaginationDistance(state: GlobalState) {
    //     return state.paginationDetailedInfo;
    //   },
  },
};

// actions: {
//   async setActionlist({ commit }: { commit: Commit }, payload: any) {
//     let data = await loadActionlist(
//       payload.search,
//       payload.page,
//       payload.per_page,
//       payload.action
//     );
//     await commit('SET_ACTION_LIST_INFO', data);
//     return data;
//   },
//   async setActionlistDetails(
//     { commit }: { commit: Commit },
//     payload: IActionList
//   ) {
//     commit('SET_ACTION_LIST_DETAILS', payload);
//   },
//   async setReloadedActionlistDetails(
//     { commit }: { commit: Commit },
//     payload: any
//   ) {
//     let data = await loadActionlistDetails(payload.actionlistId);
//     commit('SET_RELOADED_ACTION_LIST_DETAILS', data);
//   },
//   async setServiceKeys({ commit }: { commit: Commit }) {
//     let data = await getServiceKeys();
//     commit('SET_SERVICE_KEYS', data);
//   },

//   async setPageNumber({ commit }: { commit: Commit }, payload: number) {
//     commit('SET_PAGE_NUMBER', payload);
//   },

//   async setPaginationDistance(
//     { commit }: { commit: Commit },
//     payload: IPaginationDetailedInfo
//   ) {
//     commit('SET_PAGINATION_DISTANCE', payload);
//   },
// },
