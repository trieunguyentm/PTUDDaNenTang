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
import OTPInputView from "@twotalltotems/react-native-otp-input"


// Lấy kích thước màn hình
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const VerifyOTP = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#FFFFFF", "#DDEFBB", "#FFEEEE"]}
        style={styles.gradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.text1}>Mã xác nhận</Text>
            <Text style={styles.text2}>Chúng tôi đã gửi mã xác minh tới</Text>
            <Text style={styles.text3}>
              thang.cq204604@sis.hust.edu.vn
            </Text>

            <View style={styles.inputsField}>
              <OTPInputView
              style={styles.inputField}
                pinCount={6}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.input}
                onCodeFilled={(code) => {
                  console.log(`Code is ${code}, you are good to go!`)
                }}
              />
            </View>
            <View style={styles.btnField}>
              <TouchableOpacity style={styles.btnNavigationSignUp}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 300,
                    color: "dodgerblue",
                  }}
                >
                  Gửi lại
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={["#384CFF", "#00A3FF"]}
                style={styles.btnSignIn}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
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
    marginTop: 0.1 * screenHeight,
  },
  text1: {
    width: screenWidth,
    fontSize: 0.06 * screenWidth,
    fontWeight: "bold",
  },
  text2: {
    width: screenWidth,
    fontSize: 0.04 * screenWidth,
    marginTop: 0.01 * screenHeight,
  },
  text3: {
    width: screenWidth,
    fontSize: 0.035 * screenWidth,
    marginTop: 0.009 * screenHeight,
    marginBottom: 0.05 * screenHeight,
  },
  text4: {
    color: "dodgerblue",
  },
  inputsField: {
    width: "100%",
    flexDirection: "row",
    height: "12%",
  },
  inputField: {
    width: "100%",
    //  height : "100%",
    marginTop: 0.01 * screenHeight,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 0.12 * screenWidth,
    height: "100%",
    backgroundColor: "white",
    marginHorizontal: 0,
    borderWidth: 0,
    color: "black",
    fontSize: 0.04 * screenHeight,
    borderRadius: 10,
  },
  btnField: {
    marginTop: 0.05 * screenHeight,
    flexDirection: "row",
    height: "7%",
  },
  btnSignIn: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: "10%",
  },
  btnNavigationSignUp: {
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "dodgerblue",
    borderWidth: 2,
    borderRadius: 25,
  },
})

export default VerifyOTP
