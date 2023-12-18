import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native"
import { userRequest } from "../api/requestMethod"
import { apiRequestJoinGroup } from "../api/apiRequestJoinGroup"
import Toast from "react-native-toast-message"
import { useDispatch, useSelector } from "react-redux"
import { apiDeleteRequest } from "../api/apiDeleteRequest"
import { addRequestByUser, deleteRequestByUser } from "../redux/group"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const BtnJoinGroup = ({ dataSend }) => {
  const [join, setJoin] = useState(false)

  const user = useSelector((state) => state.user?.currentUser)

  const [request, setRequest] = useState(false)


  // const request = useSelector((state) =>
  //   state?.group?.requestJoinGroup?.find(
  //     (item) => item.organizationId === dataSend?.organizationId,
  //   ),
  // )
  //  const request = useSelector((state) =>
  //    state.group.requestJoinGroup
  //  )
  const dispatch = useDispatch()

  useEffect(() => {
    const checkJoin = async () => {
      try {
        const res = await userRequest.post(
          "organization/checkUserJoinOrganization",
          dataSend,
        )

        setJoin(res.data.check)
      } catch (error) {
        console.log(error)
      }
    }
    checkJoin()
    // if (typeof isRequest !== "undefined") {
    //     setRequest(isRequest)
    //     console.log(request)
    //     console.log("haha", isRequest)
    //   } else {
    //     setRequest(false)
    //   }
  })

  useEffect(() => {
    setRequest(dataSend.request)
  }, [dataSend.request])

  const handleJoin = async () => {
    try {
      const res = await apiRequestJoinGroup({
        organizationId: dataSend?.organizationId,
      })
      console.log(res.data)
      dispatch(addRequestByUser(res.data.data))
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Gửi yêu cầu thành công",
        })
      }
      setRequest(true)
    } catch (error) {
      if (error?.response.data && error?.response.data.code === 5) {
        Toast.show({
          type: "error",
          text1: "Bạn đã gửi yêu cầu rồi",
          text2: "Vui lòng chờ đợi ",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Có lỗi xảy ra",
          text2: "Vui lòng thử lại",
        })
      }
    }
  }
  const handleDelete = async () => {
    try {
      const res = await apiDeleteRequest({
        requestId: dataSend?.requestId,
      })
      dispatch(deleteRequestByUser(dataSend.requestId))
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Xóa yêu cầu thành công",
        })
      }
      setRequest(false)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra",
        text2: "Vui lòng thử lại",
      })
    }
  }

  return (
    <>
      {!join ? (
        request ? (
          <TouchableOpacity style={styles.container1} onPress={handleDelete}>
            <Text style={styles.text1}>Hủy yêu cầu</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.container} onPress={handleJoin}>
            <Text style={styles.text}>Tham gia</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity style={styles.container1}>
          <Text style={styles.text1}>Đã tham gia</Text>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7F0FB",
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  container1: {
    backgroundColor: "#E8E9EB",
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  text: {
    color: "#327fd2",
    fontSize: 18,
    fontWeight: "bold",
  },
  text1: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default BtnJoinGroup
