import React, { useState,useEffect } from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import backgroundForNone from "../../assets/groups-default-cover-photo-2x.png"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message"
import { userRequest } from "../api/requestMethod"
import { useDispatch, useSelector } from "react-redux"
import { updateImgGroupHasJoin } from "../redux/group"
import { uploadImageGroup } from "../api/apiUploadImageGroup"
import { apiRequestJoinGroup } from "../api/apiRequestJoinGroup"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const GroupViewPage = ({ route, navigation }) => {
  const { groupId } = route.params
  const [isAdmin,setIsAdmin] = useState(false)

  const group = useSelector((state) =>
    state?.group?.groupAll?.find((item) => item.id == groupId),
  )
  const user = useSelector((state) => state.user?.currentUser)

  const request = useSelector((state) =>
    state?.group?.requestJoinGroup?.find(
      (item) => item?.organizationId === groupId,
    ),
  )

  const [isRequest, setIsRequest] = useState(false)


  const [member, setMember] = useState()


   useEffect(() => {
     // Move the logic to set isAdmin into useEffect
     if (user?.username === group?.creator) {
       setIsAdmin(true)
     }
     if (request && request?.username === user?.username) {
           setIsRequest(true)
      }
   }, [user?.username, group?.creator])



  useEffect(() => {
    const getMember = async () => {
      try {
        const res = await userRequest.get(
          `organization/getUserInOrganization/${groupId}`,
        )
        setMember(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMember()
  }, [groupId])

  const [img,setImg] = useState()

  const dispatch = useDispatch()

  const [loadingSignIn, setLoadingSignIn] = React.useState(false)

  // Stores the selected image URI
  const [file, setFile] = useState(null)

  // Stores any error message
  const [error, setError] = useState(null)

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
                 roll permission to upload images.`,
      )
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync()

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setFile(result.assets[0].uri)

        // Clear any previous errors
        setError(null)
      }
    }
  }

  const handleUploadFile = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const uriParts = file.split(".")
    const fileType = uriParts[uriParts.length - 1]
    const uriName = file.split("/")
    const fileName = uriName[uriName.length - 1]

    formData.append("file", {
      uri: file,
      name: `file.${fileName}`,
      type: `image/${fileType}`,
    })
    setLoadingSignIn(true)
    try {
      const response = await uploadImageGroup(formData, groupId)
      setImg(response.data.orgData)
      dispatch(updateImgGroupHasJoin(response.data.orgData))
      setLoadingSignIn(false)
      setFile(null)
      if (response?.data && response?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa ảnh đại diện thành công",
        })
      }
    } catch (error) {
      setLoadingSignIn(false)
      console.log(error)
      if (error.response?.data) {
        Toast.show({
          type: "error",
          text1: "Lỗi khi tải ảnh lên ",
          text2: "Vui lòng thử lại ",
        })
      }
    }
  }

  
   const [join, setJoin] = useState(false)

   const dataSend = {
     username: user.username,
     organizationId: groupId,
   }

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
    }, [])

      const handleJoin = async () => {
        try {
          const res = await apiRequestJoinGroup({
            organizationId: groupId,
          })
          console.log("success")
          if (res?.data && res?.data.code === 0) {
            Toast.show({
              type: "success",
              text1: "Gửi yêu cầu thành công",
            })
          }
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


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.headerLeft}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back-ios" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() =>
                navigation.navigate("ManagePage", { groupId: groupId })
              }
            >
              {isAdmin ? (
                <MaterialIcons name="local-police" size={32} color="black" />
              ) : null}
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <Image
              style={styles.imgBackGround}
              source={
                group?.urlAvatar
                  ? file
                    ? { uri: file }
                    : {
                        uri: `${group?.urlAvatar}`,
                      }
                  : file
                  ? { uri: file }
                  : backgroundForNone
              }
            />
            {isAdmin ? (
              file ? (
                !loadingSignIn ? (
                  <TouchableOpacity
                    style={styles.btnChangeBg2}
                    onPress={handleUploadFile}
                  >
                    <Ionicons
                      name="pencil"
                      size={20}
                      color="white"
                      style={styles.iconBg}
                    />
                    <Text style={styles.text2}>Upload</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.btnChangeBg2}>
                    <ActivityIndicator size={"large"} color={"black"} />
                    <Text style={styles.text2}>Upload</Text>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity
                  style={styles.btnChangeBg}
                  onPress={pickImage}
                >
                  <Ionicons
                    name="pencil"
                    size={20}
                    color="white"
                    style={styles.iconBg}
                  />
                  <Text style={styles.text1}>Chỉnh sửa</Text>
                </TouchableOpacity>
              )
            ) : null}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{group?.name}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
          </View>
          <View style={styles.detailContainer}>
            <FontAwesome name="lock" size={24} color="gray" />
            <Text style={styles.text3}>Nhóm Riêng Tư :</Text>
            {member ? (
              <>
                <Text style={styles.text4}>{member?.length}</Text>
                <Text style={styles.text5}>thành viên</Text>
              </>
            ) : (
              <Text style={styles.text5}>Hãy tham gia vào nhóm</Text>
            )}
          </View>
          {join ? (
            isAdmin ? (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btnAdmin}
                  onPress={() =>
                    navigation.navigate("ManagePage", { groupId: groupId })
                  }
                >
                  <MaterialIcons name="local-police" size={22} color="white" />
                  <Text style={styles.text6}>Quản lý</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnDelete}>
                  <FontAwesome5 name="door-open" size={24} color="white" />
                  <Text style={styles.text7}>Xóa Nhóm</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnUser}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.text8}>Đã tham gia nhóm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLeave}>
                  <FontAwesome5 name="door-open" size={22} color="white" />
                  <Text style={styles.text9}>Rời Khỏi Nhóm</Text>
                </TouchableOpacity>
              </View>
            )
          ) : isRequest ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnJoin} onPress={handleJoin}>
                <Text style={styles.text10}>Hủy yêu cầu đã gửi</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnJoin} onPress={handleJoin}>
                <Text style={styles.text10}>Tham gia</Text>
              </TouchableOpacity>
            </View>
          )}
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
  headerContainer: {
    marginLeft: 0.03 * screenWidth,
    marginRight: 0.03 * screenWidth,
    display: "flex",
    flexDirection: "row",
    marginTop: 0.02 * screenHeight,
    justifyContent: "space-between",
  },
  imgContainer: {
    position: "relative",
  },
  imgBackGround: {
    height: 0.3 * screenHeight,
    width: "100%",
    objectFit: "cover",
    marginTop: 10,
  },
  btnChangeBg: {
    height: 0.055 * screenHeight,
    width: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    bottom: 0,
    right: 0.03 * screenWidth,
    marginBottom: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBg: {
    opacity: 1,
  },
  text1: {
    color: "white",
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "bold",
  },
  btnChangeBg2: {
    height: 0.055 * screenHeight,
    width: "30%",
    backgroundColor: "teal",
    position: "absolute",
    bottom: 0,
    right: 0.03 * screenWidth,
    marginBottom: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    color: "white",
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    marginTop: 5,
    alignItems: "center",
  },
  text3: {
    fontSize: 16,
    color: "gray",
    marginLeft: 5,
  },
  text4: {
    fontSize: 18,
    color: "black",
    marginLeft: 5,
  },
  text5: {
    fontSize: 16,
    color: "gray",
    marginLeft: 5,
  },
  btnContainer: {
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnAdmin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    backgroundColor: "#384CFF",
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  text6: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  btnDelete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    backgroundColor: "red",
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  text7: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  btnLeave: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    backgroundColor: "red",
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  text9: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  btnUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    backgroundColor: "#E8E9EB",
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  text8: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  btnJoin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "teal",
    height: 0.05 * screenHeight,
    borderRadius: 10,
  },
  text10: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
})

export default GroupViewPage
