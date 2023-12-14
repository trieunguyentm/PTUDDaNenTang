import React from 'react'
import { userRequest } from './requestMethod'

export const apiBrowserRequest = async (dataSend) => {
    console.log(dataSend)
    try {
        const res = await userRequest.post(
          "organization/handleRequestJoinOrganization",dataSend
        )
        return res
    } catch (error) {
        console.log(error.response)
        throw error
    }

}
