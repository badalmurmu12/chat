import {
  BACKDROP_OPEN_FULFILLED,
  BACKDROP_CLOSE_FULFILLED,
  FILE_UPLOAD_FULFILLED,
  SAVE_PROJECT_BASIC_DATA,
  SAVE_PROJECT_SUMMARY_DATA,
  SAVE_PROJECT_DATA,
  SAVE_PROJECT_GO_DASHBOARD,
  CONTACT_US_SUCCESS,
  BACK_PROJECT_BASIC,
  BACK_PROJECT_SUMMARY,
  BACK_PROJECT_QUESTION,
  BACK_PROJECT_FINAL,
  PROJECT_DATA_SAVE_DRAFT,
  INITIAL_PROJECT_DATA_SAVE,
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  POST_INTERESTED_PENDING,
  POST_INTERESTED_SUCCESS,
  POST_INTERESTED_FAILURE,
  GET_TASK_LIST_SUCCESS,
  POST_TASK_LIST_SUCCESS,
  AMI_INTERESTED_SUCCESS,
  AMI_INTERESTED_FAILURE,
  GET_TIMELINE_LIST_PENDING,
  GET_TIMELINE_LIST_SUCCESS,
  GET_TIMELINE_LIST_FAILURE,
  POST_TIMELINE_LIST_PENDING,
  POST_TIMELINE_LIST_SUCCESS,
  POST_TIMELINE_LIST_FAILURE,
  ALL_DOCUMENTS_PENDING,
  ALL_DOCUMENTS_SUCCESS,
  ALL_DOCUMENTS_FAILURE,
  INFORMATION_DEVELOPER_SUCCESS,
  INFORMATION_DEVELOPER_FAILURE,
  INFORMATION_DEVELOPER_PENDING,
  INFORMATION_DEVELOPER_UNAUTHORISED,
  HIGHLIGHT_I_AM_INTERESTED,
  HIGHLIGHT_REMOVE_I_AM_INTERESTED,
  HIGHLIGHT_MORE_QUESTION,
  HIGHLIGHT_REMOVE_MORE_QUESTION,
  HIGHLIGHT_DOCUMENTS,
  HIGHLIGHT_REMOVE_DOCUMENTS,
  TASK_ANIMATION_START,
  TASK_ANIMATION_END,
  FETCH_ALL_PROJECT_SUCCESS,
  POST_SEARCH_PROJECT_SUCCESS,
  RESET_SEARCH_PROJECT_SUCCESS,
  POST_SORT_PROJECT_SUCCESS,
  INFORMATION_DEVELOPER_GEN_AI_PENDING,
  INFORMATION_DEVELOPER_GEN_AI_SUCCESS,
  INFORMATION_DEVELOPER_GEN_AI_FAILURE,
  AI_INTERACTIVE_MESSAGE_SUCCESS,
  AI_ANALYTICS_PENDING,
  AI_ANALYTICS_SUCCESS,
  AI_ANALYTICS_FAILURE,
  REFRESH_CHAT_SUCCESS,
  ADD_CHAT_MESSAGE,
  SET_CHAT_LOADING,
  CLEAR_CHAT_HISTORY,
  TIMELINE_BACKDROP_OPEN,
  ANALYTICS_BACKDROP_OPEN,
  TIMELINE_BACKDROP_CLOSE,
  ANALYTICS_BACKDROP_CLOSE,
  iamInterested,
} from "./actions";

import { projectData } from "../../utils/mockdata";

const initialState = {
  snackbar: false,
  openBackdrop: false,
  url: "",
  basicData: true,
  summaryData: false,
  fileSentTollm: false,
  summaryFromLlm: false,
  additionalQuestion: false,
  contactUs: false,
  finalSteps: false,
  contactUsBackdrop: false,
  requestDocumentsBackdrop: false,
  inviteOthersBackdrop: false,
  announcementBackdrop: false,
  projectData: null,
  loading: false,
  error: null,
  onboardingComplete: false,
  iamInterested: false,
  unauthorised: false,
  highlightIam: false,
  highlightMoreQ: false,
  highlightdoc: false,
  animationtask: false,
  projectBasicData: [],
  projectGenAIBasicData: {},
  taskList: [],
  searchKeyword: '',
  projects: [],
  copyProjects: [],
  sortType: 'ascending',
  projectGenAIAnswer: [],
  projectGenAIAnalytics: [],
  chatHistory: [],
  chatLoading: false,
  openTimelineBackdrop: false,
  openAnalysisBackdrop: false,
  filters: {
    industry: [],
    risk: [],
    readiness: []
  },
  ...projectData
};
function applyFilters(projects, filters) {
  return projects.filter(project => {
    const data = JSON.parse(project.projectData);
    const projectDetails = data.data || data;

    const industryMatch = filters.industry.length === 0 || filters.industry.includes(projectDetails.industry);
    const riskMatch = filters.risk.length === 0 || filters.risk.includes(projectDetails.risk);
    const readinessMatch = filters.readiness.length === 0 || filters.readiness.includes(projectDetails.readiness);

    return industryMatch && riskMatch && readinessMatch;
  });

}

