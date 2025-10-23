import { http } from '../../services/client';
import * as API from "../../services/api";
import { getDatabase, ref, onValue } from 'firebase/database';

export const LOGIN_FULFILLED = "LOGIN_FULFILLED";
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGOUT_FULFILLED = "LOGOUT_FULFILLED";
export const BACKDROP_OPEN_FULFILLED = "BACKDROP_OPEN_FULFILLED";
export const BACKDROP_CLOSE_FULFILLED = "BACKDROP_CLOSE_FULFILLED";
export const FILE_UPLOAD_FULFILLED = "FILE_UPLOAD_FULFILLED";
export const SAVE_PROJECT_BASIC_DATA = "SAVE_PROJECT_BASIC_DATA";
export const SAVE_PROJECT_SUMMARY_DATA = "SAVE_PROJECT_SUMMARY_DATA";
export const SAVE_PROJECT_DATA = "SAVE_PROJECT_DATA";
export const SAVE_PROJECT_GO_DASHBOARD = "SAVE_PROJECT_GO_DASHBOARD";
export const CONTACT_US_SUCCESS = "CONTACT_US_SUCCESS";
export const BACK_PROJECT_BASIC = "BACK_PROJECT_BASIC";
export const BACK_PROJECT_SUMMARY = "BACK_PROJECT_SUMMARY";
export const BACK_PROJECT_QUESTION = "BACK_PROJECT_QUESTION";
export const BACK_PROJECT_FINAL = "BACK_PROJECT_FINAL";
export const PROJECT_DATA_SAVE = "PROJECT_DATA_SAVE";
export const PROJECT_DATA_SAVE_DRAFT = "PROJECT_DATA_SAVE_DRAFT";
export const INITIAL_PROJECT_DATA_SAVE = "INITIAL_PROJECT_DATA_SAVE";
export const FETCH_PROJECT_START = 'FETCH_PROJECT_START';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';
export const HIGHLIGHT_REMOVE_I_AM_INTERESTED = 'HIGHLIGHT_REMOVE_I_AM_INTERESTED';
export const HIGHLIGHT_I_AM_INTERESTED = 'HIGHLIGHT_I_AM_INTERESTED';
export const HIGHLIGHT_MORE_QUESTION = 'HIGHLIGHT_MORE_QUESTION';
export const HIGHLIGHT_REMOVE_MORE_QUESTION = 'HIGHLIGHT_REMOVE_MORE_QUESTION';
export const HIGHLIGHT_DOCUMENTS = 'HIGHLIGHT_DOCUMENTS';
export const HIGHLIGHT_REMOVE_DOCUMENTS = 'HIGHLIGHT_REMOVE_DOCUMENTS';
export const TASK_ANIMATION_START = 'TASK_ANIMATION_START';
export const TASK_ANIMATION_END = 'TASK_ANIMATION_END';

export const TIMELINE_BACKDROP_OPEN = 'TIMELINE_BACKDROP_OPEN';
export const ANALYTICS_BACKDROP_OPEN = 'ANALYTICS_BACKDROP_OPEN';
export const TIMELINE_BACKDROP_CLOSE = 'TIMELINE_BACKDROP_CLOSE';
export const ANALYTICS_BACKDROP_CLOSE = 'ANALYTICS_BACKDROP_CLOSE';


export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const SET_CHAT_LOADING = 'SET_CHAT_LOADING';
export const CLEAR_CHAT_HISTORY = 'CLEAR_CHAT_HISTORY';

export const addChatMessage = (message) => ({
  type: ADD_CHAT_MESSAGE,
  payload: message,
});

export const setChatLoading = (isLoading) => ({
  type: SET_CHAT_LOADING,
  payload: isLoading,
});

export const clearChatHistory = () => ({
  type: CLEAR_CHAT_HISTORY,
});

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




export const openRequestDocumentsBackdrop = () => ({
  type: BACKDROP_OPEN_FULFILLED,
  payload: {
    requestDocumentsBackdrop: true
  },
});

export const closeRequestDocumentsBackdrop = () => ({
  type: BACKDROP_CLOSE_FULFILLED,
  payload: {
    requestDocumentsBackdrop: false,
  },
});


export const openInviteOthersBackdrop = () => ({
  type: BACKDROP_OPEN_FULFILLED,
  payload: {
    inviteOthersBackdrop: true
  },
});

