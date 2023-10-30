import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { Dimensions } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

// Lấy kích thước màn hình
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const SignUp = ({ navigation }) => {
  const [openDropDown, setOpenDropDown] = React.useState(false)
  const [gender, setGender] = React.useState("male")
  const [itemsGender, setItemsGender] = React.useState([
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
  ])

  const handleClickSignUp = () => {
    console.log("handleClickSignUp")
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
                style={styles.btnSignIn}
              >
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
  btnSignIn: {
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
