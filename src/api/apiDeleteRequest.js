import React from "react"
import { userRequest } from "./requestMethod"

export const apiDeleteRequest = async (datasend) => {
//   console.log(datasend)
  try {
    const res = await userRequest.post(
      "organization/cancelRequestJoinOrganization",
      datasend,
    )
    return res
  } catch (error) {
    console.log(error.response.data)
    throw error
  }
}
