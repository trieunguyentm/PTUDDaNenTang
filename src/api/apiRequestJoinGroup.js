import React from 'react'
import { userRequest } from './requestMethod'

export const apiRequestJoinGroup = async (datasend) => {
    console.log(datasend)
    try {
       const res = await userRequest.post(
         "organization/requestJoinOrganization",
         datasend
       )
       return res
    } catch (error) {
        console.log(error.response.data)
        throw error
    }
}
