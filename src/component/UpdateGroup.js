import React, { useState } from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import Toast from "react-native-toast-message"
import { createGroup } from "../api/apiCreateGroup"
import { useDispatch, useSelector } from "react-redux"
import { addGroup, updateGroupss } from "../redux/group"
import { useNavigation } from "@react-navigation/native"
import { updateGroup } from "../api/apiUdateGroup"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const UpdateGroup = ({ route }) => {
  const { groupId } = route.params
  const group   = useSelector((state)=>state?.group?.groupAll.find((item)=> item.id === groupId))
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [contact, setContact] = useState()
  const [loadingSignIn, setLoadingSignIn] = React.useState(false)
  const handlePressOutside = () => {
    Keyboard.dismiss() // Ẩn bàn phím khi chạm ra ngoài TextInput
  }
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleClick = async () => {
    const dataSend = {
      name: name ? name : group.name,
      description: description ? description : group.description,
      contactinfo: contact ? contact : group.contactinfo,
      groupId: groupId,
    }
    setLoadingSignIn(true)
    try {
      const res = await updateGroup(dataSend)
      setLoadingSignIn(false)
      dispatch(updateGroupss(res?.data?.data))
      if (res?.data && res?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Cập nhật nhóm thành công",
        })
      }
      navigation.navigate("GroupViewPage", { groupId: res?.data?.data?.id })
    } catch (error) {
      setLoadingSignIn(false)
        Toast.show({
          type: "error",
          text1: "Lỗi khi sever mong các bạn thông cảm",
          text2: "Vui lòng thử lại ",
        })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.inputContainer}>
              <Text nativeID="name" style={styles.text}>
                Tên
              </Text>
              <TextInput
                accessibilityLabel="input"
                accessibilityLabelledBy="name"
                style={styles.input}
                placeholder={group.name}
                onChangeText={setName}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.inputContainer}>
              <Text nativeID="description" style={styles.text}>
                Mô tả
              </Text>
              <TextInput
                accessibilityLabel="input"
                multiline={true}
                numberOfLines={4}
                accessibilityLabelledBy="description"
                style={styles.input1}
                placeholder={group.description}
                onChangeText={setDescription}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.inputContainer}>
              <Text nativeID="contact" style={styles.text}>
                Địa chỉ liên hệ
              </Text>
              <TextInput
                accessibilityLabel="input"
                accessibilityLabelledBy="contact"
                style={styles.input}
                placeholder={group.contactinfo}
                onChangeText={setContact}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity style={styles.btnContainer} onPress={handleClick}>
            {!loadingSignIn ? (
              <Text style={styles.textBtn}>Cập nhật nhóm</Text>
            ) : (
              <ActivityIndicator size={"large"} color={"black"} />
            )}
          </TouchableOpacity>
        </View>
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
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.05 * screenWidth,
  },
  inputContainer: {
    marginTop: 0.03 * screenHeight,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 0.08 * screenHeight,
    width: "100%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 2,
    marginTop: 0.015 * screenHeight,
    fontSize: 24,
    paddingLeft: 10,
  },
  input1: {
    height: 0.2 * screenHeight,
    width: "100%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 2,
    marginTop: 0.015 * screenHeight,
    fontSize: 24,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 0,
    textAlignVertical: "top",
  },
  btnContainer: {
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
  textBtn: {
    fontSize: 24,
    fontWeight: "bold",
  },
})

export default UpdateGroup
