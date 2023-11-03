import axios from "axios"

export const APIRegister = async (username, gmail, password, gender, phone) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_REGISTER

  const dataSend = {
    username: username,
    gmail: gmail,
    password: password,
    gender: gender,
    phone: phone,
  }

  try {
    const response = await axios.post(apiUrl, dataSend)
    return response
  } catch (error) {
    throw error
  }
}
