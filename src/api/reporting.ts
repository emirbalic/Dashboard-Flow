import api from '@/api/api';

import {  AxiosResponse, AxiosError } from 'axios';

const URLS = {
    order: 'orders/',
   
  };

export const loadOrders = () => {

    // console.log('loading ... ');
    
    return new Promise((resolve, reject) => {
      api
        .get(URLS.order)//, {}
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
          console.log('caught error in loadOrders >> ', error);
        });
    });
  }