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
import backgroundForNone from "../../assets/groups-default-cover-photo-2x.png"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message"
import { userRequest } from "../api/requestMethod"
import { useDispatch, useSelector } from "react-redux"
import { updateImgGroupHasJoin } from "../redux/group"
import { uploadImageGroup } from "../api/apiUploadImageGroup"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const PageGroup = ({ route, navigation }) => {
  const { groupId } = route.params
  const [isAdmin,setIsAdmin] = useState(false)

  const group = useSelector((state) =>
    state.group.GroupsHasJoin.find((item) => item.id == groupId),
  )
  const user = useSelector((state) => state.user?.currentUser)

  const [member, setMember] = useState()


   useEffect(() => {
     // Move the logic to set isAdmin into useEffect
     if (user.username === group.creator) {
       setIsAdmin(true)
     }
   }, [user.username, group.creator])



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
      console.log(response.data.orgData)
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
            <TouchableOpacity style={styles.headerRight}>
              <MaterialIcons name="local-police" size={32} color="black" />
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
            <Text style={styles.title}>{group.name}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
          </View>
          <View style={styles.detailContainer}>
            <FontAwesome name="lock" size={24} color="gray" />
            <Text style={styles.text3}>Nhóm Riêng Tư :</Text>
            <Text style={styles.text4}>{member?.length}</Text>
            <Text style={styles.text5}>thành viên</Text>
          </View>
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
})

export default PageGroup
