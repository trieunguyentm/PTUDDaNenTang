import axios from "axios"

import { userRequest } from "./requestMethod"
import { uploadFailure, uploadStart, uploadSuccess } from "../redux/user"

export const uploadImage = async (dispatch, formData, token) => {
  console.log(formData)
  console.log("success")

  dispatch(uploadStart())
  try {
    console.log("chạy đến đây roi")
    const res = await userRequest.post("file/uploadAvatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization" : "Bearer " + token,
      },
    })
    dispatch(uploadSuccess(res.data.userData))
    return res
  } catch (err) {
    console.error(err)
    dispatch(uploadFailure())
    throw err
  }
}
