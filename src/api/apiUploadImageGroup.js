import axios from "axios"

import { userRequest } from "./requestMethod"

export const uploadImageGroup = async (formData, groupId) => {


  try {
    const res = await userRequest.post(
      `organization/uploadAvatar/${groupId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" : "Bearer " + token,
        },
      },
    )
    return res
  } catch (err) {
    throw err
  }
}
