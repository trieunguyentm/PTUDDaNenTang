import React from 'react'
import { userRequest } from './requestMethod'

export const apiCreatePostGroup = async (formData) => {

    try {
        const res = await userRequest.post(
          "organization/createPostInOrganization",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // "Authorization" : "Bearer " + token,
            },
          },
        )
        return res
    } catch (error) {
        console.log(error)
        throw error
    }
}
