import React from "react"
import { userRequest } from "./requestMethod"

export const apiDeleteUserFromGroup = async (groupId,username) => {
    console.log(username)
    const data = {
        member : username
    }
  try {
    const res = await userRequest.delete(
      `/organization/deleteMember/${groupId}`, { data }
    )
    return res
  } catch (error) {
    console.log(error.response.data)
    throw error
  }
}
