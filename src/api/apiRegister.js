import axios from "axios"

import {
  registerSuccess,
  registerFailure,
  registerStart,
} from "../redux/userRegister"
import { publicRequest } from "./requestMethod"

// export const APIRegister = async (username, gmail, password, gender, phone) => {
//   const apiUrl = process.env.EXPO_PUBLIC_API_REGISTER

//   const dataSend = {
//     username: username,
//     gmail: gmail,
//     password: password,
//     gender: gender,
//     phone: phone,
//   }

//   try {
//     const response = await publicRequest.post("/auth/register", dataSend)
//     return response
//   } catch (error) {
//     throw error
//   }
// }
export const register = async (
  dispatch,
  username,
  gmail,
  password,
  gender,
  phone,
) => {
  const dataSend = {
    username: username,
    gmail: gmail,
    password: password,
    gender: gender,
    phone: phone,
  }
  dispatch(registerStart())

  try {
    const res = await publicRequest.post("auth/register", dataSend)
    dispatch(registerSuccess(dataSend))
    return res
  } catch (err) {
    console.error(err)
    dispatch(registerFailure())
    throw err
  }
}
