import { createSlice } from "@reduxjs/toolkit"

const groupSlide = createSlice({
  name: "groups",
  initialState: {
    groupAll: [],
    GroupsHasJoin: [],
    groupManage: [],
    file : [],
    requestJoinGroup: null,
    requestJoinGroupByUser: null,
    postGroup: null,
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
    getRequestJoinGroupByUser: (state, action) => {
      state.requestJoinGroupByUser = action.payload
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
    addGroup: (state, action) => {
      state.groupAll.push(action.payload)
      state.GroupsHasJoin.push(action.payload)
      state.groupManage.push(action.payload)
    },
    addRequestByUser: (state, action) => {
      state.requestJoinGroupByUser.push(action.payload)
    },
    deleteRequestByUser: (state, action) => {
      state.requestJoinGroupByUser.splice(
        state.requestJoinGroupByUser.findIndex(
          (item) => item.id == action.payload,
        ),
        1,
      )
    },
    deleteGroup: (state, action) => {
      state.groupAll.splice(
        state.groupAll.findIndex((item) => item.id == action.payload),
        1,
      )
      state.GroupsHasJoin.splice(
        state.GroupsHasJoin.findIndex((item) => item.id == action.payload),
        1,
      )
      state.groupManage.splice(
        state.groupManage.findIndex((item) => item.id == action.payload),
        1,
      )
    },
    updateGroupss: (state, action) => {
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
    addRequest: (state, action) => {
      state.requestJoinGroup.push(action.payload)
    },
    deleteRequest: (state, action) => {
      state.requestJoinGroup.splice(
        state.requestJoinGroup.findIndex((item) => item.id == action.payload),
        1,
      )
    },
    getFile : (state,action) => {
      state.file = action.payload
    },
    addFile : (state,action)=>{
      state.file.push(action.payload)
    },
    reset: (state) => {
      ;(state.groupAll = []),
        (state.GroupsHasJoin = []),
        (state.groupManage = []),
        (state.requestJoinGroup = null),
        (state.isLoading = false),
        (state.error = false)
    },
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
  updateGroupss,
  getRequestJoinGroupByUser,
  addRequestByUser,
  deleteRequestByUser,
  deleteGroup,
  addFile,
  getFile,
} = groupSlide.actions

export default groupSlide.reducer
