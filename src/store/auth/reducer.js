import {
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_FULFILLED,
  LOGOUT_FULFILLED,
  PROJECT_DATA_FULFILLED,
  FINANCE_DATA_FULFILLED,
  TERM_AND_CONDITION_FULFILLED,
  GET_STARTED_FULFILLED,
  COMPANY_DATA_FULFILLED,
  FINANCE_DATA_BACK
} from "./actions";
const initialSnackbarState = {
  loggedIn: false,
  tryAllLogin: false,
  submitsucc: false,
  email: "",
  otptype: "",
  userData: [],
  companyData: {},
  projectData: {},
  finaceData: {},
  profileCompleted: false,
};
export const authreducer = (state = initialSnackbarState, action) => {
  switch (action.type) {
    case "LOGIN_FULFILLED": {
      return { ...state, ...action.payload };
    }
    case LOGOUT_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case LOGIN_PENDING:
      return { ...state, ...action.payload };
    case LOGIN_REJECTED:
      return { ...state, ...action.payload };
    case COMPANY_DATA_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case PROJECT_DATA_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case FINANCE_DATA_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case TERM_AND_CONDITION_FULFILLED:{
      return {...state, ...action.payload}
    }
    case GET_STARTED_FULFILLED:{
      return {...state, ...action.payload}
    }
    case FINANCE_DATA_BACK:{
      return {...state, ...action.payload}
    }
    default:
      return state;
  }
};
