import axios from "axios"

export const APISignIn = async (username, password) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_SIGNIN

  const dataSend = {
    username: username,
    password: password,
  }

  try {
    const response = await axios.post(apiUrl, dataSend)
    return response
  } catch (error) {
    throw error
  }
}
