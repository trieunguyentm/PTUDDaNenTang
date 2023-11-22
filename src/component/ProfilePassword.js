import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native"
import React from "react"
import Toast from "react-native-toast-message"
import CryptoJS from "react-native-crypto-js"
import { userRequest } from "../api/requestMethod"
import { useDispatch, useSelector } from "react-redux"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const ProfilePassword = () => {
  const user = useSelector((state) => state.user?.currentUser)
  const [oldpassword, setOldPassword] = React.useState("")
  const [newpassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [loadingSignIn, setLoadingSignIn] = React.useState(false)

  const handleChange = async () => {
    if (newpassword.length < 6) {
      Toast.show({
        type: "info",
        text1: "Mật khẩu không an toàn",
        text2: "Độ dài mật khẩu cần có ít nhất 6 ký tự",
      })
      return
    }
    if (confirmPassword !== newpassword) {
      Toast.show({
        type: "info",
        text1: "Mật khẩu xác nhận không hợp lệ",
        text2: "Vui lòng kiểm tra lại mật khẩu xác nhận",
      })
      return
    }
    /** Mã hóa mật khẩu cũ */
    const hashOldPassword = CryptoJS.AES.encrypt(
      oldpassword,
      process.env.EXPO_PUBLIC_KEY_AES,
    ).toString()
    /** Mã hóa mật khẩu mới */
    const hashPassword = CryptoJS.AES.encrypt(
      confirmPassword,
      process.env.EXPO_PUBLIC_KEY_AES,
    ).toString()
    const input = {
      currentPassword: hashOldPassword,
      newPassword: hashPassword,
    }
    setLoadingSignIn(true)
    try {
      const res = await userRequest.put(
        `user/changePassword/` + user.username,
        input,
      )
      setLoadingSignIn(false)
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa thông tin thành công",
        })
      }
    } catch (error) {
      setLoadingSignIn(false)
      if (error.response?.data && error.response?.data.code === 3) {
        Toast.show({
          type: "error",
          text1: "Mật khẩu cũ không chính xác",
          text2: "Vui lòng thử lại ",
        })
      }
      if (error.response?.data && error.response?.data.code === 2) {
        Toast.show({
          type: "error",
          text1: "Không tồn tại người dùng",
          text2: "Vui lòng thử lại ",
        })
      } else {
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
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Mật khẩu cũ</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Nhập mật khẩu cũ của bạn"
              placeholderTextColor="#39395D"
              value={oldpassword}
              onChangeText={setOldPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Mật khẩu mới</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="#39395D"
              value={newpassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Xác nhận lại mật khẩu của bạn</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Xác nhận lại mật khẩu"
              placeholderTextColor="#39395D"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.changeImage} onPress={handleChange}>
            {!loadingSignIn ? (
              <Text style={styles.textLogout}>Save Change</Text>
            ) : (
              <ActivityIndicator size={"large"} color={"black"} />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default ProfilePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF	",
  },
  contentContainer: {
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.05 * screenWidth,
    flex: 1,
    overflow: "scroll",
    paddingTop: 0.02 * screenHeight,
  },
  inputContainer: {
    marginTop: 0.03 * screenHeight,
    marginBottom: 0.03 * screenHeight,
  },
  labelInput: {
    marginLeft: 10,
    fontSize: 24,
    color: "gray",
    fontWeight: "bold",
  },
  input: {
    paddingLeft: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    fontSize: 20,
    borderRadius: 12,
    borderBottomWidth: 2,
    borderColor: "#A9A9A9",
    fontWeight: "bold",
    color: "#39395D",
  },
  dropDown: {
    fontWeight: "bold",
    color: "#39395D",
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  labelInput2: {
    marginLeft: 10,
    marginBottom: 0.02 * screenHeight,
    fontSize: 24,
    color: "gray",
    fontWeight: "bold",
  },
  changeImage: {
    width: "100%",
    backgroundColor: "#3bb077",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 50,
    marginBottom: "5%",
    marginTop: "10%",
    flexDirection: "row",
  },
  textLogout: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  textEdit: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginRight: 0.02 * screenWidth,
  },
  changeEdit: {
    width: "45%",
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
    height: 0.05 * screenHeight,
    borderRadius: 50,
    marginTop: "5%",
    flexDirection: "row",
    left: "65%",
    position: "absolute",
  },
})
