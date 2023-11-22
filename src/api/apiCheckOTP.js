import {
  checkOtpStart,
  checkOtpStartFailure,
  checkOtpStartSuccess,
} from "../redux/userRegister"
import { publicRequest } from "./requestMethod"

export const checkOTP = async (dispatch, data) => {
  dispatch(checkOtpStart())
  try {
    const res = await publicRequest.post("auth/verifyOTP", data)
    return res
  } catch (error) {
    console.log(error)
    dispatch(checkOtpStartFailure())
    throw err
  }
}
