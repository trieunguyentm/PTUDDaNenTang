import React from "react"
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Toast from "react-native-toast-message"
import { apiBrowserRequest } from "../api/apiBrowserRequest"
import { deleteRequest } from "../redux/group"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const Browserss = ({ navigation }) => {
  const request = useSelector((state) => state.group.requestJoinGroup)

  const dispatch = useDispatch()

  const handleAccept = async (id) => {
    const dataSend = {
      requestJoinOrganizationId: id,
      option: 2,
    }
    try {
      const res = await apiBrowserRequest(dataSend)
      dispatch(deleteRequest(id))
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Thêm người dùng thành công",
        })
      }
    } catch (error) {
      if (error.response.data) {
        Toast.show({
          type: "error",
          text1: "Lỗi khi sever mong các bạn thông cảm",
          text2: "Vui lòng thử lại ",
        })
      }
    }
  }
  const handleDecline = async (id) => {
    const dataSend = {
      requestJoinOrganizationId: id,
      option: 1,
    }
    try {
      const res = await apiBrowserRequest(dataSend)
      dispatch(deleteRequest(id))

      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Hủy yêu cầu thành công",
        })
      }
    } catch (error) {
      if (error.response.data) {
        Toast.show({
          type: "error",
          text1: "Lỗi khi sever mong các bạn thông cảm",
          text2: "Vui lòng thử lại ",
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          {request?.map((item, index) => (
            <View style={styles.dataContainer} key={index}>
              <Text
                style={styles.text2}
                onPress={() =>
                  navigation.navigate("UserDetail", { name: item.username })
                }
              >
                {item.username}
              </Text>
              <TouchableOpacity
                style={styles.btnAccept}
                onPress={() => handleAccept(item.id)}
              >
                <Text style={styles.text1}>Phê duyệt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDecline}
                onPress={() => handleDecline(item.id)}
              >
                <Text style={styles.text}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 0.03 * screenWidth,
    marginLeft: 0.05 * screenWidth,
    marginRight: 0.05 * screenWidth,
    marginTop: 0.05 * screenWidth,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  btnAccept: {
    backgroundColor: "#eef4fb",
    borderRadius: 5,
    height: 0.065 * screenHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 0.3 * screenWidth,
    marginRight: 5,
  },
  btnDecline: {
    backgroundColor: "#E8E9EB",
    borderRadius: 5,
    height: 0.065 * screenHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 0.3 * screenWidth,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#327fd2",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
  },
})

export default Browserss
