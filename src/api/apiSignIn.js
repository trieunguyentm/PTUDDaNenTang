import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "../redux/user"
import { publicRequest } from "./requestMethod"

// export const APISignIn = async (username, password) => {
//   const apiUrl = process.env.EXPO_PUBLIC_API_SIGNIN

//   const dataSend = {
//     username: username,
//     password: password,
//   }

//   try {
//     const response = await axios.post(apiUrl, dataSend)
//     return response
//   } catch (error) {
//     throw error
//   }
// }
export const login = async (dispatch, username, password) => {
  console.log("success")
  const dataSend = {
    username: username,
    password: password,
  }
  dispatch(loginStart())
  try {
    console.log("chạy đến đây")
    const res = await publicRequest.post("auth/signin", dataSend)
    const payload = {
      ...res.data.user,
      token: res.data.token,
    }
    dispatch(loginSuccess(payload))
    return res
  } catch (err) {
    dispatch(loginFailure())
    throw err
  }
}
