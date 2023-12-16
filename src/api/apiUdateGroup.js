import React from "react"
import { userRequest } from "./requestMethod"

export const updateGroup = async (dataSend) => {

    try {
      const res = await userRequest.put(
        `organization/updateOrganization/${dataSend.groupId}`,
        dataSend,
      )
      return res
    } catch (error) {
      console.log(error.response)
      throw error
    }
}
