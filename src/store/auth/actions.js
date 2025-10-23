import { http } from '../../services/client';
import * as API from "../../services/api";
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export const FINANCE_DATA_BACK = 'FINANCE_DATA_BACK';
const loginRequest = () => ({
  type: LOGIN_PENDING,
});
const loginFailure = (error) => ({
  type: LOGIN_REJECTED,
});

export const logoutSuccess = () => ({
  type: LOGOUT_FULFILLED,
  payload: { loggedIn: false },
});

export const loginSuccess = (userData, completeOnboarding) => {
  localStorage.setItem("loggedIn", true);
  localStorage.setItem("user", JSON.stringify(userData?.user));
  localStorage.setItem("tokenResponse", JSON.stringify(userData?.user?.stsTokenManager));

  return (
    {
      type: LOGIN_FULFILLED,
      payload: {
        user: userData?.user,
        token: userData?._tokenResponse,
        loggedIn: true,
        username: userData?.user?.displayName,
        type: userData?.providerId,
        completeOnboarding: completeOnboarding
      },
    })
};

export const COMPANY_DATA_FULFILLED = 'COMPANY_DATA_FULFILLED';
export const COMPANY_DATA_PENDING = 'COMPANY_DATA_PENDING';
export const COMPANY_DATA_REJECTED = 'COMPANY_DATA_REJECTED';

const companyDataRequest = () => ({
  type: COMPANY_DATA_PENDING,
});
const companyDataFailure = (error) => ({
  type: COMPANY_DATA_REJECTED,
});

export const companyDataSuccess = (companyData) => ({
  type: COMPANY_DATA_FULFILLED,
  payload: {
    companyData: companyData,

  },
});


export const PROJECT_DATA_FULFILLED = 'PROJECT_DATA_FULFILLED';
export const FINANCE_DATA_FULFILLED = 'FINANCE_DATA_FULFILLED';

export const projectDataSuccess = (projectData) => ({
  type: PROJECT_DATA_FULFILLED,
  payload: {
    projectData: projectData,

  },
});


export const finaceDataSuccess = (finaceData) => ({
  type: FINANCE_DATA_FULFILLED,
  payload: {
    finaceData: finaceData,
    completeOnboarding: true
  },
});

export const finaceDataBack = (data) => ({
  type: FINANCE_DATA_BACK,
  payload: {
    finaceData: data,
  },
})


export const TERM_AND_CONDITION_FULFILLED = 'TERM_AND_CONDITION_FULFILLED';
export const termNConditionAccept = (tnc) => ({
  type: TERM_AND_CONDITION_FULFILLED,
  payload: {
    TnC: tnc,

  },
});


export const GET_STARTED_FULFILLED = 'GET_STARTED_FULFILLED';
export const getStarted = (type) => ({
  type: GET_STARTED_FULFILLED,
  payload: {
    GetStarted: type,
  },
});






export const postLogout = (raw) => async (dispatch) => {
  dispatch(loginRequest())
  try {
    const res = await API.postLogout(raw);
    dispatch(logoutSuccess(res))
  } catch (err) {
    dispatch(loginFailure(err))
  }
}