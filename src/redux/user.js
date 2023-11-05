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
  },
})

export const {loginStart,loginSuccess,loginFailure,logoutUser} = userSlice.actions

export default userSlice.reducer