import React from 'react'
import { userRequest } from './requestMethod'

export const createGroup =  async (dataSend) => {
    console.log("chạy đến đây")
    try {
        const res = await userRequest.post('organization/create',dataSend)
        console.log("thành công")
        return res
    } catch (error) {
        console.log(error.response)
        throw error
    }

}
