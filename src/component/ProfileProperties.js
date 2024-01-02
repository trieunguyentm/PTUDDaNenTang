import React, { useState } from "react"
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
import DropDownPicker from "react-native-dropdown-picker"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import Toast from "react-native-toast-message"
import { upateProfileUser } from "../api/apiUpdateProflieUser"
import { checkValidPhoneNumber } from "../utils/checkValidPhoneNumber"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const ProfileProperties = () => {
  const user = useSelector((state) => state.user?.currentUser)
  console.log(user)
  const [openDropDown, setOpenDropDown] = React.useState(false)
  const [displayName, setDisplayName] = React.useState(user.displayName)
  const [loadingSignIn, setLoadingSignIn] = React.useState(false)
  const [phone, setPhone] = React.useState(user.phone)
  const [gender, setGender] = React.useState(user.gender)
  const [address, setAddress] = useState(user.address)
  const [freeTime, setFreeTime] = useState(user.fundTime)
  const [detail, setDetail] = useState(user.personalDesc)
  const [support, setSupport] = useState(user.abilitySupport)

  const [itemsGender, setItemsGender] = React.useState([
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
  ])

  const [change, setChange] = useState(false)
  const dispatch = useDispatch()

  const handleChange = async () => {
    if (!displayName) {
      setDisplayName(user.displayName)
    }
    if (!phone) {
      setPhone(user.phone)
    }
    if (!gender) {
      setGender(user.gender)
    }
    if (!address) {
      setAddress(user.address)
    }
    if (!freeTime) {
      setFreeTime(user.freeTime)
    }
    if (!detail) {
      setDetail(user.detail)
    }
    if (!support) {
      setSupport(user.support)
    }
    if (!checkValidPhoneNumber(phone)) {
      Toast.show({
        type: "info",
        text1: "Số điện thoại không hợp lệ",
        text2: "Vui lòng kiểm tra lại số điện thoại",
      })
      return
    }
    const input = {
      displayName: displayName,
      phone: phone,
      gender: gender,
      fundTime : freeTime,
      personalDesc : detail,
      abilitySupport : support,
      address : address,
    }
    setLoadingSignIn(true)
    try {
      const res = await upateProfileUser(dispatch, input, user.username)
      setLoadingSignIn(false)
      setChange(false)
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa thông tin thành công",
        })
      }
    } catch (error) {
      if (error.response?.data && error.response?.data.code === 2) {
        Toast.show({
          type: "error",
          text1: "Lỗi khi update thông tin người dùng",
          text2: "Vui lòng thử lại ",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi khi sever mong các bạn thông cảm",
          text2: "Vui lòng thử lại ",
        })
      }
      setLoadingSignIn(false)
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.changeEdit}
            onPress={() => setChange(true)}
          >
            <Text style={styles.textEdit}>Chỉnh sửa</Text>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Biệt Danh</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Nhập biệt danh của bạn"
              placeholderTextColor="#39395D"
              value={displayName}
              editable={change}
              onChangeText={setDisplayName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Số Điện Thoại</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Nhập biệt số điện thoại của bạn"
              placeholderTextColor="#39395D"
              value={phone}
              editable={change}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Quỹ thời gian</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Quỹ thời gian của bạn là"
              placeholderTextColor="#39395D"
              value={freeTime}
              editable={change}
              onChangeText={setFreeTime}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Mô tả cá nhân</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Mô tả cá nhân"
              placeholderTextColor="#39395D"
              value={detail}
              editable={change}
              onChangeText={setDetail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Khả năng hỗ trợ</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Khả năng hỗ trợ của bạn"
              placeholderTextColor="#39395D"
              value={support}
              editable={change}
              onChangeText={setSupport}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Địa chỉ</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Địa chỉ"
              placeholderTextColor="#39395D"
              value={address}
              editable={change}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput2}>Giới tính</Text>
            <DropDownPicker
              open={openDropDown}
              value={gender}
              items={itemsGender}
              setOpen={setOpenDropDown}
              setValue={setGender}
              style={styles.dropDown}
              setItems={setItemsGender}
              zIndex={1000}
              labelStyle={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#39395D",
              }}
              textStyle={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#39395D",
              }}
              disabled={!change}
            />
          </View>
          {change && (
            <TouchableOpacity style={styles.changeImage} onPress={handleChange}>
              {!loadingSignIn ? (
                <Text style={styles.textLogout}>Save Change</Text>
              ) : (
                <ActivityIndicator size={"large"} color={"black"} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileProperties

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF	",
    marginBottom: 40,
  },
  contentContainer: {
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.05 * screenWidth,
    flex: 1,
    overflow: "scroll",
    paddingTop: 0.045 * screenHeight,
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
    zIndex: -1,
    width: "100%",
    backgroundColor: "#3bb077",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 50,
    marginBottom: "5%",
    marginTop: "5%",
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
