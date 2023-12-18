import React from 'react'
import { userRequest } from './requestMethod'

export const apiLeaveGroup = async (dataSend) => {
    console.log("chạy đến đây")
    try {
        const res = await userRequest.post(`organization/leaveOrganization/${dataSend}`)
        return res
    } catch (error) {
        console.log(error)
        throw error
    }
}

