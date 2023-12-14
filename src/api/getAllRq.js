import { useState } from "react";
import { userRequest } from "./requestMethod";

export const getAllRq = async ()=>{
    const [data,setData] = useState([])
    try {
        const res = await userRequest.get('helpRequest/getAllHelpRequest')
        if(res.status===200) {
            setData(res.data.data)
            return data
        } else {
            console.log("Error")
        }
    } catch (error) {
        return console.log(error)
    }
}