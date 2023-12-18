import React from "react"
import { userRequest } from "./requestMethod"

export const apiDeleteGroup = async (dataSend) => {
  console.log("chạy đến đây")
  try {
    const res = await userRequest.delete(
      `organization/deleteOrganization/${dataSend}`,
    )
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}
