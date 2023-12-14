import { reactive, watch } from 'vue';
import dlv from 'dlv';
// import { ILocalStorage } from '@/models/ILocalStorage';

// // defaults
// const store = reactive<ILocalStorage>({
//   loginData: null,

//   // temp: {
//   //   isReauthenticating: false,
//   // },
// });

// export const subscribe = (key: any, callback: any) => {
//   console.log('store key', key);
//   console.log('callback', callback);

//   // // @ts-ignore
//   // (keyValue) => {
//   //   console.log('keyValue', keyValue);
//   //   callback(keyValue);
//   // }

//   // watch(
//   //   // @ts-ignore
//   //   () => store[key],
//   //   (keyValue) => {
//   //     // console.log('keyValue', keyValue);
//   //     callback(keyValue);
//   //   }
//   // );
// };

// export const get = (path: string) => dlv(store, path);

// export const set = (key: any, update: any) => {
  
//   // @ts-ignore
//   store[key] = { ...store[key], ...update };
// };

// export const unset = (key: any) => {
//   // @ts-ignore
//   store[key] = null;
// };


export const save = (key: string, update: object) =>
  new Promise((resolve:Function): void => {
    localStorage.setItem(key, JSON.stringify({ [key]: update }));
    resolve();
  });

// export const save = (key: string, update: object) =>


//   new Promise((resolve): void => {
//     // console.log(' key', typeof(key));
//     // console.log(' update', typeof(update));
//     localStorage.setItem(key, JSON.stringify({ [key]: update }));
//     // set(key, update);
//     // @ts-ignore
//     // store[key] = { ...store[key], ...update };
//     // @ts-ignore
//     // console.log(' store[key]', store[key]);
//     // console.log(' store', store);
//     // console.log(' ...update', update);
//     // console.log(' key', key);
//     // console.log(' update', update);
//     // @ts-ignore
//     resolve();
//   });

// export const load = (key: any) =>
//   new Promise((resolve) => {
//     try {
//       // @ts-ignore
//       const value = JSON.parse(localStorage.getItem(key))[key];
//       set(key, value);
//       resolve(get(key));
//     } catch (e) {
//       resolve(get(key));
//     }
//   });

// export const remove = (key: any) =>
//   new Promise((resolve): void => {
//     localStorage.removeItem(key);
//     unset(key);
//     // @ts-ignore
//     resolve();
//   });


