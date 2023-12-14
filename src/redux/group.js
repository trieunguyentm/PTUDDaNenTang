import { createSlice } from "@reduxjs/toolkit"

const groupSlide = createSlice({
  name: "groups",
  initialState: {
    groupAll: [],
    GroupsHasJoin: [],
    groupManage: [],
    requestJoinGroup: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    getGroupHasJoin: (state, action) => {
      state.GroupsHasJoin = action.payload
    },
    getManage: (state, action) => {
      state.groupManage = action.payload
    },
    getAllGroups: (state, action) => {
      state.groupAll = action.payload
    },
    getRequestJoinGroup: (state, action) => {
      state.requestJoinGroup = action.payload
    },
    updateImgGroupHasJoin: (state, action) => {
      state.GroupsHasJoin[
        state.GroupsHasJoin.findIndex((item) => item.id == action.payload.id)
      ] = action.payload
      state.groupManage[
        state.groupManage.findIndex((item) => item.id == action.payload.id)
      ] = action.payload
      state.groupAll[
        state.groupAll.findIndex((item) => item.id == action.payload.id)
      ] = action.payload
    },
    updateImg: (state, action) => {
      state.groupAll[
        state.groupAll.findIndex((item) => item.id == action.payload.id)
      ] = action.payload
    },
    addGroup : (state, action) => {
      state.groupAll.push(action.payload)
      state.GroupsHasJoin.push(action.payload)
      state.groupManage.push(action.payload)
    },
    addRequest: (state, action) => {
      state.requestJoinGroup.push(action.payload)
    },
    deleteRequest: (state, action) => {
      state.requestJoinGroup.splice(
        state.requestJoinGroup.findIndex((item) => item.id == action.payload),
        1,
      )
    },

    reset: () => initialState,
  },
})

export const {
  getGroupHasJoin,
  updateImgGroupHasJoin,
  getManage,
  reset,
  updateImg,
  getAllGroups,
  getRequestJoinGroup,
  deleteRequest,
  addRequest,
  addGroup,
} = groupSlide.actions

export default groupSlide.reducer
