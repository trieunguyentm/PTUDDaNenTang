import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload
      state.isLoading = false
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = true
    },
    logoutUser: (state) => {
      state.isFectching = false
      state.currentUser = null
      state.error = false
    },
    uploadStart: (state) => {
      state.isLoading = true
    },
    uploadSuccess: (state, action) => {
      state.currentUser = {
        ...action.payload,
        token: state.currentUser.token,
      }
      state.isLoading = false
    },
    uploadFailure: (state) => {
      state.isLoading = false
      state.error = true
    },
    uploadProfileStart: (state) => {
      state.isLoading = true
    },
    uploadProfileSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        displayName: action.payload.displayName,
        phone: action.payload.phone,
        gender: action.payload.gender,
        personalDesc: action.payload.personalDesc,
        abilitySupport: action.payload.abilitySupport,
        address: action.payload.address,
      }
      state.isLoading = false
    },
    uploadProfileFailure: (state) => {
      state.isLoading = false
      state.error = true
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  uploadFailure,
  uploadStart,
  uploadSuccess,
  uploadProfileStart,
  uploadProfileSuccess,
  uploadProfileFailure,
} = userSlice.actions

export default userSlice.reducer
