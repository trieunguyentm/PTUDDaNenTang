import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
// )?.accessToken;
import { Platform } from "react-native"


const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:8080/api/"
    : "http://10.0.2.2:8080/api/"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})
export const userRequest = axios.create({
  baseURL: BASE_URL,
})
