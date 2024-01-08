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
import { getFile, getRequestJoinGroup } from "../redux/group";
import { Ionicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons" 
import { AntDesign } from "@expo/vector-icons"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const ManagePageForUser = ({ route, navigation }) => {

  const { groupId } = route.params

  const [data,setData] = useState()

  const dispatch = useDispatch()

  const [file, setFile] = useState()


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
    const [member, setMember] = useState()

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

        useEffect(() => {
          const getFiles = async () => {
            try {
              const res = await userRequest.get(
                `organization/getReportByOrganization/${groupId}`,
              )
              setFile(res.data.data)
              console.log(res.data.data)
              dispatch(getFile(res.data.data))
            } catch (error) {
              console.log(error)
            }
          }
          getFiles()
        }, [])


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.browsContainer}>
            <Text style={styles.textTitle}>Các thông tin</Text>
            <View style={styles.detailContainer}>
              <TouchableOpacity
                style={styles.containerDetail}
                onPress={() =>
                  navigation.navigate("Event", { groupId: groupId })
                }
              >
                <MaterialIcons name="event-available" size={38} color="black" />
                <View style={styles.infomationContainer}>
                  <View>
                    <Text style={styles.titleInfo}>Sự kiện nhóm tham gia</Text>
                    <Text style={styles.numInfo}>
                      {member?.length} sự kiện nhóm tham gia
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.num}>{member?.length}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
              <TouchableOpacity
                style={styles.containerDetail}
                onPress={() =>
                  navigation.navigate("File", { groupId: groupId })
                }
              >
                <AntDesign name="file1" size={38} color="black" />
                <View style={styles.infomationContainer}>
                  <View>
                    <Text style={styles.titleInfo}>File báo cáo, kết quả</Text>
                    <Text style={styles.numInfo}>{file?.length} file</Text>
                  </View>
                  <View>
                    <Text style={styles.num}>{file?.length}</Text>
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
                  navigation.navigate("ManageUserForUser", { groupId: groupId })
                }
              >
                <FontAwesome name="users" size={38} color="black" />
                <View style={styles.infomationContainer}>
                  <View>
                    <Text style={styles.titleInfo}>Người đã tham gia nhóm</Text>
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
    marginTop : 10,
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

export default ManagePageForUser
