import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = "https://api.quickclick.online";

export const baseService = axios.create({
  baseURL,
});

export const logout = async () => {
  await AsyncStorage.removeItem("authorization");
};

export const fillToken = async (authorization: string) => {
  baseService.defaults.headers.common.Authorization = `Bearer ${authorization}`;
  await AsyncStorage.setItem("authorization", authorization);
};

export const attachAuthToken = (authorization: string) => {
  baseService.defaults.headers.common.Authorization = `Bearer ${authorization}`;
};

baseService.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);