export const closeInviteOthersBackdrop = () => ({
  type: BACKDROP_CLOSE_FULFILLED,
  payload: {
    inviteOthersBackdrop: false,
  },
});


export const openAnnouncementBackdrop = () => ({
  type: BACKDROP_OPEN_FULFILLED,
  payload: {
    announcementBackdrop: true
  },
});

export const closeAnnouncementBackdrop = () => ({
  type: BACKDROP_CLOSE_FULFILLED,
  payload: {
    announcementBackdrop: false,
  },
});


export const openContactUsBackdrop = () => ({
  type: BACKDROP_OPEN_FULFILLED,
  payload: {
    contactUsBackdrop: true
  },
});

export const closeContactUsBackdrop = () => ({
  type: BACKDROP_CLOSE_FULFILLED,
  payload: {
    contactUsBackdrop: false,
  },
});
export const openBackdrop = (link, type, title) => ({
  type: BACKDROP_OPEN_FULFILLED,
  payload: {
    openBackdrop: true,
    link: link,
    type: type,
    title: title
  },
});

export const closeBackdrop = () => ({
  type: BACKDROP_CLOSE_FULFILLED,
  payload: {
    openBackdrop: false,
    BasicData: {},
    link: "",
    title: "",
    type: ""
  },
});


export const openTimelineBackdrop = () => ({
  type: TIMELINE_BACKDROP_OPEN,
  payload: {
    openTimelineBackdrop: true,
  }
});

export const openAnalyticBackdrop = () => ({
  type: ANALYTICS_BACKDROP_OPEN,
  payload: {
    openAnalysisBackdrop: true,
  }
});

export const closeTimelineBackdrop = () => ({
  type: TIMELINE_BACKDROP_CLOSE,
  payload: {
    openTimelineBackdrop: false,
  }
});

export const closeAnalyticBackdrop = () => ({
  type: ANALYTICS_BACKDROP_CLOSE,
  payload: {
    openAnalysisBackdrop: false,
  }
});

export const fileUploadSucces = (url) => ({
  type: FILE_UPLOAD_FULFILLED,
  payload: { url: url, fileSentTollm: true },
});

export const projectBasicDataSuccess = (data) => ({
  type: SAVE_PROJECT_BASIC_DATA,
  payload: {
    ...data,
    basicData: false,
    summaryData: true,
    summaryFromLlm: false,
  },
});

export const projectBasicData = (data) => ({
  type: SAVE_PROJECT_BASIC_DATA,
  payload: {
    ...data,
  },
});

export const saveSummary = (data) => ({
  type: SAVE_PROJECT_SUMMARY_DATA,
  payload: {
    ...data,
    summaryFromLlm: false,
    fileSentTollm: false,
    additionalQuestion: true,
  },
});

export const projectSummarySuccess = (data) => ({
  type: SAVE_PROJECT_SUMMARY_DATA,
  payload: { ...data, summaryFromLlm: false },
});

export const projectSummaryBack = (data) => ({
  type: BACK_PROJECT_BASIC,
  payload: { ...data },
});

export const projectSummaryFileBack = (data) => ({
  type: BACK_PROJECT_SUMMARY,
  payload: { ...data },
});

export const projectQuestionBack = (data) => ({
  type: BACK_PROJECT_QUESTION,
  payload: { ...data },
});

export const projectFinalBack = (data) => ({
  type: BACK_PROJECT_FINAL,
  payload: { ...data },
});

export const projectDataSuccess = (data) => ({
  type: SAVE_PROJECT_DATA,
  payload: { ...data, additionalQuestion: false },
});

export const goToDashboard = (data) => ({
  type: SAVE_PROJECT_GO_DASHBOARD,
  payload: {
    ...data,
    openBackdrop: false,
    basicData: true,
    summaryData: false,
    fileSentTollm: false,
    additionalQuestion: false,
  },
});

export const contactUs = (data) => ({
  type: CONTACT_US_SUCCESS,
  payload: {
    ...data,
    basicData: false,
    contactUs: true,
    finalSteps: false,
    summaryData: false,
    fileSentTollm: false,
    additionalQuestion: false,
  },
});

