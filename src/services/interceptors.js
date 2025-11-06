import { getAccessToken, setTokenResponse } from "./authData";
import { refreshToken } from './api';
import { auth } from '../firebase';
import { http } from "./client";
import { logoutSuccess } from "../store/auth";
import configData from "../config/config";
import { store } from "../store";


/**
 * As importing store here will create a cyclic dependency
 * So this is a work-around to get dispatch working from here
 * Once store has been initialized, it will call setDispatch
 * method provided here
 */
let _dispatch;
export const setDispatch = (dispatch) => (_dispatch = dispatch);

export const handleResponse = (response) => {
  console.log('response', response);
  if (response.config.url === "/o/token/") {
    setTokenResponse(response.data);
  }
  return response.data;
};


export const refreshtoken = async () => {
  const rfsToken = JSON.parse(window.localStorage.getItem("tokenResponse"))?.refreshToken;
  console.log('refreshToken', rfsToken);
  if (!rfsToken) {
    store.dispatch(logoutSuccess());
    const currentPath = window.location.pathname;
    const encodedPath = encodeURIComponent(currentPath);
    // window.location.href = `/login?redirect=${encodedPath}`;
  }
  let token = await refreshToken(rfsToken);
  console.log('refreshToken', token);
  if (token) {
    return token;
  }
  else {
    return null;
  }
};
let newToken = null;

export const handleError = async (error) => {
  console.log('error', error);
  console.log('error?.request?.withCredentials', error?.request?.withCredentials);
  if (!error?.request?.withCredentials) {

    try {
      newToken = await refreshtoken();
      if (newToken) {
        const config = error.config;
        config.headers["Authorization"] = "Bearer " + newToken.access_token;

        return await http.request(config);
      } else {
        store.dispatch(logoutSuccess());
        const currentPath = window.location.pathname;
        const encodedPath = encodeURIComponent(currentPath);
        // window.location.href = `/login?redirect=${encodedPath}`;
      }
    } catch (err) {
      console.log('err', err);
      if (store && typeof store.dispatch === 'function') {

        store.dispatch(logoutSuccess());
        const currentPath = window.location.pathname;
        const encodedPath = encodeURIComponent(currentPath);
        // window.location.href = `/login?redirect=${encodedPath}`;
      } else {
        console.error('Store or dispatch is not available');
      }
    }
  }
  // if (error.response) {
  //   if (error.response.status === 401) {
  //     /**
  //      * Access Token has expired, so need to refresh the access token
  //      */
  //     try {
  //       newToken = 'await refreshToken()';
  //       const config = error.config;
  //       config.headers["Authorization"] = "Bearer " + newToken.access_token;
  //       /**
  //        * Resend the original request
  //        */
  //       return await http.request(config);
  //     } catch (err) {
  //       console.log('err', err);
  //       if (err.error === "invalid_grant") {
  //         /**
  //          * Refresh Token also didn't work, navigate the user to login screen
  //          */
  //         _dispatch(logoutSuccess());
  //       } else {
  //         throw err;
  //       }
  //     }
  //   }
  //   throw error.response.data;
  // }
  throw error;
};

export const setAuthorizationHeader = async (config) => {
  const token = JSON.parse(window.localStorage.getItem("tokenResponse"));

  const headers = config.headers;
  headers["Authorization"] = "Bearer " + token?.accessToken;
  return { ...config, headers };
};



export const setAirtableAuthorizationHeader = async (config) => {
  const headers = config.headers;
  headers["Authorization"] = "Bearer " + configData?.token;
  return { ...config, headers };
};