import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { Feather } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { useDispatch } from "react-redux"
import { logoutUser } from "../redux/user"
import FormData from "form-data"
import { uploadImage } from "../api/apiUploadImage"
import { useSelector } from "react-redux"
import Toast from "react-native-toast-message"
import { addRequest, reset } from "../redux/group"

// Lấy kích thước màn hình
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function Profile({ navigation }) {
  const user = useSelector((state) => state.user?.currentUser)

  console.log(user)

  const dispatch = useDispatch()
  const [loadingSignIn, setLoadingSignIn] = React.useState(false)
  // Stores the selected image URI
  const [file, setFile] = useState(null)

  // Stores any error message
  const [error, setError] = useState(null)

  // Function to pick an image from
  //the device's media library
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
        console.log(result.assets[0].uri)
        setFile(result.assets[0].uri)

        // Clear any previous errors
        setError(null)
      }
    }
  }

  const handleUploadFile = async () => {
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
      const response = await uploadImage(dispatch, formData, user.token)
      // console.log(respone.data)

      setLoadingSignIn(false)
      if (response?.data && response?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa ảnh đại diện thành công",
        })
      }
      setFile(null)
    } catch (error) {
      if (error.response?.data && error.response?.data.code === 4) {
        Toast.show({
          type: "error",
          text1: "Lỗi khi tải ảnh lên ",
          text2: "Vui lòng thử lại ",
        })
      }
      if (error.response?.data && error.response.data?.code === 6) {
        Toast.show({
          type: "error",
          text1: "Xảy ra lỗi khi cập nhật avatar người dùng",
          text2: "Vui lòng thử lại ",
        })
      }
      console.error("Error uploading file:", error)
      setLoadingSignIn(false)
    }
  }
  useEffect(() => {
    const getPoint = async () => {
      try {
        const res = await userRequest.get(
          `user/getTotalPoint/${route.params.name}`,
        )
        setPoint(res.data.point)
      } catch (error) {
        console.log(error)
      }
    }
    getPoint()
  }, [])

  const handleLogOut = () => {
    // Hàm để xóa toàn bộ dữ liệu từ AsyncStorage
    // const clearAsyncStorage = async () => {
    //   try {
    //     await AsyncStorage.clear()
    //     console.log("Async Storage đã được xóa thành công.")
    //   } catch (error) {
    //     console.error("Lỗi khi xóa dữ liệu từ Async Storage:", error.message)
    //   }
    // }

    // // Gọi hàm để xóa dữ liệu
    // clearAsyncStorage()
    dispatch(reset())
    dispatch(logoutUser())
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>Profiles</Text>
        <View style={styles.imageContainer}>
          {file ? (
            <Image
              style={styles.image}
              accessibilityLabel="User Image"
              source={{
                uri: file,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.image}
              accessibilityLabel="User Image"
              source={{
                uri: user.urlAvatar
                  ? `${user.urlAvatar}`
                  : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.pngz",
              }}
              // resizeMode="contain"
            />
          )}
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Feather name="camera" size={24} color="#CA4D64" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.textName}>
            {user.displayName ? user.displayName : user.username}
          </Text>
          <Text style={styles.textEmail}>{user.gmail}</Text>
          <TouchableOpacity
            style={styles.infomationContainer}
            onPress={() => navigation.navigate("ProfileDetail")}
          >
            <View style={styles.information}>
              <FontAwesome5 name="user" size={32} color="gray" />
              <Text style={styles.textUser}>My Proflie</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={32} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infomationContainer}>
            <View style={styles.information}>
              <FontAwesome5 name="donate" size={32} color="gray" />
              <Text style={styles.textUser}>Donation</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={32} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infomationContainer}>
            <View style={styles.information}>
              <AntDesign name="folder1" size={32} color="gray" />
              <Text style={styles.textUser}>My Charity Project</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={32} color="gray" />
          </TouchableOpacity>
          {file && (
            <TouchableOpacity
              style={styles.changeImage}
              onPress={handleUploadFile}
            >
              {!loadingSignIn ? (
                <Text style={styles.textLogout}>Save Change</Text>
              ) : (
                <ActivityIndicator size={"large"} color={"black"} />
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logout} onPress={handleLogOut}>
            <Text style={styles.textLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
  },
  text: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginTop: 30,
    zIndex: 9,
  },
  imageContainer: {
    backgroundColor: "#F89E90",
    marginTop: 20,
    width: "45%",
    height: "23.5%",
    borderRadius: 50,
    alignItems: "center",
    padding: 5,
    zIndex: 9,
  },
  image: {
    padding: 0,
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginTop: -10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  bottom: {
    height: "80%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    top: "25%",
    zIndex: 0, // Đặt độ ưu tiên thấp
    alignItems: "center",
  },
  textName: {
    marginTop: "25%",
    fontSize: 32,
    color: "#39395D",

    fontWeight: "bold",
  },
  textEmail: {
    fontSize: 22,
    color: "gray",

    fontWeight: "bold",
    marginBottom: 20,
  },
  infomationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "88%",
    marginHorizontal: 16,
    alignItems: "center",
  },
  information: {
    flexDirection: "row",
    alignItems: "center",
  },
  textUser: {
    marginLeft: 30,
    fontSize: 22,
    color: "gray",

    fontWeight: "bold",
  },
  changeImage: {
    width: "90%",
    backgroundColor: "#3bb077",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 50,
    marginBottom: "5%",
    marginTop: "5%",
  },
  logout: {
    width: "90%",
    backgroundColor: "#FF4545",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 50,
  },
  textLogout: {
    fontSize: 22,
    color: "white",

    fontWeight: "bold",
  },
})