export const projectDataSave = (data) => ({
  type: PROJECT_DATA_SAVE,
  payload: { projectData: data },
});

export const projectSummarySaveDraft = (data) => ({
  type: PROJECT_DATA_SAVE_DRAFT,
  payload: { ...data },
});

export const projectDataSuccessDraft = (data) => ({
  type: SAVE_PROJECT_DATA,
  payload: { ...data },
});

export const saveProject = (data) => ({
  type: INITIAL_PROJECT_DATA_SAVE,
  payload: { projectFetch: data[0], projectData: data[0] },
});

export const highlightIamInterest = () => ({
  type: HIGHLIGHT_I_AM_INTERESTED,
  payload: { highlightIam: true }
})

export const highlightIamInterestNot = () => ({
  type: HIGHLIGHT_REMOVE_I_AM_INTERESTED,
  payload: { highlightIam: false }
})



export const highlightMoreQuestion = () => ({
  type: HIGHLIGHT_MORE_QUESTION,
  payload: { highlightMoreQ: true }
})

export const highlightMoreQuestionNot = () => ({
  type: HIGHLIGHT_REMOVE_MORE_QUESTION,
  payload: { highlightMoreQ: false }
})

export const highlightDocuments = () => ({
  type: HIGHLIGHT_DOCUMENTS,
  payload: { highlightdoc: true }
})

export const highlightDocumentsNot = () => ({
  type: HIGHLIGHT_REMOVE_DOCUMENTS,
  payload: { highlightdoc: false }
})

export const animationStart = () => ({
  type: TASK_ANIMATION_START,
  payload: { animationtask: true }
})

export const animationEnd = () => ({
  type: TASK_ANIMATION_END,
  payload: { animationtask: false }
})


export const REFRESH_CHAT_SUCCESS = 'REFRESH_CHAT_SUCCESS';

export const refreshChat = () => ({
  type: REFRESH_CHAT_SUCCESS,
  payload: {},
});
 

export const CREATE_PROJECT_PENDING = 'CREATE_PROJECT_PENDING';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

const createProjectRequest = () => ({
  type: CREATE_PROJECT_PENDING,
});

const createProjectSuccess = (project) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: project,
});

const createProjectFailure = (error) => ({
  type: CREATE_PROJECT_FAILURE,
  payload: error,
});

export const createProject = (projectData) => async (dispatch) => {
  dispatch(createProjectRequest());

  try {
    const response = await http.post('/projects', projectData);
    dispatch(createProjectSuccess(response.data));
  } catch (error) {
    dispatch(createProjectFailure(error.message));
  }
};


export const fetchProjectData = (uuid) => {
  return (dispatch) => { // Note: This doesn't need to be async
    dispatch({ type: 'FETCH_PROJECT_START' });

    const db = getDatabase();
    const path = `projects/${uuid}`;
    const projectRef = ref(db, path);

    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch({
          type: 'FETCH_PROJECT_SUCCESS',
          payload: data
        });
      } else {
        dispatch({
          type: 'FETCH_PROJECT_FAILURE',
          payload: 'No project data found'
        });
      }
    }, (error) => {
      dispatch({
        type: 'FETCH_PROJECT_FAILURE',
        payload: error.message
      });
    });
  };
};


const contactUsSuccess = (ubasicData) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: { ubasicData, otp: true },
});

const contactUsFailed = (err) => ({
  type: PROJECT_DATA_SAVE_DRAFT,
  payload: { err, otp: false },
});



export const contactUsAir = (raw) => async (dispatch) => {
  try {
    const res = await API.contactUs(raw);
    dispatch(contactUsSuccess(res));
  } catch (err) {
    dispatch(contactUsFailed(err));
  }
};


export const requestDocuments = (raw, task) => async (dispatch) => {
  try {
    const res = await API.requestDocuments(raw);
    dispatch(postTaskList(raw?.uuid, task));
    dispatch(closeRequestDocumentsBackdrop())
  } catch (err) {

  }
}


export const inviteUser = (raw) => async (dispatch) => {
  try {
    const res = await API.inviteUser(raw);
    dispatch(closeInviteOthersBackdrop())
  } catch (err) {

  }
}


export const POST_INTERESTED_PENDING = 'POST_INTERESTED_PENDING';
export const POST_INTERESTED_SUCCESS = 'POST_INTERESTED_SUCCESS';
export const POST_INTERESTED_FAILURE = 'POST_INTERESTED_FAILURE';

