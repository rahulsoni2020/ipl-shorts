import ROUTES from "@/constants/route.constants";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: ROUTES.BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });