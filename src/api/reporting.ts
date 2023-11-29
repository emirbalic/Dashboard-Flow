import api from "@/api/api";
import { IOrder } from "@/models/IOrder";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
  orders: "orders/",
  products: "products/",
  suppliers: "suppliers/",
};

export const loadOrders = () => {
  // console.log('loading ... ');

  return new Promise((resolve, reject) => {
    api
      .get(URLS.orders) //, {}
      .then((response: AxiosResponse) => {
        // console.log(response.data);

        if (response.status === 200) {
          resolve(response.data);
          // return  response.data
        } else {
          reject();
        //   return null;
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in loadOrders >> ", error);
      });
  });
};


export const addNewOrder = (
  newOrderRecord: Partial<IOrder>
  ) => {
    return new Promise((resolve, reject) => {
      api
        .post(
          URLS.orders,
          {
           

            customer: newOrderRecord.customerId,
            product: newOrderRecord.productId,
            order_date: new Date(),
            required_date: newOrderRecord.requiredDate,
            shipped_name:  newOrderRecord.shippedName,
            shipped_address: newOrderRecord.shippedAddress,
            shipped_city: newOrderRecord.shippedCity,
            shipped_postal_code: newOrderRecord.shippedCountry,
            shipped_country: newOrderRecord.shippedPostalCode   


          },
          // {}
        )
        .then((response: AxiosResponse) => {
          if (response.status === 201) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch((error) => {
          console.log('caught error in addSingleRecordToService >> ', error);
          return reject(error);
        });
    });
  };

// == ADD THIS WHEN YOU FINISH WITH STYLE AND ORDERS TABLE ==
export const loadProducts = () => {
  // console.log('loading ... ');

  return new Promise((resolve, reject) => {
    api
      .get(URLS.products) //, {}
      .then((response: AxiosResponse) => {
        // console.log(response.data);

        if (response.status === 200) {
          resolve(response.data);
          // return  response.data
        } else {
          // reject();
          return null;
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in loadProducts >> ", error);
      });
  });
};
export const loadSuppliers = () => {
  // console.log('loading ... ');

  return new Promise((resolve, reject) => {
    api
      .get(URLS.suppliers) //, {}
      .then((response: AxiosResponse) => {
        // console.log(response.data);

        if (response.status === 200) {
          resolve(response.data);
          // return  response.data
        } else {
          // reject();
          return null;
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in loadProducts >> ", error);
      });
  });
};