const postInterestedRequest = () => ({
  type: POST_INTERESTED_PENDING,
});

const postInterestedSuccess = (project) => ({
  type: POST_INTERESTED_SUCCESS,
  payload: project,
});

const postInterestedFailure = (error) => ({
  type: POST_INTERESTED_FAILURE,
  payload: error,
});


export const iamInterested = (raw) => async (dispatch) => {

  try {

    dispatch(postInterestedRequest())
    const res = await API.iamInterested(raw);
    dispatch(postInterestedSuccess(res))
  } catch (err) {
    dispatch(postInterestedFailure(err))
  }
}


export const GET_TASK_LIST_PENDING = 'GET_TASK_LIST_PENDING';
export const GET_TASK_LIST_SUCCESS = 'GET_TASK_LIST_SUCCESS';
export const GET_TASK_LIST_FAILURE = 'GET_TASK_LIST_FAILURE';

const getTaskListRequest = () => ({
  type: GET_TASK_LIST_PENDING,
});

const getTaskListSuccess = (task) => ({
  type: GET_TASK_LIST_SUCCESS,
  payload: { task: task?.reason },
});

const getTaskListFailure = (error) => ({
  type: GET_TASK_LIST_FAILURE,
  payload: error,
});


export const getTaskList = (id) => async (dispatch) => {

  dispatch(getTaskListRequest())
  try {
    const res = await API.getTaskList(id)
    dispatch(getTaskListSuccess(res))
  } catch (err) {
    dispatch(getTaskListFailure(err))
  }
}

export const POST_TASK_LIST_PENDING = 'POST_TASK_LIST_PENDING';
export const POST_TASK_LIST_SUCCESS = 'POST_TASK_LIST_SUCCESS';
export const POST_TASK_LIST_FAILURE = 'POST_TASK_LIST_FAILURE';

const postTaskListRequest = () => ({
  type: POST_TASK_LIST_PENDING,
});

const postTaskListSuccess = (task) => ({
  type: POST_TASK_LIST_SUCCESS,
});

const postTaskListFailure = (error) => ({
  type: POST_TASK_LIST_FAILURE,
  payload: error,
});


export const postTaskList = (id, task) => async (dispatch) => {
  dispatch(postTaskListRequest())
  try {
    const res = await API.postTaskList(id, task)
    dispatch(postTaskListSuccess(res))
  } catch (err) {
    dispatch(postTaskListFailure(err))
  }
}





export const POST_TIMELINE_LIST_PENDING = 'POST_TIMELINE_LIST_PENDING';
export const POST_TIMELINE_LIST_SUCCESS = 'POST_TIMELINE_LIST_SUCCESS';
export const POST_TIMELINE_LIST_FAILURE = 'POST_TIMELINE_LIST_FAILURE';

const postTimelineRequest = () => ({
  type: POST_TIMELINE_LIST_PENDING,
});

const postTimelineSuccess = (task) => ({
  type: POST_TIMELINE_LIST_SUCCESS,
});

const postTimelineFailure = (error) => ({
  type: POST_TIMELINE_LIST_FAILURE,
  payload: error,
});


export const postTimeline = (id, post) => async (dispatch) => {
  dispatch(postTimelineRequest())
  try {
    const res = await API.postTimeline(id, post)
    dispatch(postTimelineSuccess(res))
    dispatch(getTimeline(id))
    dispatch(closeAnnouncementBackdrop())
  } catch (err) {
    dispatch(postTimelineFailure())
  }
}




export const GET_TIMELINE_LIST_PENDING = 'GET_TIMELINE_LIST_PENDING';
export const GET_TIMELINE_LIST_SUCCESS = 'GET_TIMELINE_LIST_SUCCESS';
export const GET_TIMELINE_LIST_FAILURE = 'GET_TIMELINE_LIST_FAILURE';

const getTimelineRequest = () => ({
  type: GET_TIMELINE_LIST_PENDING,
});

const getTimelineSuccess = (post) => ({
  type: GET_TIMELINE_LIST_SUCCESS,
  payload: { newTimeline: post?.reason }
});

const getTimelineFailure = (error) => ({
  type: GET_TIMELINE_LIST_FAILURE,
  payload: error,
});


