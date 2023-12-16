import React, { useState } from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import { useSelector } from "react-redux"
import { Feather } from "@expo/vector-icons"
import FormData from "form-data"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message"
import { AntDesign } from "@expo/vector-icons"
import { apiCreatePostGroup } from "../api/apiCreatePostGroup"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const CreatePostGroup = ({ route, navigation }) => {
  const { groupId } = route.params

  const user = useSelector((state) => state?.user?.currentUser)

  const group = useSelector((state) =>
    state?.group?.groupAll?.find((item) => item.id === groupId),
  )

  // Stores the selected image URI
  const [file, setFile] = useState(null)

  // Stores any error message
  const [error, setError] = useState(null)

  // Function to pick an image from
  //the device's media library

  const [description, setDescription] = useState(null)

  const [loadingSignIn, setLoadingSignIn] = React.useState(false)

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

  const handlePressOutside = () => {
    Keyboard.dismiss() // Ẩn bàn phím khi chạm ra ngoài TextInput
  }
  const handleDeleteImg = () => {
    setFile()
  }
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!description) {
      Toast.show({
        type: "error",
        text1: "Thiếu phần mô tả",
        text2: "Bạn hãy điền đẩy đủ",
      })
      return
    }
    if (file) {
      const formDatas = new FormData()
      const uriParts = file.split(".")
      const fileType = uriParts[uriParts.length - 1]
      const uriName = file.split("/")
      const fileName = uriName[uriName.length - 1]

      formDatas.append("images", {
        uri: file,
        name: `file.${fileName}`,
        type: `image/${fileType}`,
      })
      formDatas.append("description", description)

      formDatas.append("organizationId", groupId)
      setLoadingSignIn(true)
      try {
        const res = await apiCreatePostGroup(formDatas)
        if (res?.data.data) {
          Toast.show({
            type: "success",
            text1: "Tạo thành công bài viết",
          })
        }
        navigation.navigate("GroupViewPage", {
          groupId: groupId,
        })

        setLoadingSignIn(false)
      } catch (error) {
        console.log(error)
        setLoadingSignIn(false)
        Toast.show({
          type: "error",
          text1: "Lỗi khi sever mong các bạn thông cảm",
          text2: "Vui lòng thử lại ",
        })
      }
    } else {
      const formData = new FormData()

      formData.append("description", description)
      formData.append("organizationId", groupId)

      setLoadingSignIn(true)
      try {
        const res = await apiCreatePostGroup(formData)
        if (res?.data.data) {
          Toast.show({
            type: "success",
            text1: "Tạo thành công bài viết",
          })
        }
        navigation.navigate("GroupViewPage", {
          groupId: groupId,
        })
        setLoadingSignIn(false)
      } catch (error) {
        console.log(error.res)
        setLoadingSignIn(false)
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
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: `${user.urlAvatar}` }}
              style={styles.imgContainer}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.username}</Text>
              <Text style={styles.description}>
                Nhóm :
                {group.name.length > 10 ? `${group.name.slice(0, 10)}...` : group.name}
              </Text>
            </View>
            <TouchableOpacity style={styles.addImg} onPress={pickImage}>
              <Feather name="image" size={32} color="green" />
              <Text style={styles.text3}>Ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContainer}>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
              <TextInput
                accessibilityLabel="input"
                multiline={true}
                numberOfLines={2}
                accessibilityLabelledBy="description"
                style={styles.input}
                placeholder="Bạn viết gi đó đi..."
                onChangeText={setDescription}
              />
            </TouchableWithoutFeedback>
            {file ? (
              <View>
                <Image style={styles.imgPick} source={{ uri: file }} />
                <TouchableOpacity
                  style={styles.btnDeleteImg}
                  onPress={handleDeleteImg}
                >
                  <AntDesign
                    name="closecircleo"
                    size={32}
                    color="white"
                    style={styles.iconDelete}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleUpload}
            >
              {!loadingSignIn ? (
                <Text style={styles.text2}>Đăng Bài</Text>
              ) : (
                <ActivityIndicator size={"large"} color={"black"} />
              )}
            </TouchableOpacity>
          </View>
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 0.025 * screenWidth,
    height: 0.1 * screenHeight,
    padding: 10,
    width: "90%",
  },
  imgContainer: {
    width: 0.17 * screenWidth,
    height: 0.17 * screenWidth,
    borderRadius: 10,
  },
  addImg: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    alignSelf: "flex-start",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  text3: {
    fontSize: 18,
    marginLeft: 10,
  },
  bodyContainer: {},
  input: {
    fontSize: 24,
    textAlignVertical: "top",
    marginTop: 10,
    marginHorizontal: 0.025 * screenWidth,
    height : "auto"
  },
  imgPick: {
    width: "100%",
    height: 0.5 * screenHeight,
    marginBottom: 10,
    objectFit : "cover"
  },
  btnContainer: {
    backgroundColor: "teal",
    height: 0.05 * screenHeight,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0.025 * screenWidth,
    marginBottom : 10,
  },
  text2: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  iconDelete: {
    top: 0.07 * screenHeight,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
  },
  btnDeleteImg: {
    position: "absolute",
    top: -0.085 * screenHeight,
    right: 0,
  },
})

export default CreatePostGroup
