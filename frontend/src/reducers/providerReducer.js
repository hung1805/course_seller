import {
  ADD_COURSE_DATA,
  ADD_COURSE_LESSONS,
  ADD_COURSE_TO_SERVER_FAIL,
  ADD_COURSE_TO_SERVER_REQUEST,
  ADD_COURSE_TO_SERVER_SUCCESS,
  CLEAR_COURSE_ADDED_INFO,
  USER_REGISTER_INFO_CLEAR,
  USER_REGIST_PROVIDER_FAIL,
  USER_REGIST_PROVIDER_REQUEST,
  USER_REGIST_PROVIDER_SUCCESS,
} from "../constants/userConstants";

export const providerReducer = (state = { loading: false, error: "", data: {} }, action) => {
  switch (action.type) {
    case USER_REGIST_PROVIDER_REQUEST: {
      return { ...state, loading: true };
    }
    case USER_REGIST_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };

    case USER_REGIST_PROVIDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_REGISTER_INFO_CLEAR:
      return {
        loading: false,
        data: {},
        error: "",
      };
    default:
      return state;
  }
};

export const providerAddCourse = (
  state = { loading: false, error: "", data: {}, lessons: [], message: "" },
  action
) => {
  switch (action.type) {
    case ADD_COURSE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_COURSE_LESSONS:
      return {
        ...state,
        lessons: [...state.lessons, action.payload],
      };
    case ADD_COURSE_TO_SERVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COURSE_TO_SERVER_SUCCESS:
      return { ...state, loading: false, message: "Your Course Has Successfully Added!" };
    case ADD_COURSE_TO_SERVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_COURSE_ADDED_INFO:
      return {
        loading: false,
        error: "",
        data: {},
        lessons: [],
        message: "",
      };
    default:
      return state;
  }
};