export const getTimeline = (id) => async (dispatch) => {
  dispatch(getTimelineRequest())
  try {
    const res = await API.getTimeline(id)
    dispatch(getTimelineSuccess(res))
  } catch (err) {
    dispatch(getTimelineFailure())
  }
}






export const AMI_INTERESTED_PENDING = 'AMI_INTERESTED_PENDING';
export const AMI_INTERESTED_SUCCESS = 'AMI_INTERESTED_SUCCESS';
export const AMI_INTERESTED_FAILURE = 'AMI_INTERESTED_FAILURE';

const amiInterestedRequest = () => ({
  type: AMI_INTERESTED_PENDING,
});

const amiInterestedSuccess = (interested) => {
  return ({
    type: AMI_INTERESTED_SUCCESS,
    payload: interested,
  })
};

const amiInterestedFailure = (error) => ({
  type: AMI_INTERESTED_FAILURE,
  payload: error,
});


export const amiInterested = (raw) => async (dispatch) => {
  dispatch(amiInterestedRequest())
  try {
    const res = await API.amiInterested(raw);
    dispatch(amiInterestedSuccess(res))
  } catch (err) {
    dispatch(amiInterestedFailure(err))
  }
}




export const ALL_DOCUMENTS_PENDING = 'ALL_DOCUMENTS_PENDING';
export const ALL_DOCUMENTS_SUCCESS = 'ALL_DOCUMENTS_SUCCESS';
export const ALL_DOCUMENTS_FAILURE = 'ALL_DOCUMENTS_FAILURE';

const allDocumentsRequest = () => ({
  type: ALL_DOCUMENTS_PENDING,
});

const allDocumentsSuccess = (doc) => {

  const categoryStructure = {};

  doc.forEach(item => {
    if (!categoryStructure[item.category]) {
      categoryStructure[item.category] = [];
    }

    categoryStructure[item.category].push({
      uuid: item.uuid,
      link: item.link,
      thumbnail: item.thumbnail,
      title: item.title,
      type: item.type,
      text: item.text,
      timestamp: item.timestamp,
      displayName: item.displayName,
      photoUrl: item.photoUrl
    });
  });



  return ({
    type: ALL_DOCUMENTS_SUCCESS,
    payload: { documents: categoryStructure },
  });
}




const allDocumentsFailure = (error) => ({
  type: ALL_DOCUMENTS_FAILURE,
  payload: error,
});


export const allDocuments = (raw) => async (dispatch) => {
  dispatch(allDocumentsRequest())
  try {
    const res = await API.getAllDoc(raw);
    dispatch(allDocumentsSuccess(res))
  } catch (err) {
    dispatch(allDocumentsFailure(err))
  }
}







export const INFORMATION_DEVELOPER_PENDING = 'INFORMATION_DEVELOPER_PENDING';
export const INFORMATION_DEVELOPER_SUCCESS = 'INFORMATION_DEVELOPER_SUCCESS';
export const INFORMATION_DEVELOPER_FAILURE = 'INFORMATION_DEVELOPER_FAILURE';
export const INFORMATION_DEVELOPER_UNAUTHORISED = 'INFORMATION_DEVELOPER_UNAUTHORISED';

const informationsDeveloperRequest = () => ({
  type: INFORMATION_DEVELOPER_PENDING,
  payload: { loading: true }
});

const informationsDeveloperSuccess = (info) => {
  if (info?.reason?.length > 0 && typeof (info?.reason) === 'string') {
    return ({
      type: INFORMATION_DEVELOPER_SUCCESS,
      payload: {
        projectBasicData: JSON.parse(info?.reason),
        unauthorised: false,
        loading: false
      },
    });
  }
  else {
    return ({
      type: INFORMATION_DEVELOPER_SUCCESS,
      payload: {
        projectBasicData: {},
        unauthorised: false,
        loading: false
      },
    });
  }

}

const informationsDeveloperFailure = (error) => ({
  type: INFORMATION_DEVELOPER_FAILURE,
  payload: { loading: false, error: error },
});


const informationsDeveloperUnauthorised = (error) => ({
  type: INFORMATION_DEVELOPER_UNAUTHORISED,
  payload: {
    projectBasicData: {},
    unauthorised: true,
    loading: false
  }
})


