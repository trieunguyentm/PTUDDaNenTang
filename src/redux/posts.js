import { createSlice } from "@reduxjs/toolkit";


export const postsSlice = createSlice({
    name:'Posts',
    initialState : {
        requests:[],
        events:[],
        postsLoading:false,
        error:false

    },
    reducers: {
        getAllRequest : (state,action) => {
            state.requests= action.payload
        },
        getAllEvents : (state,action) => {
            state.events = action.payload
        },
        postFetching : (state,action) => {
            state.postsLoading= true
        },
        fetchFailed : (state,action) => {
            state.error= true
        }
    },
})

export const {getAllRequest, getAllEvents,postFetching,fetchFailed} = postsSlice.actions
export default postsSlice.reducer