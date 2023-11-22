import { userRequest } from "./requestMethod"
import {
  uploadProfileFailure,
  uploadProfileStart,
  uploadProfileSuccess,
} from "../redux/user"

export const upateProfileUser = async (dispatch, formData, username) => {
  console.log(formData)
  console.log("success")

  dispatch(uploadProfileStart())
  try {
    console.log("chạy đến đây roi")
    console.log(`user/update/` + username)
    const res = await userRequest.put(`user/update/` + username, formData)
    dispatch(uploadProfileSuccess(formData))
    return res
  } catch (err) {
    console.error(err)
    dispatch(uploadProfileFailure())
    throw err
  }
}
