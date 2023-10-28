import React from "react"
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"

// Lấy kích thước màn hình
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const SignIn = ({ navigation }) => {
  const [user, setUser] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleClickSignIn = () => {
    console.log("handleClickSignIn")
  }

  const handleClickSignUp = () => {
    navigation.navigate("SignUp")
  }

  const handleClickForgotPassword = () => {
    console.log("handleClickForgotPassword")
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
            {/* Logo */}
            <View style={styles.signInLogo}>
              <Image
                source={require("../../assets/signin-logo.png")}
                resizeMode="contain"
              />
            </View>
            {/* Trường tài khoản, mật khẩu, đăng nhập */}
            <View style={styles.fieldSignInContainer}>
              {/* Tên đăng nhập */}
              <View style={styles.field}>
                <View style={styles.fieldContainer}>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      marginRight: 0.03 * screenWidth,
                    }}
                    source={require("../../assets/user.png")}
                    resizeMode="contain"
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={setUser}
                    value={user}
                    placeholder="Nhập tên tài khoản"
                  />
                </View>
              </View>
              {/* Mật khẩu */}
              <View style={styles.field}>
                <View style={styles.fieldContainer}>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      marginRight: 0.03 * screenWidth,
                    }}
                    source={require("../../assets/key.png")}
                    resizeMode="contain"
                  />
                  <TextInput
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Nhập mật khẩu"
                  />
                </View>
              </View>
              {/* Button đăng nhập */}
              <View style={styles.field}>
                <View style={styles.btnSignInContainer}>
                  <LinearGradient
                    colors={["#384CFF", "#00A3FF"]}
                    style={styles.btnSignIn}
                  >
                    <TouchableOpacity onPress={handleClickSignIn}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        Đăng nhập
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            {/* Chuyển trang đăng ký */}
            <View style={styles.navigationSignUp}>
              <TouchableOpacity onPress={handleClickForgotPassword}>
                <Text style={{ color: "dodgerblue", fontSize: 15 }}>
                  Quên mật khẩu ?
                </Text>
              </TouchableOpacity>
              <View style={styles.divider}>
                <View style={styles.dividerItem} />
                <View style={{ width: "20%", alignItems: "center" }}>
                  <Text style={{ color: "dodgerblue" }}>Hoặc</Text>
                </View>
                <View style={styles.dividerItem} />
              </View>
              <View style={styles.btnNavigationSignUpContainer}>
                <TouchableOpacity
                  onPress={handleClickSignUp}
                  style={styles.btnNavigationSignUp}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 300,
                      color: "dodgerblue",
                    }}
                  >
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
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
    overflow: "scroll",
  },
  signInLogo: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  fieldSignInContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
  },
  fieldContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    fontSize: 20,
    marginRight: 0.05 * screenWidth,
  },
  btnSignInContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSignIn: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  navigationSignUp: {
    width: "100%",
    height: "30%",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
  },
  dividerItem: {
    width: "40%",
    height: 1,
    backgroundColor: "dodgerblue",
  },
  btnNavigationSignUpContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnNavigationSignUp: {
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "dodgerblue",
    borderWidth: 2,
    borderRadius: 25,
  },
})

export default SignIn
