import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { Dimensions } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import Toast from "react-native-toast-message"
import { checkValidGmail } from "../utils/checkValidGmail"
import { checkValidPhoneNumber } from "../utils/checkValidPhoneNumber"
import CryptoJS from "react-native-crypto-js"
import { APIRegister, register } from "../api/apiRegister"
import { useDispatch } from "react-redux"

// Lấy kích thước màn hình
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const SignUp = ({ navigation }) => {
  const [openDropDown, setOpenDropDown] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [gmail, setGmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [gender, setGender] = React.useState("male")
  const [itemsGender, setItemsGender] = React.useState([
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
  ])
  const [loadingSignUp, setLoadingSignUp] = React.useState(false)
  const dispatch = useDispatch()

  const handleClickSignUp = async () => {
    /** Kiểm tra dữ liệu */
    if (!username || !gmail || !password || !confirmPassword || !gender) {
      Toast.show({
        type: "info",
        text1: "Hãy điền đầy đủ thông tin",
        text2: "Vui lòng điền đủ các thông tin",
      })
      return
    }
    if (!checkValidGmail(gmail)) {
      Toast.show({
        type: "info",
        text1: "Địa chỉ gmail không hợp lệ",
        text2: "Vui lòng kiểm tra lại gmail của bạn",
      })
      return
    }
    if (password.length < 6) {
      Toast.show({
        type: "info",
        text1: "Mật khẩu không an toàn",
        text2: "Độ dài mật khẩu cần có ít nhất 6 ký tự",
      })
      return
    }
    if (confirmPassword !== password) {
      Toast.show({
        type: "info",
        text1: "Mật khẩu xác nhận không hợp lệ",
        text2: "Vui lòng kiểm tra lại mật khẩu xác nhận",
      })
      return
    }
    if (phone && !checkValidPhoneNumber(phone)) {
      Toast.show({
        type: "info",
        text1: "Số điện thoại không hợp lệ",
        text2: "Vui lòng kiểm tra lại số điện thoại",
      })
      return
    }
    if (gender !== "male" && gender !== "female") {
      Toast.show({
        type: "info",
        text1: "Giới tính không hợp lệ",
        text2: "Vui lòng chọn lại",
      })
    }
    /** Mã hóa mật khẩu */
    const _password = CryptoJS.AES.encrypt(
      password,
      process.env.EXPO_PUBLIC_KEY_AES,
    ).toString()
    /** Gửi API đến server */
    setLoadingSignUp(true)
    try {
      // const response = await APIRegister(
      //   username,
      //   gmail,
      //   _password,
      //   gender,
      //   phone,
      // )
      const response = await register(
        dispatch,
        username,
        gmail,
        _password,
        gender,
        phone,
      )
      setLoadingSignUp(false)
      navigation.navigate("VerifyOTP")
      /** Xử lý response tại đây */
    } catch (error) {
      if (error.response.data && error.response.data.code === 1) {
        Toast.show({
          type: "error",
          text1: "Tên đăng nhập đã tồn tại",
          text2: "Hãy thử một tên đăng nhập khác",
        })
      }
      if (error.response.data && error.response.data.code === 2) {
        Toast.show({
          type: "error",
          text1: "Xảy ra lỗi khi gửi OTP đến gmail của bạn",
          text2: "Vui lòng thử đăng ký lại",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Có lỗi xảy ra",
          text2: error.response.data.msg,
        })
      }

      setLoadingSignUp(false)
    }
  }

  const handleClickSignIn = () => {
    navigation.navigate("SignIn")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#FFFFFF", "#DDEFBB", "#FFEEEE"]}
        style={styles.gradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            {/* Nội dung của screen */}
            {/* Các trường nhập dữ liệu */}
            <View style={styles.fields}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Tên đăng nhập <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Nhập tên đăng nhập "
                  placeholderTextColor="#A9A9A9"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Gmail <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Nhập địa chỉ gmail của bạn"
                  placeholderTextColor="#A9A9A9"
                  value={gmail}
                  onChangeText={setGmail}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Mật khẩu <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Nhập mật khẩu của bạn"
                  placeholderTextColor="#A9A9A9"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Xác nhận mật khẩu <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Xác nhận lại mật khẩu của bạn"
                  placeholderTextColor="#A9A9A9"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Nhập số điện thoại của bạn"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Giới tính <Text style={{ color: "red" }}>*</Text>
                </Text>
                <DropDownPicker
                  open={openDropDown}
                  value={gender}
                  items={itemsGender}
                  setOpen={setOpenDropDown}
                  setValue={setGender}
                  setItems={setItemsGender}
                  zIndex={1000}
                />
              </View>
            </View>
            <View style={styles.btnSignUpContainer}>
              <LinearGradient
                colors={["#384CFF", "#00A3FF"]}
                style={styles.btnSignUp}
              >
                {!loadingSignUp ? (
                  <TouchableOpacity onPress={handleClickSignUp}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      Đăng ký tài khoản
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <ActivityIndicator size={"large"} color={"black"} />
                )}
              </LinearGradient>
              <TouchableOpacity
                style={styles.navigationSignIn}
                onPress={handleClickSignIn}
              >
                <Text style={{ color: "dodgerblue" }}>
                  Quay lại trang đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.05 * screenWidth,
    flex: 1,
    justifyContent: "center",
  },
  fields: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
  },
  inputContainer: {
    height: "8%",
    marginTop: 0.02 * screenHeight,
  },
  label: {
    width: "100%",
    height: "40%",
    marginBottom: 0.01 * screenHeight,
  },
  input: {
    paddingLeft: 10,
    width: "100%",
    height: "60%",
    justifyContent: "center",
    fontSize: 18,
    backgroundColor: "whitesmoke",
    borderRadius: 12,
  },
  btnSignUpContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
  },
  btnSignUp: {
    width: "50%",
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  navigationSignIn: {
    width: "100%",
    alignItems: "center",
    marginTop: 0.03 * screenHeight,
  },
})

export default SignUp
