import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  PanResponder,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Linking,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import React, { useState, useRef } from "react"
import * as DocumentPicker from "expo-document-picker"
import Toast from "react-native-toast-message"
import { useDispatch, useSelector } from "react-redux"
import { userRequest } from "../api/requestMethod"
import { addFile } from "../redux/group"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const File = ({ route, navigation }) => {
  const [selectFile, setSelectFile] = useState()

  const [filePath, setFilePath] = useState()

  const [titleReport, setTitleReport] = useState()

  const [loadingSignIn, setLoadingSignIn] = React.useState(false)

  const dispatch = useDispatch()

  const handleDeleteFile = () => {
    setSelectFile()
    setTitleReport()
  }

  const groupId = route.params.groupId

  const group = useSelector((state) =>
    state?.group?.groupAll?.find((item) => item.id == groupId),
  )
  const user = useSelector((state) => state.user?.currentUser)

  const listFile = useSelector((state) => state?.group?.file)

  const [modalView, setModalView] = useState(false)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 30) {
          setModalView(false)
        }
      },
      onPanResponderRelease: () => {
        // Thực hiện bất kỳ xử lý sau khi người dùng thả tay
      },
    }),
  ).current

  const selecFILE = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/*", // Chỉ định kiểu tệp bạn muốn chọn
        copyToCacheDirectory: false, // Optional - true nếu bạn muốn sao chép tệp đến thư mục bộ nhớ đệm
      })
      if (res.canceled) {
        setModalView(false)
        setSelectFile(null)
        Toast.show({
          type: "info",
          text1: "Chọn file không thành công",
        })
        return
      } else {
        Toast.show({
          type: "success",
          text1: "Chọn file thành công",
        })
        setSelectFile(res)
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "File không hợp lệ ",
        text2: "pdf,doc,docx",
      })
    }
  }
  const handleUploadFile = async () => {
    if (!titleReport) {
      Toast.show({
        type: "error",
        text1: "Thiếu tên file ",
        text2: "vui lòng nhập lại",
      })
      return
    }
    const formData = new FormData()
    const uriParts = selectFile?.assets[0]?.name.split(".")
    console.log(uriParts)

    formData.append("file", {
      uri: selectFile?.assets[0]?.uri,
      name: `file.${uriParts[0]}.${uriParts[1]}`,
      type: `application/${uriParts[1]}`,
    })
    formData.append("organizationId", groupId)
    formData.append("titleReport", titleReport)

    setLoadingSignIn(true)
    try {
      const response = await userRequest.post(
        "/organization/createReport",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" : "Bearer " + token,
          },
        },
      )
      console.log(response.data.data)
      setLoadingSignIn(false)
      if (response?.data && response?.data.code === 0) {
        Toast.show({
          type: "success",
          text1: "Thêm file thành công",
        })
      }
      dispatch(addFile(response.data.data))
      setModalView(false)
      setSelectFile(null)
    } catch (error) {
      if (error.response?.data && error.response?.data.code === 3) {
        Toast.show({
          type: "error",
          text1: "Không có quyền đăng báo cáo ",
          text2: "Vui lòng thử lại ",
        })
      }
      if (error.response?.data && error.response.data?.code === 4) {
        Toast.show({
          type: "error",
          text1: "Lỗi sever ",
          text2: "Vui lòng thử lại ",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi sever ",
          text2: "Vui lòng thử lại ",
        })
      }
      console.log("Error uploading file:", error.message)
      setLoadingSignIn(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleHeader}>File :</Text>
            {user?.username === group?.creator && (
              <View style={styles.btnHeaderContainer}>
                <TouchableOpacity
                  style={styles.btnHeader}
                  onPress={() => setModalView(true)}
                >
                  <AntDesign name="addfile" size={28} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ScrollView style={styles.contentContainer}>
            {listFile?.length != 0 ? (
              listFile?.map((item, index) => {
                const date = new Date(parseInt(item.createdAt, 10))
                const dateString = date.toLocaleDateString()
                return (
                  <TouchableOpacity
                    style={styles.dataContainer}
                    key={index}
                    onPress={() => Linking.openURL(item?.urlFile[0])}
                  >
                    <AntDesign name="file1" size={48} color="black" />
                    <View style={styles.textCon}>
                      <Text style={styles.text11}>{item?.titleReport}</Text>
                      <Text style={styles.text22}>{item?.creator}</Text>
                    </View>
                    <Text style={styles.text33}>{dateString}</Text>
                  </TouchableOpacity>
                )
              })
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Không có file nào
              </Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={modalView}>
        <View style={styles.modalContainer} {...panResponder.panHandlers}>
          <View style={styles.createGroupContainer}>
            {selectFile ? (
              <View style={styles.createGroup1}>
                <TouchableOpacity
                  style={styles.btnHeaderGroup}
                  onPress={selecFILE}
                >
                  <AntDesign name="file1" size={36} color="black" />
                </TouchableOpacity>
                <View style={styles.titleCreateContainer1}>
                  <TextInput
                    style={styles.text1}
                    placeholder="Nhập tên file"
                    onChangeText={setTitleReport}
                  />
                  <Text style={styles.text2}>
                    {selectFile?.assets[0]?.name}
                  </Text>
                  <TouchableOpacity
                    style={styles.btnDeleteFile}
                    onPress={handleDeleteFile}
                  >
                    <AntDesign
                      name="closecircleo"
                      size={22}
                      color="black"
                      style={styles.iconDelete}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.btnHeaderGroup1}
                  onPress={handleUploadFile}
                >
                  {!loadingSignIn ? (
                    <>
                      <AntDesign name="upload" size={24} color="white" />
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          marginLeft: 10,
                          color: "white",
                        }}
                      >
                        Upload
                      </Text>
                    </>
                  ) : (
                    <ActivityIndicator size={"large"} color={"black"} />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.createGroup}>
                <TouchableOpacity
                  style={styles.btnHeaderGroup}
                  onPress={selecFILE}
                >
                  <AntDesign name="addfile" size={36} color="black" />
                </TouchableOpacity>
                <View style={styles.titleCreateContainer}>
                  <Text style={styles.text1}>Thêm file</Text>
                  <Text style={styles.text2}>
                    Thêm file báo cáo hoặc tổng kết
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
    height: 0.07 * screenHeight,
    marginHorizontal: 0.025 * screenWidth,
  },
  titleHeader: {
    fontSize: 34,
    fontWeight: "bold",
  },
  btnHeaderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  btnHeader: {
    borderRadius: 100,
    backgroundColor: "#E8E9EB",
    height: 0.11 * screenWidth,
    width: 0.11 * screenWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "relative",
  },
  createGroupContainer: {
    maxHeight: 0.5 * screenHeight,
    minHeight: 0.15 * screenHeight,
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0,
    shadowRadius: 13.16,

    elevation: 1,
    zIndex: 99,
  },
  createGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 30,
  },
  createGroup1: {
    display: "flex",
    flexDirection: "row",
    padding: 30,
  },
  btnHeaderGroup: {
    borderRadius: 100,
    backgroundColor: "#E8E9EB",
    height: 0.15 * screenWidth,
    width: 0.15 * screenWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    alignSelf: "center",
  },
  btnHeaderGroup1: {
    borderRadius: 10,
    backgroundColor: "#3bb077",
    height: 0.15 * screenWidth,
    width: 0.3 * screenWidth,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    alignSelf: "center",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  titleCreateContainer: {
    marginLeft: 0.05 * screenWidth,
  },
  titleCreateContainer1: {
    marginLeft: 0.05 * screenWidth,
    width: 0.3 * screenWidth,
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    color: "grey",
  },
  cardContainer: {
    flex: 1,
  },
  btnDeleteFile: {
    position: "absolute",
    top: 0 * screenHeight,
    left: -0.1 * screenWidth,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 10,
    borderBottomColor: "#E8E9EB",
    borderBottomWidth: 2,
    paddingBottom: 5,
    alignItems: "center",
  },
  textCon: {
    marginLeft: 10,
  },
  text11: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#327fd2",
  },
  text22: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text33: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
    right: 0,
    bottom: 5,
  },
})

export default File
