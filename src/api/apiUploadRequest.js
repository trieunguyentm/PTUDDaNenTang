import { userRequest } from "./requestMethod";
import { uploadFailure,uploadStart,uploadSuccess } from "../redux/user";

export const uploadRequest = async(dispatch, formData,token) => {
    console.log(formData)
    dispatch(uploadStart())
    
    
   try {
    const res = await userRequest.post('helpRequest/create',formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" : "Bearer " + token,
          },
    })
    return res

   } catch (error) { 
    console.log(error)
    dispatch(uploadFailure())
    throw error
   }
}