import axios from "axios";
import { LOCAL_STORAGE_TOKEN, API } from "../constants";

const defaultConfig = {
  baseURL: API.BASE,
  responseType: "json",
};

function request(config = defaultConfig) {
  const instance = axios.create(config);

  function getToken() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }

  function setToken(token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    attachTokenHeader(token);
  }

  function removeToken() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    attachTokenHeader(undefined);
  }

  function attachTokenHeader(token = getToken()) {
    instance.defaults.headers.Authorization = token
      ? `Bearer ${token}`
      : undefined;
  }

  function hasToken() {
    return instance.defaults.headers.Authorization;
  }

  return {
    ...instance,
    getToken,
    setToken,
    removeToken,
    attachTokenHeader,
    hasToken,
  };
}

export default request();
