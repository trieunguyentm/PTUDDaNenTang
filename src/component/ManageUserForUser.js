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
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Toast from "react-native-toast-message"
import { apiBrowserRequest } from "../api/apiBrowserRequest"
import { deleteRequest } from "../redux/group"
import { userRequest } from "../api/requestMethod"
import { apiDeleteUserFromGroup } from "../api/apiDeleteUserFromGroup"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const ManageUserForUser = ({ route, navigation }) => {
  const request = useSelector((state) => state.group.requestJoinGroup)

  const [member, setMember] = useState()

  const [dataPoint, setDataPoint] = useState({})

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
        setRefreshing(false)
      } catch (error) {
        setRefreshing(false)

        console.log(error)
      }
    }
    getMember()
  }, [])

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
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.text2}>Điểm</Text>
                <Text style={dataPoint[item] ? styles.text3 : styles.text4}>
                  {dataPoint[item]}
                </Text>
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
    justifyContent: "space-between",
    alignItems: "center",
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

  text2: {
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
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
})

export default ManageUserForUser
