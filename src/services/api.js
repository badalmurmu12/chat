import axios from 'axios';
import { http_noauth, http, http_airtable } from "./client";
import * as EndPoint from "./endpoints";
 
const API_KEY = 'AIzaSyDEA0myZGX0XreshPz7MmHl8aGmiy0inBw';
const CLIENT_ID_1 = "XGKBqFbulSpjDxDa8ZlFy0mpMU7kRMijkVuGGvnY";
const CLIENT_SECRET_1 = "cM5U5vRLCdOyItWZ9ZLR1ibAZEJsJQsjTi3n3CpaTCYt24JvU2HPnNPcpW21o37NmVZvaeY1FuisDWXBLMqwnEl8HQ9RbAT3EgEaUjwBCT088w8b09sL8igsoqDQqN81";


const CLIENT_ID = "6HZDML6egjW9kJqJm0pKDzIHcr0Odoz9SSJREB5O";
const CLIENT_SECRET = "OwkuRVliklVQZ3Y6a5rKqJVtCfMIH8SBcVu3VKUDnj0GVOR2FPy033Pgazja3CiaZoTnf2FbUT9ljJkUp8eAz4cwQfWooABVtTQT4PUXLCVU5euoIiG6b8PVhhKxVkeh";


let refreshTokenPromise;

 export const refreshToken = async(token) =>{
  try {
    const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      grant_type: 'refresh_token',
      refresh_token: token
    });

    const newTokenData = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expirationTime: response.data.expires_in,
      token_type: response.data.token_type,
    };

    // Store the new token in your local storage or any other storage mechanism you're using
    window.localStorage.setItem('tokenResponse', JSON.stringify(newTokenData));

    return newTokenData;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
 }

export const getToken = async (credentials) => {

  try {
    const response = await http_noauth.post(EndPoint.AUTH_TOKEN, {
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      otp:"false",
      username: credentials.mobile,
      password: credentials.password,
    });
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
};

export const signUp = async (credentials) => {
  try {
    const response = await http_noauth.post(EndPoint.SIGNUP,  credentials);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}
 
export const getOtp = async (credentials) => {
  try {
    const response = await http_noauth.post(EndPoint.GET_OTP, {
      mobile: credentials.mobile,
    });
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
};



 

/**
 * Example APIs
 */
export const getUserData = async () => {
  try {
    const response = await http.get(EndPoint.USER_DATA);
    return response;
  } catch (err) {

    alert(err.error)
  }
};
 



export const contactUs = async (raw) => {
  try {
    const response = await http_airtable.post(EndPoint.CONTACT_Us, raw);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}


export const requestDocuments = async (raw) => {
  try {
    const response = await http.post(EndPoint.REQUEST_DOCUMENTS, raw);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}


export const inviteUser = async (raw) => {
  try {
    const response = await http.post(EndPoint.INVITE_USER, raw);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const showInterest = async (raw) => {
  try {
    const response = await http.post(EndPoint.REQUEST_DOCUMENTS, raw);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const iamInterested = async(data) =>{
  try{
    const response = await http.post(EndPoint.POST_INTERESTED+ data)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const amiInterested = async(data) =>{
  try{
    const response = await http.get(EndPoint.AM_I_INTERESTED+data)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}


export const getTaskList = async(id) =>{
  try{
    const response = await http.get(EndPoint.GET_TASKLIST+ id)
    return response;
  }
  catch(err){
    console.log('getTaskList', err);
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}



export const postTaskList = async(id, task) =>{
  try{
    const response = await http.post(EndPoint.POST_TASKLIST+ id, task)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const postTimeline = async(id, post) =>{
  try{
    const response = await http.post(EndPoint.ADD_TO_TIMELINE+ id, post)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}



export const getTimeline = async(id) =>{
  try{
    const response = await http.get(EndPoint.ALL_TIMELINE+ id)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}



export const getAllDoc = async(id) =>{
  try{
    const response = await http.get(EndPoint.ALL_DOCUMENTS+ id)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}



export const getDeveloperInformation = async(raw) =>{
  try{
    const response = await http.get(EndPoint.INFORMATION_DEVELOPER+ raw)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const getDeveloperInformationGenAi = async(raw) =>{
  try{
    const response = await http.get(EndPoint.INFORMATION_DEVELOPER_GEN_AI+ raw)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const fetchAllProject = async( raw) =>{

  try{
    
    const response = await http.get(EndPoint.FETCH_ALL_PROJECT, raw)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const aiInteractiveMessage = async(payload) =>{
  try{
    const response = await http.post(EndPoint.AI_INTERACTIVE_MESSAGE, payload)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}


export const fetchAIAnalytics = async( uuid) =>{
  try{
    const response = await http.get(EndPoint.AI_ANALYTICS+uuid)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const postLogout = async( uuid) =>{
  try{
    const response = await http.post(EndPoint.LOG_OUT+uuid)
    return response;
  }
  catch(err){
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}
