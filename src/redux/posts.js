import { createSlice } from "@reduxjs/toolkit";


export const postsSlice = createSlice({
    name:'Posts',
    initialState : {
        ownPost : [],
        requests:[],
        events:[],
        liked :[],
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
        postFetched : (state,action) => {
            state.postsLoading=false
        },
        fetchFailed : (state,action) => {
            state.error= true
        }
    },
})

export const {getAllRequest, getAllEvents,postFetching,fetchFailed, postFetched} = postsSlice.actions
export default postsSlice.reducer