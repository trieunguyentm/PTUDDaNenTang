import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Toast from "react-native-toast-message"
import { apiBrowserRequest } from "../api/apiBrowserRequest"
import { deleteRequest } from "../redux/group"
import { userRequest } from "../api/requestMethod"
import { apiDeleteUserFromGroup } from "../api/apiDeleteUserFromGroup"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const ManageUser = ({ route, navigation }) => {
  const request = useSelector((state) => state.group.requestJoinGroup)

  const [member, setMember] = useState()

  const [dataPoint, setDataPoint] = useState({})

  const [isPoint, setIsPoint] = useState([])

  const [point, setPoint] = useState()

  const groupId = route.params.groupId

  useEffect(() => {
    const getMember = async () => {
      try {
        const res = await userRequest.get(
          `organization/getUserInOrganization/${groupId}`,
        )
        setMember(res.data.data)
        setDataPoint(res.data.dataPoint)
      } catch (error) {
        console.log(error)
      }
    }
    getMember()
  }, [])

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    const getMember = async () => {
      try {
        const res = await userRequest(
          `organization/getUserInOrganization/${groupId}`,
        )
        setMember(res.data.data)
        setDataPoint(res.data.dataPoint)
        setRefreshing(false)
      } catch (error) {
        setRefreshing(false)

        console.log(error)
      }
    }
    getMember()
  }, [])

  const handleDecline = async (item) => {
    try {
      const res = await apiDeleteUserFromGroup(groupId, item)
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Xóa người dùng thành công",
        })
      }
      onRefresh()
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
  const handleUpPoint = async (item, index) => {
    if (point > 10 || point < -10) {
      Toast.show({
        type: "error",
        text1: "Nhập sai điểm điểm từ -10 đến 10",
        text2: "Vui lòng thử lại ",
      })
      return
    }
    const dataSend = {
      username: item,
      organizationId: groupId,
      point: parseInt(point),
    }
    console.log(dataSend)
    try {
      const res = await userRequest.post("organization/updatePoint", dataSend)

      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Chấm điểm người dùng thành công",
        })
      }
      onRefresh()

      setIsPoint((item) => {
        return {
          ...item,
          [index]: false,
        }
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Lỗi khi sever mong các bạn thông cảm",
        text2: "Vui lòng thử lại ",
      })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {refreshing && <ActivityIndicator size={"large"} color={"black"} />}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          {member?.map((item, index) => (
            <View key={index}>
              <View style={styles.dataContainer1}>
                <Text style={styles.text2}>{item}</Text>
                <TouchableOpacity
                  style={styles.btnAccept}
                  onPress={() =>
                    navigation.navigate("UserDetail", { name: item })
                  }
                >
                  <Text style={styles.text1}>Chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDecline}
                  onPress={() => handleDecline(item)}
                >
                  <Text style={styles.text}>Xóa người dùng</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dataContainer}>
                <View style={styles.textCon}>
                  <Text style={styles.text22}>Điểm: </Text>
                  <Text
                    style={dataPoint?.item > 0 ? styles.text3 : styles.text4}
                  >
                    {dataPoint[item]}
                  </Text>
                </View>
                {!isPoint[index] ? (
                  <TouchableOpacity
                    style={styles.btnPoint}
                    onPress={() =>
                      setIsPoint((item) => {
                        return {
                          ...item,
                          [index]: true,
                        }
                      })
                    }
                  >
                    <Text style={styles.text1}>Chấm điểm</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.btnCon}>
                    <TouchableOpacity
                      style={styles.btnPoint}
                      onPress={() => handleUpPoint(item, index)}
                    >
                      <Text style={styles.text1}>Gửi điểm</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.btnInPoint}
                      placeholder="Nhập điểm"
                      onChangeText={setPoint}
                      keyboardType="numeric"
                      type="number"
                    />
                  </View>
                )}
              </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 0.03 * screenWidth,
    marginLeft: 0.05 * screenWidth,
    marginRight: 0.05 * screenWidth,
    marginTop: 0.05 * screenWidth,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  dataContainer1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 0.05 * screenWidth,
    marginRight: 0.05 * screenWidth,
    marginTop: 0.05 * screenWidth,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#327fd2",
  },
  textCon: {
    display: "flex",
    flexDirection: "row",
    width: 0.28 * screenWidth,
  },
  btnCon: {
    display: "flex",
    flexDirection: "row",
    width: 0.8 * screenWidth,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
  },
  text22: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#327fd2",
    marginRight: 10,
  },
  text4: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginRight: 10,
  },
  btnPoint: {
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
  btnInPoint: {
    backgroundColor: "#eef4fb",
    borderRadius: 5,
    height: 0.065 * screenHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 0.3 * screenWidth,
    marginRight: 5,
    padding: 10,
    fontSize: 16,
  },
})

export default ManageUser
