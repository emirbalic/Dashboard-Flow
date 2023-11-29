import api from '@/api/api';

import {  AxiosResponse, AxiosError } from 'axios';

const URLS = {
    categories: 'categories/',
   
  };

export const loadCategories = () => {

    // console.log('loading ... ');
    
    return new Promise((resolve, reject) => {
      api
        .get(URLS.categories)//, {}
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