export const informationsDeveloper = (raw) => async (dispatch) => {
  dispatch(informationsDeveloperRequest())
  try {
    const res = await API.getDeveloperInformation(raw);
    console.log('res', res);
    if (res?.reason?.length > 0) {
      dispatch(informationsDeveloperSuccess(res))
    }
    else {
      dispatch(informationsDeveloperUnauthorised(res))
    }

  } catch (err) {
    dispatch(informationsDeveloperFailure(err))
  }
}




export const FETCH_ALL_PROJECT_PENDING = 'FETCH_ALL_PROJECT_PENDING';
export const FETCH_ALL_PROJECT_SUCCESS = 'FETCH_ALL_PROJECT_SUCCESS';
export const FETCH_ALL_PROJECT_FAILURE = 'FETCH_ALL_PROJECT_FAILURE';

const fetchAllProjectRequest = () => ({
  type: FETCH_ALL_PROJECT_PENDING,
});

const fetchAllProjectSuccess = (projects) => {
  return ({
    type: FETCH_ALL_PROJECT_SUCCESS,
    payload: { projects: projects, copyProjects: projects },
  })
};

const fetchAllProjectFailure = (error) => ({
  type: FETCH_ALL_PROJECT_FAILURE,
  payload: error,
});


export const fetchAllProject = (raw) => async (dispatch) => {
  dispatch(fetchAllProjectRequest())
  try {
    const res = await API.fetchAllProject(raw);
    dispatch(fetchAllProjectSuccess(res))
  } catch (err) {
    dispatch(fetchAllProjectFailure(err))
  }
}




export const POST_SEARCH_PROJECT_PENDING = 'POST_SEARCH_PROJECT_PENDING';
export const POST_SEARCH_PROJECT_SUCCESS = 'POST_SEARCH_PROJECT_SUCCESS';
export const POST_SEARCH_PROJECT_FAILURE = 'POST_SEARCH_PROJECT_FAILURE';

const postSearchRequest = () => ({
  type: POST_SEARCH_PROJECT_PENDING,
});

const postSearchSuccess = (raw) => {
  return ({
    type: POST_SEARCH_PROJECT_SUCCESS,
    payload: raw,
  })
};

const postSearchFailure = (error) => ({
  type: POST_SEARCH_PROJECT_FAILURE,
  payload: error,
});


export const postSearch = (raw) => (dispatch) => {
  dispatch(postSearchRequest(raw))
  try {
    dispatch(postSearchSuccess(raw))
  } catch (err) {
    dispatch(postSearchFailure(err))
  }
}


export const RESET_SEARCH_PROJECT_PENDING = 'RESET_SEARCH_PROJECT_PENDING';
export const RESET_SEARCH_PROJECT_SUCCESS = 'RESET_SEARCH_PROJECT_SUCCESS';
export const RESET_SEARCH_PROJECT_FAILURE = 'RESET_SEARCH_PROJECT_FAILURE';

const resetSearchRequest = () => ({
  type: RESET_SEARCH_PROJECT_PENDING,
});

const resetSearchSuccess = () => {
  return ({
    type: RESET_SEARCH_PROJECT_SUCCESS,
  })
};

const resetSearchFailure = (error) => ({
  type: RESET_SEARCH_PROJECT_FAILURE,
  payload: error,
});

export const resetSearch = () => (dispatch) => {
  dispatch(resetSearchRequest())
  try {
    dispatch(resetSearchSuccess())
  } catch (err) {
    dispatch(resetSearchFailure(err))
  }
}

export const POST_SORT_PROJECT_PENDING = 'POST_SORT_PROJECT_PENDING';
export const POST_SORT_PROJECT_SUCCESS = 'POST_SORT_PROJECT_SUCCESS';
export const POST_SORT_PROJECT_FAILURE = 'POST_SORT_PROJECT_FAILURE';

const postSortRequest = () => ({
  type: POST_SORT_PROJECT_PENDING,
});

const postSortSuccess = (type) => {
  return ({
    type: POST_SORT_PROJECT_SUCCESS,
    payload: {type: type}
  })
};

const postSortFailure = (error) => ({
  type: POST_SORT_PROJECT_FAILURE,
  payload: error,
});

