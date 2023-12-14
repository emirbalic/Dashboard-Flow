// import { ISelfUpdatePassword } from "@/models/IUtilModels";
// import { get as getFromStore } from "@/services/store";

import axios from "axios";

const URLS = {
  userPasswordUpdate: "/api/users/user-reset-password",
  authenticate: "/api/token",
};

const setAxios = (access_token: string) => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
};


// // == to be added after 
// export const updateOwnPasswordAPI = (passwords: ISelfUpdatePassword) => {
//   const { access_token } = getFromStore("auth");
//   const { apiRoot } = getFromStore("auth");

//   setAxios(access_token);
//   return axios
//     .post(
//       apiRoot + URLS.userPasswordUpdate,
//       {
//         new_passwd: passwords.new_passwd,
//         confirm_passwd: passwords.confirm_passwd,
//       },
//       {}
//     )
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
