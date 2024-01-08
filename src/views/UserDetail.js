import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { Ionicons } from "@expo/vector-icons"
import Toast from "react-native-toast-message"
import { upateProfileUser } from "../api/apiUpdateProflieUser"
import { checkValidPhoneNumber } from "../utils/checkValidPhoneNumber"

import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"

import { useSelector } from "react-redux"
import { userRequest } from "../api/requestMethod"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const UserDetail = ({ route }) => {
  const user = useSelector((state) => state.user?.currentUser)
  const [openDropDown, setOpenDropDown] = React.useState(false)
  const [displayName, setDisplayName] = React.useState(user.displayName)
  const [loadingSignIn, setLoadingSignIn] = React.useState(false)
  const [phone, setPhone] = React.useState(user.phone)
  const [gender, setGender] = React.useState(user.gender)
  const [address, setAddress] = useState()
  const [freeTime, setFreeTime] = useState()
  const [detail, setDetail] = useState()
  const [support, setSupport] = useState()
  const [change, setChange] = useState(false)
  const [userDetail, setUserDetail] = useState()
  const [point, setPoint] = useState()

  useEffect(() => {
    const getUserB = async () => {
      try {
        const res = await userRequest.get("/user/" + route.params.name)
        console.log(res.data.user)
        setUserDetail(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }
    getUserB()
  }, [])
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

  console.log(point)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.contentHeader}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                accessibilityLabel="User Image"
                source={{
                  uri: userDetail?.urlAvatar
                    ? `${userDetail?.urlAvatar}`
                    : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.pngz",
                }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.textName}>
                {userDetail?.displayName
                  ? userDetail?.displayName
                  : userDetail?.username}
              </Text>
              <Text style={styles.textEmail}>{userDetail?.gmail}</Text>
              <Text style={styles.textEmail}>
                Điểm : {point ? point : null}
              </Text>
            </View>
          </View>
          <View style={styles.contentDetail}>
            <ScrollView
              style={styles.container1}
              showsVerticalScrollIndicator={false}
            >
              <StatusBar barStyle="light-content" />
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.contentContainer1}>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Biệt Danh</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Không có biệt danh"
                      placeholderTextColor="#39395D"
                      value={userDetail?.displayName}
                      editable={change}
                      onChangeText={setDisplayName}
                    />
                  </View>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Số Điện Thoại</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Nhập biệt số điện thoại của bạn"
                      placeholderTextColor="#39395D"
                      value={userDetail?.phone}
                      editable={change}
                      onChangeText={setPhone}
                    />
                  </View>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Quỹ thời gian</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Chưa cập nhật"
                      placeholderTextColor="#39395D"
                      value={userDetail?.fundTime}
                      editable={change}
                      onChangeText={setFreeTime}
                    />
                  </View>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Mô tả cá nhân</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Chưa cập nhật"
                      placeholderTextColor="#39395D"
                      value={userDetail?.personalDesc}
                      editable={change}
                      onChangeText={setDetail}
                    />
                  </View>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Khả năng hỗ trợ</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Chưa cập nhật"
                      placeholderTextColor="#39395D"
                      value={userDetail?.abilitySupport}
                      editable={change}
                      onChangeText={setSupport}
                    />
                  </View>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Địa chỉ</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Chưa cập nhật"
                      placeholderTextColor="#39395D"
                      value={userDetail?.address}
                      editable={change}
                      onChangeText={setAddress}
                    />
                  </View>
                  <View style={styles.inputContainer12}>
                    <Text style={styles.labelInput12}>Giới tính</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Chưa cập nhật"
                      placeholderTextColor="#39395D"
                      value={userDetail?.gender}
                      editable={change}
                      onChangeText={setAddress}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "dodgerblue",
    height: screenHeight,
  },
  contentHeader: {
    height: "20%",
    width: "100%",
    paddingLeft: 0.03 * screenWidth,
    paddingRight: 0.03 * screenWidth,
    flexDirection: "row",
  },
  imageContainer: {
    backgroundColor: "#F89E90",
    width: 0.35 * screenWidth,
    height: 0.35 * screenWidth,
    borderRadius: 30,
    alignItems: "center",
    zIndex: 9,
    padding: 3,
    marginTop: 0.02 * screenHeight,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  detailContainer: {
    marginTop: 0.02 * screenHeight,
    marginLeft: 0.02 * screenWidth,
    width: "100%",
  },
  textName: {
    fontSize: 30,
    width: 0.65 * screenWidth,
    color: "white",
    fontWeight: "bold",
  },
  textEmail: {
    width: 0.7 * screenWidth,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  contentDetail: {
    backgroundColor: "white",
    height: "80%",
    width: "100%",
    alignSelf: "flex-end",
    borderRadius: 50,
  },
  container1: {
    backgroundColor: "#FFFFFF	",
    paddingBottom: 10,
    marginBottom: 100,
  },
  contentContainer1: {
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.05 * screenWidth,
    flex: 1,
    overflow: "scroll",
  },
  inputContainer12: {
    marginTop: 0.03 * screenHeight,
    marginBottom: 0.03 * screenHeight,
  },
  labelInput12: {
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
})

export default UserDetail
