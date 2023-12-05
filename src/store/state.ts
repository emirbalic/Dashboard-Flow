import { IOrder } from '@/models/IOrder';
import { GlobalState } from './types';

const state = (): GlobalState => {
  return {
    orders: [],
    products: [],
    customers: [],
    orderDetails: {} as IOrder,

    // isLoggedIn: false,
    // serviceKeys: [],
    // actionlists: [],
    // users: [],
    // actionlistId: 0,
    // pages: 0,
    // pageNumber: 1,
    // count: 0,
    // paginationDetailedInfo: {},

    /*.
     * rule managemetn structure
     */
    
    // rules: [],
    // services: [],
    // countries: [],
    // serviceInsight: {},
    // callActions: [],
    // callersReports: [],
    // matchingList: [],
    // simulationResults: Object,
    // inspectionResults: Object,
  };
};

export default state;