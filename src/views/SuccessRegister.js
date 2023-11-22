import React from "react"
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { AntDesign } from "@expo/vector-icons"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const SuccessRegister = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#DDEFBB", "#FFEEEE"]}
        style={styles.isContainer}
      >
        <View style={styles.buttonContainer}>
          <Text style={{ fontSize: 30 }}>Terms & Privacy</Text>
        </View>
        <Text style={styles.text1}>Chúc mừng bạn hoàn tất việc đăng ký</Text>
        <Text style={styles.text2}>
          Bằng cách nhấn vào Đăng nhập, bạn đồng ý với chúng tôi
        </Text>
        <Text style={styles.text3}>
          Điều khoản, Chính sách dữ liệu và Chính sách cookie
        </Text>
        <Image
          style={styles.image}
          accessibilityLabel="User Image"
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/5521/5521174.png?ga=GA1.1.1124457332.1696837885&track=ais",
          }}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <LinearGradient
            colors={["#384CFF", "#00A3FF"]}
            style={styles.button}
            start={{ x: 0, y: 0.5 }} // Điểm bắt đầu ở giữa trên (x: 0, y: 0.5)
            end={{ x: 1, y: 0.5 }} // Điểm kết thúc ở giữa dưới (x: 1, y: 0.5)
          >
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  isContainer: {
    flex: 1,
    width: screenWidth,
    alignItems: "center",
    marginTop: 0.05 * screenHeight,
    paddingHorizontal: 0.05 * screenWidth,
    alignItems: "center",
  },
  buttonContainer: {
    marginHorizontal: 0.05 * screenWidth,
    flexDirection: "row",
    marginTop: 0.01 * screenHeight,
    height: 0.1 * screenHeight,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBack: {
    height: 0.05 * screenHeight,
    width: 0.2 * screenWidth,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  text1: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 0.05 * screenHeight,
    textAlign: "center",
  },
  text2: {
    height: 0.05 * screenHeight,
    color: "#A9A9A9",
    width: "75%",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 0.01 * screenHeight,
  },
  text3: {
    color: "#384CFF",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0.001 * screenHeight,
    width: "75%",
  },
  image: {
    marginTop: 0.05 * screenHeight,
    height: 0.25 * screenHeight,
    width: 0.25 * screenHeight,
  },
  button: {
    height: 0.05 * screenHeight,
    width: 0.8 * screenWidth,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0.05 * screenHeight,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
})

export default SuccessRegister
