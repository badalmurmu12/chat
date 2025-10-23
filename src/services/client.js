import axios from 'axios'

import {
  handleResponse,
  handleError,
  setAuthorizationHeader,
  setAirtableAuthorizationHeader,
} from "./interceptors";

// const API_HOST = "http://192.168.43.63:8009/";
const API_HOST = "https://dashboard-service-vqv7qc6r6q-as.a.run.app";
const API_AIRTABLE_HOST = 'https://api.airtable.com/v0/';
/**
 * For requests which doesn't need Authorization header
 */
const http_noauth = axios.create({
  baseURL: API_HOST,
});

const http = axios.create({
  baseURL: API_HOST,
});

const http_airtable = axios.create({
  baseURL: API_AIRTABLE_HOST,
})

http_noauth.interceptors.response.use(handleResponse, handleError);
http.interceptors.request.use(setAuthorizationHeader);
http.interceptors.response.use(handleResponse, handleError);
http_airtable.interceptors.request.use(setAirtableAuthorizationHeader);

export { http_noauth, http , http_airtable};






// axios.defaults.baseURL = 'https://https://api.airtable.com/v0/appeglvdKSlu26wb6/tblTc6UUVvC4QyWxB/'
// axios.defaults.headers.common['Accept'] = 'application/json'

// export const client = axios.create({
 
//     baseURL: 'https://api.airtable.com/v0/appeglvdKSlu26wb6/tblTc6UUVvC4QyWxB/',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
//     }

// })

// client.interceptors.response.use(response => {
//     return response.data
// })



 
// const apiClient = axios.create({
//   // .. where we make our configurations
//   baseURL:  '',
//   responseType: "json",
// });

// // Where you would set stuff like your 'Authorization' header, etc ...
// //instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// // Also add/ configure interceptors && all the other cool stuff

// // Where you would set stuff like your 'Authorization' header, etc ...
// //instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// apiClient.interceptors.request.use(
//   async function (config) {
//     let header = {
//       "content-type": config.headers.get("content-type")
//         ? config.headers.get("content-type")
//         : "application/json",
//     };

//     const token  = JSON.parse(localStorage.getItem("tokenResponse"));
//     const userData = JSON.parse(localStorage.getItem("userData"));

//     if (token) {
//       header = {
//         ...header,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     if (config.skipHeader) {
//       config.headers = {};
//     } else {
//       config.headers = header;
//     }

//     return config;
//   },
//   function (error) {
//     console.error("error", error);
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (err) => {
//     if (err.response.status == 401) {
//       // redirect to login
//       //store.dispatch(logoutHandler());
//     //   await AsyncStorage.removeItem("lx.token");
//     }
//     console.error("ERRR", err);
//   }
// );
// export default apiClient;
