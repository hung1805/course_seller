import axios from "axios";

import {
  USER_REGIST_PROVIDER_REQUEST,
  USER_REGIST_PROVIDER_SUCCESS,
  USER_REGIST_PROVIDER_FAIL,
  ADD_COURSE_TO_SERVER_FAIL,
  ADD_COURSE_TO_SERVER_REQUEST,
  ADD_COURSE_TO_SERVER_SUCCESS,
} from "../constants/userConstants";

export const registProvider = (providerInfo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REGIST_PROVIDER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/provider", { ...providerInfo, status: "waiting" }, config);
    console.log(data);
    dispatch({
      type: USER_REGIST_PROVIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGIST_PROVIDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const addNewProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_COURSE_TO_SERVER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, product, config);
    dispatch({
      type: ADD_COURSE_TO_SERVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: ADD_COURSE_TO_SERVER_FAIL, payload: error.message });
  }
};
