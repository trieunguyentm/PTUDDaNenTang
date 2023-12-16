import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { userRequest } from "../api/requestMethod"
import { useDispatch, useSelector } from 'react-redux';
import { getRequestJoinGroup } from "../redux/group";
import { Ionicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const ManagePage = ({ route, navigation }) => {

  const { groupId } = route.params

  const [data,setData] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    const getAllRequest = async ()=>{
      try {
        const res = await userRequest.post(
          "organization/getRequestJoinOrganization",
          {
            organizationId : groupId,
          },
        )
        setData(res.data.data)
        dispatch(getRequestJoinGroup(res.data.data))
      } catch (error) {
        console.log(error)
      }
    }
    getAllRequest()
  },[])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.browsContainer}>
            <Text style={styles.textTitle}>Cần xét duyệt</Text>
            <View style={styles.detailContainer}>
              <TouchableOpacity
                style={styles.containerDetail}
                onPress={() => navigation.navigate("Browser")}
              >
                <MaterialCommunityIcons
                  name="account-arrow-right"
                  size={34}
                  color="black"
                />
                <View style={styles.infomationContainer}>
                  <View>
                    <Text style={styles.titleInfo}>Yêu cầu làm thành viên</Text>
                    <Text style={styles.numInfo}>
                      {data?.length} mục mới hôm nay
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.num}>{data?.length}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
              <TouchableOpacity
                style={styles.containerDetail}
                onPress={() => navigation.navigate("Browser")}
              >
                <MaterialIcons name="post-add" size={38} color="black" />
                <View style={styles.infomationContainer}>
                  <View>
                    <Text style={styles.titleInfo}>Bài viết muốn đăng tải</Text>
                    <Text style={styles.numInfo}>
                      {data?.length} mục mới hôm nay
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.num}>{data?.length}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.browsContainer}>
            <Text style={styles.textTitle}>Cài đặt nhóm</Text>
            <View style={styles.detailContainer}>
              <TouchableOpacity
                style={styles.containerDetail}
                onPress={() =>
                  navigation.navigate("UpdateGroup", { groupId: groupId })
                }
              >
                <Ionicons name="ios-settings" size={38} color="black" />
                <View style={styles.infomationContainer}>
                  <View>
                    <Text style={styles.titleInfo}>Cài đặt nhóm</Text>
                    <Text style={styles.numInfo}>Thay đổi thông tin nhóm</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E9EB",
  },
  contentContainer: {
    flex: 1,
  },
  browsContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: "gray",
    marginLeft: 0.03 * screenWidth,
    marginRight: 0.03 * screenWidth,
    paddingBottom: 0.03 * screenWidth,
    marginTop: 10,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detailContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.03 * screenWidth,
    paddingBottom: 0.03 * screenWidth,
    paddingTop: 0.03 * screenWidth,
  },
  containerDetail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 0.03 * screenWidth,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  infomationContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  titleInfo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  numInfo: {
    fontSize: 16,
  },
  num: {
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default ManagePage