export const postSort = (type) => (dispatch) => {
  dispatch(postSortRequest())
  try {
    dispatch(postSortSuccess(type))
  } catch (err) {
    dispatch(postSortFailure(err))
  }
}


export const INFORMATION_DEVELOPER_GEN_AI_PENDING = 'INFORMATION_DEVELOPER_GEN_AI_PENDING';
export const INFORMATION_DEVELOPER_GEN_AI_SUCCESS = 'INFORMATION_DEVELOPER_GEN_AI_SUCCESS';
export const INFORMATION_DEVELOPER_GEN_AI_FAILURE = 'INFORMATION_DEVELOPER_GEN_AI_FAILURE';

const informationsDeveloperGenAiRequest = () => ({
  type: INFORMATION_DEVELOPER_GEN_AI_PENDING,
  payload: { loading: true }
});

const informationsDeveloperGenAiSuccess = (info) => {
    return ({
      type: INFORMATION_DEVELOPER_GEN_AI_SUCCESS,
      payload: {
        projectGenAIBasicData: info,
        loading: false
      },
    });
}

const informationsDeveloperGenAiFailure = (error) => ({
  type: INFORMATION_DEVELOPER_GEN_AI_FAILURE,
  payload: {  projectGenAIBasicData: {},loading: false, error: error },
});

 


export const informationsDeveloperGenAi = (raw) => async (dispatch) => {
  dispatch(informationsDeveloperGenAiRequest())
  try {
    const res = await API.getDeveloperInformationGenAi(raw);
    dispatch(informationsDeveloperGenAiSuccess(res))
  } catch (err) {
    dispatch(informationsDeveloperGenAiFailure(err))
  }
}



export const AI_INTERACTIVE_MESSAGE_PENDING = 'AI_INTERACTIVE_MESSAGE_PENDING';
export const AI_INTERACTIVE_MESSAGE_SUCCESS = 'AI_INTERACTIVE_MESSAGE_SUCCESS';
export const AI_INTERACTIVE_MESSAGE_FAILURE = 'AI_INTERACTIVE_MESSAGE_FAILURE';

const aiInteractiveMessageRequest = () => ({
  type: AI_INTERACTIVE_MESSAGE_PENDING,
  payload: { loading: true }
});

const aiInteractiveMessageSuccess = (info) => {
    return ({
      type: AI_INTERACTIVE_MESSAGE_SUCCESS,
      payload: {
        loading: false
      },
    });
}

const aiInteractiveMessageFailure = (error) => ({
  type: AI_INTERACTIVE_MESSAGE_FAILURE,
  payload: {  projectGenAIBasicData: {},loading: false, error: error },
});

 


export const aiInteractiveMessage = (raw) => async (dispatch) => {
  dispatch(setChatLoading(true));
 
  
  try {
    const res = await API.aiInteractiveMessage(raw);
    dispatch(addChatMessage({ type: 'ai', message: res }));
    dispatch(aiInteractiveMessageSuccess(res));
  } catch (err) {
    dispatch(aiInteractiveMessageFailure(err));
  } finally {
    dispatch(setChatLoading(false));
  }
};


export const AI_ANALYTICS_PENDING = 'AI_ANALYTICS_PENDING';
export const AI_ANALYTICS_SUCCESS = 'AI_ANALYTICS_SUCCESS';
export const AI_ANALYTICS_FAILURE = 'AI_ANALYTICS_FAILURE';

const aiAnalyticsRequest = () => ({
  type: AI_ANALYTICS_PENDING,
  payload: { loading: true }
});

const aiAnalyticsSuccess = (info) => {
    return ({
      type: AI_ANALYTICS_SUCCESS,
      payload: {
        projectGenAIAnalytics: info,
        loading: false
      },
    });
}

const aiAnalyticsFailure = (error) => ({
  type: AI_ANALYTICS_FAILURE,
  payload: {  projectGenAIAnalytics: {},loading: false, error: error },
});

 


export const aiAnalytics = (raw) => async (dispatch) => {
  dispatch(aiAnalyticsRequest())
  try {
    const res = await API.fetchAIAnalytics(raw);
    dispatch(aiAnalyticsSuccess(res))
  } catch (err) {
    dispatch(aiAnalyticsFailure(err))
  }
}





// Modify the existing aiInteractiveMessage action




