import { createSlice } from "@reduxjs/toolkit"

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isLoading = true
    },
    registerSuccess: (state, acction) => {
      state.currentUser = acction.payload
      state.isLoading = false
    },
    registerFailure: (state, acction) => {
      state.isLoading = false
      state.error = true
    },
    checkOtpStart: (state) => {
      state.isLoading = true
    },
    checkOtpStartSuccess: (state, acction) => {
      state.currentUser = null
      state.isLoading = false
    },
    checkOtpStartFailure: (state) => {
      state.isLoading = false
      state.error = true
    },
  },
})

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  checkOtpStart,
  checkOtpStartSuccess,
  checkOtpStartFailure,
} = userRegisterSlice.actions

export default userRegisterSlice.reducer
