import axios from "axios";
import { DOMAIN_BE } from "./constant";

export const http = axios.create({
  baseURL: DOMAIN_BE,
  timeout: 5000, //thời gian api res cho user
});
http.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    };
  },
  (err) => {
    console.log(err);
  }
);