function sortProjectsByQ1(projects, sortType = 'ascending') {
  return [...projects].sort((a, b) => {
    const getQ1Value = (project) => {
      const projectData = JSON.parse(project.projectData);
      const q1 = projectData.data?.ProjectQuestion?.q1 || projectData.ProjectQuestion?.q1 || '';

      // Extract numeric value and convert to millions
      const numericValue = parseFloat(q1.replace(/[^\d.]/g, ''));
      if (isNaN(numericValue)) return 0;

      if (q1.includes('million')) return numericValue;
      if (q1.length >= 6) return numericValue / 1000; // Assume thousands, convert to millions
      return numericValue;
    };

    const valueA = getQ1Value(a);
    const valueB = getQ1Value(b);

    if (sortType === 'ascending') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}

function searchProjectsByKeyword(projects, keyword) {
  const lowercasedKeyword = keyword.toLowerCase();
  return projects.filter(project => {
    const data = JSON.parse(project.projectData);
    const basicData = data.data?.BasicData || data.BasicData;
    const projectQuestion = data.data?.ProjectQuestion || data.ProjectQuestion;

    return (
      basicData.ProjectName.toLowerCase().includes(lowercasedKeyword) ||
      basicData.ProjectLocation.toLowerCase().includes(lowercasedKeyword) ||
      projectQuestion.q1.toLowerCase().includes(lowercasedKeyword)
    );
  });
}

function applyFiltersAndSearch(projects, filters) {
  return projects.filter(project => {
    const data = JSON.parse(project.projectData);
    const projectDetails = data.data || data;
    const basicData = projectDetails.BasicData || {};
    const projectQuestion = projectDetails.ProjectQuestion || {};

    const industryMatch = filters.industryMulti.length === 0 || filters.industryMulti.includes(basicData.industry);
    const locationMatch = !filters.location || basicData.ProjectLocation.toLowerCase().includes(filters.location.toLowerCase());
    const fundMatch = !filters.fund || projectQuestion.q1 === filters.fund;
    const stageMatch = !filters.stage || basicData?.ProjectStage === filters.stage;
    const riskMatch = !filters.risk || basicData?.ProjectRisk === filters.risk;
    const searchMatch = !filters.searchTxt ||
      basicData.ProjectName.toLowerCase().includes(filters.searchTxt.toLowerCase()) ||
      basicData.ProjectLocation.toLowerCase().includes(filters.searchTxt.toLowerCase()) ||
      projectQuestion.q1.toLowerCase().includes(filters.searchTxt.toLowerCase());

    return industryMatch && locationMatch && fundMatch && stageMatch && riskMatch && searchMatch;
  });
}
export const projectreducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FULFILLED": {
      return { ...state, ...action.payload };
    }
    case BACKDROP_OPEN_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case BACKDROP_CLOSE_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case FILE_UPLOAD_FULFILLED: {
      return { ...state, ...action.payload };
    }
    case SAVE_PROJECT_BASIC_DATA: {
      return { ...state, ...action.payload };
    }
    case SAVE_PROJECT_SUMMARY_DATA: {
      return { ...state, ...action.payload }
    }
    case SAVE_PROJECT_DATA: {
      return { ...state, ...action.payload }
    }
    case SAVE_PROJECT_GO_DASHBOARD: {
      return { ...state, ...action.payload }
    }
    case CONTACT_US_SUCCESS: {
      return { ...state, ...action.payload }
    }
    case BACK_PROJECT_BASIC: {
      return { ...state, ...action.payload }
    }
    case BACK_PROJECT_SUMMARY: {
      return { ...state, ...action.payload }
    }
    case BACK_PROJECT_QUESTION: {
      return { ...state, ...action.payload }
    }
    case BACK_PROJECT_FINAL: {
      return { ...state, ...action.payload }
    }
    case PROJECT_DATA_SAVE_DRAFT: {
      return { ...state, ...action.payload }
    }
    case INITIAL_PROJECT_DATA_SAVE: {
      return { ...state, ...action.payload }
    }
    case TIMELINE_BACKDROP_OPEN: {
      return { ...state, ...action.payload }
    }
    case ANALYTICS_BACKDROP_OPEN: {
      return { ...state, ...action.payload }
    }
    case TIMELINE_BACKDROP_CLOSE: {
      return { ...state, ...action.payload }
    }
    case ANALYTICS_BACKDROP_CLOSE: {
      return { ...state, ...action.payload }
    }
    case FETCH_PROJECT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
        onboardingComplete: action.payload.onboardingComplete,
        error: null
      };
    case FETCH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case POST_INTERESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        iamInterested: true
      }
    case GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        taskList: action.payload.task
      }
    case POST_TASK_LIST_SUCCESS:
      return {
        ...state,
      }
    case POST_TIMELINE_LIST_SUCCESS:
      return {
        ...state,

      }
    case GET_TIMELINE_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case AMI_INTERESTED_SUCCESS:
      return {
        ...state,
        iamInterested: action.payload
      }
    case AMI_INTERESTED_FAILURE:
      return {
        ...state,
        iamInterested: false
      }
    case ALL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case INFORMATION_DEVELOPER_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case AI_ANALYTICS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case INFORMATION_DEVELOPER_PENDING:
      return {
        ...state,
        ...action.payload
      }

    case INFORMATION_DEVELOPER_FAILURE:
      return {
        ...state,
        ...action.payload
      }


    case INFORMATION_DEVELOPER_GEN_AI_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case INFORMATION_DEVELOPER_GEN_AI_PENDING:
      return {
        ...state,
        ...action.payload
      }

    case INFORMATION_DEVELOPER_GEN_AI_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    case INFORMATION_DEVELOPER_UNAUTHORISED:
      return {
        ...state,
        ...action.payload
      }
    case HIGHLIGHT_I_AM_INTERESTED:
      return {
        ...state,
        ...action.payload
      }
    case HIGHLIGHT_REMOVE_I_AM_INTERESTED:
      return {
        ...state,
        ...action.payload
      }
    case HIGHLIGHT_MORE_QUESTION:
      return {
        ...state,
        ...action.payload
      }
    case HIGHLIGHT_REMOVE_MORE_QUESTION:
      return {
        ...state,
        ...action.payload
      }
    case HIGHLIGHT_DOCUMENTS:
      return {
        ...state,
        ...action.payload
      }
    case HIGHLIGHT_REMOVE_DOCUMENTS:
      return {
        ...state,
        ...action.payload
      }

    case TASK_ANIMATION_START:
      return {
        ...state,
        ...action.payload
      }
    case TASK_ANIMATION_END:
      return {
        ...state,
        ...action.payload
      }
    case FETCH_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case AI_INTERACTIVE_MESSAGE_SUCCESS:
      return {
        ...state,
        projectGenAIAnswer: action.payload,
      }
    case POST_SEARCH_PROJECT_SUCCESS:
      const projects = applyFiltersAndSearch(state.copyProjects, action.payload);
      return {
        ...state,
        projects,
        searchKeyword: action?.payload
      };
    case RESET_SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state?.copyProjects,
        searchKeyword: ''
      }
    case POST_SORT_PROJECT_SUCCESS:
      const proj = sortProjectsByQ1(state?.copyProjects, action?.payload?.type);
      return {
        ...state,
        projects: proj,
        sortType: action?.payload?.type

      };
    case REFRESH_CHAT_SUCCESS:
      return {
        ...state,
        projectGenAIAnswer: []
      }

    case ADD_CHAT_MESSAGE:
      return {
        ...state,
        chatHistory: Array.isArray(state.chatHistory)
          ? [...state.chatHistory, action.payload]
          : [action.payload],
      };

    case SET_CHAT_LOADING:
      return {
        ...state,
        chatLoading: action.payload,
      };

    case CLEAR_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: [],
      };
    case 'REPLACE_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: state.chatHistory.map((msg, index) =>
          index === action.payload.index ? action.payload.message : msg
        )
      };

    default:
      return state;
  }
};
