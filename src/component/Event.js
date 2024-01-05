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
  Image,
  ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Toast from "react-native-toast-message"
import { apiBrowserRequest } from "../api/apiBrowserRequest"
import { deleteRequest } from "../redux/group"
import { userRequest } from "../api/requestMethod"
import { apiDeleteUserFromGroup } from "../api/apiDeleteUserFromGroup"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const Event = ({ route, navigation }) => {

  const [member, setMember] = useState()

  const groupId = route.params.groupId

  useEffect(() => {
    const getMember = async () => {
      try {
        const res = await userRequest.get(
          `helpRequest/getHelpRequestReceivedByOrganization/${groupId}`,
        )
        setMember(res.data.listHelpRequest)
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
          `helpRequest/getHelpRequestReceivedByOrganization/${groupId}`,
        )
        setMember(res.data.listHelpRequest)
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {refreshing && <ActivityIndicator size={"large"} color={"black"} />}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.contentContainer}>
          {member?.length != 0 ? member?.map((item, index) => (
            <View style={styles.dataContainer} key={index}>
              <Image
                source={{ uri: `${item?.images[0]}` }}
                style={styles.img}
              />
              <View style={styles.textCon}>
                <Text style={styles.text1}>{item?.title}</Text>
                <Text style={styles.text2}>{item?.createdBy}</Text>
              </View>
            </View>
          )) : <Text style={{textAlign:"center",fontSize:22, fontWeight:"bold", marginTop: 10,}}>Không có sự kiện nào</Text>}
        </ScrollView>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#327fd2",
    marginBottom : 10,
  },
  text2: {
    fontSize: 22,
    fontWeight: "bold",
    width: "50%",
  },
  img: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: 5,
  },
  textCon: {
    marginLeft: 10,
  },
})

export default Event
