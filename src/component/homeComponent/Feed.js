import { useState, useRef, useEffect } from "react"
import React from "react"
import {
  RefreshControl,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  SafeAreaView,
  Pressable,
  PanResponder,
} from "react-native"
import Post from "./Post"
import { Dimensions } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { useScrollToTop } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import {
  postFetching,
  fetchFailed,
  getAllRequest,
  getAllEvents,
  postFetched,
} from "../../redux/posts"
import { publicRequest } from "../../api/requestMethod"
import { FontAwesome } from "@expo/vector-icons"
import { userRequest } from "../../api/requestMethod"

const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width

const Feed = () => {
  const user = useSelector((state) => state.user?.currentUser)
  const [refreshing, setRefreshing] = React.useState(false)
  const navigation = useNavigation()
  const [request, setRequest] = useState([])
  const [groupManage, setGroupManage] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [helpId, setHelpId] = useState()

  const dispatch = useDispatch()
  const createPost = () => {
    navigation.navigate("Posting")
  }
  const mark = (id) => {
    setHelpId(id)
    setModalVisible(true)
  }
  const addBookmark = async (groupID) => {
    const data = {
      organizationId: groupID,
      helpRequestId: helpId,
    }
    console.log(data)
    try {
      const res = await userRequest.post(
        "helpRequest/sendRequestToOrganization",
        data,
      )
      console.log("thành công")
      Toast.show({
        type: "success",
        text1: "Thêm sự kiện cho nhóm bạn thành công",
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Lỗi sever hãy thử lại",
      })
    }
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  const scrollRef = useRef()
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])
  useScrollToTop(scrollRef)

  useEffect(() => {
    const getGroup = async () => {
      try {
        const res = await userRequest.get(
          "/organization/getOrganizationByCreator",
        )
        setGroupManage(res.data.data)
        console.log(res.data.data)
        dispatch(getManage(res.data.data))
      } catch (error) {
        console.log(error.response)
      }
    }
    getGroup()
  }, [])
  const [refreshings, setRefreshings] = React.useState(false)

  const onRefreshs = React.useCallback(() => {
    setRefreshings(true)
    const getGroup = async () => {
      try {
        const res = await userRequest.get(
          "/organization/getOrganizationByCreator",
        )
        setGroupManage(res.data.data)
        console.log(res.data.data)
        dispatch(getManage(res.data.data))
        setRefreshings(false)
      } catch (error) {
        setRefreshings(false)
        console.log(error.response)
      }
    }
    getGroup()
  }, [])

  useEffect(() => {
    const getData = async () => {
      dispatch(postFetching())

      try {
        const res = await publicRequest.get("helpRequest/getAllHelpRequest")
        if (res) {
          setRequest(res.data.data)
        }
        dispatch(postFetched())
      } catch (error) {
        console.log(error)
        dispatch(fetchFailed())
      }
    }
    getData()
  }, [refreshing])

  return (
    <View style={styles.Feed}>
      <SafeAreaView style={styles.Feed}>
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <View style={modalStyle.modalView}>
            <Text style={modalStyle.modalTitle}>Nhóm của bạn</Text>
            <ScrollView
              style={{ height: screenHeight * 0.2 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshings}
                  onRefresh={onRefreshs}
                />
              }
            >
              {groupManage.length != 0 ? (
                groupManage?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={modalStyle.optionsContainer}
                    onPress={() => addBookmark(item?.id)}
                  >
                    <Image
                      source={{ uri: `${item?.urlAvatar}` }}
                      style={modalStyle.img}
                    />
                    <Text style={modalStyle.groupname}>{item?.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={modalStyle.modalTitle1}>
                  Bạn không sở hữu nhóm nào
                </Text>
              )}
            </ScrollView>
            <Pressable style={modalStyle.cancel} onPress={closeModal}>
              <Text style={modalStyle.modalTop}>Cancel</Text>
            </Pressable>
          </View>
        </Modal>

        <ScrollView
          style={styles.Feed}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={scrollRef}
        >
          <View style={styles.Spacer} />

          <View style={styles.PostCreator}>
            <TouchableOpacity>
              <View>
                <Image
                  style={styles.userAvatar}
                  source={{ uri: `${user.urlAvatar}` }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={createPost} style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.TextContainer}>
                <Text>Tạo yêu cầu hỗ trợ</Text>
              </View>
              <MaterialIcons
                style={styles.addPostIcon}
                name="post-add"
                size={50}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Spacer} />
          {request?.map((data, index) => (
            <View key={index}>
              <Post key={data.id} Event={data} id={data.id} />
              <View style={styles.Navigator}>
                <FontAwesome.Button
                  name="bookmark-o"
                  style={styles.iconStyles}
                  size={24}
                  color="black"
                  onPress={() => mark(data.id)}
                >
                  Bookmark
                </FontAwesome.Button>
              </View>
              <View style={styles.Spacer} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  Feed: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  PostCreator: {
    height: screenHeight * 0.08,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: screenWidth * 0.03,
    borderColor: "#000000",
    alignItems: "center",
  },
  userAvatar: {
    // resizeMode: "center",
    width: screenHeight * 0.07,
    height: screenHeight * 0.07,
    borderRadius: screenHeight * 0.035,
    borderColor: "#000000",
    borderWidth: 1,
  },
  TextContainer: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.05,
    borderCurve: "circular",
    borderRadius: screenWidth * 0.45,
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: screenWidth * 0.03,
    marginRight: screenWidth * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  addPostIcon: {
    marginLeft: "auto",
    marginRight: screenWidth * 0.02,
    alignSelf: "center",
  },

  Spacer: {
    width: screenWidth,
    backgroundColor: "#A8A3A3",
    height: screenHeight * 0.003,
  },
  searchBar: {
    width: screenWidth,
    padding: 10,
    height: screenHeight * 0.05,
    borderRadius: screenWidth * 0.45,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
  },
  iconStyles: {
    backgroundColor: "#ffffff",
    resizeMode: "contain",
    backfaceVisibility: "visible",
  },
  Navigator: {
    justifyContent: "space-around",
    alignContent: "space-between",
    alignItems: "center",
    marginTop: 3,
    marginBottom: 3,
  },
})

const modalStyle = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  modalTitle: {
    alignSelf: "center",
    textAlign: "center",
    paddingBottom: screenHeight * 0.02,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomColor: "#E9E8EB",
    borderBottomWidth: 3,
    width: "100%",
  },
  modalTitle1: {
    alignSelf: "center",
    textAlign: "center",
    paddingBottom: screenHeight * 0.02,
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    marginTop: 10,
  },
  modalTop: {
    alignSelf: "center",
    textAlign: "center",
    paddingTop: screenHeight * 0.02,
    fontSize: 16,
    fontWeight: "bold",
    borderTopColor: "#E9E8EB",
    borderTopWidth: 3,
    width: "100%",
  },
  modalView: {
    top: screenHeight * 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignContent: "center",
    height: screenHeight * 0.34,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  groupname: {
    marginLeft: screenWidth * 0.03,
    fontSize: 18,
    alignSelf: "center",
    width: screenWidth * 0.6,
  },
  cancel: {
    paddingTop: screenHeight * 0.01,
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
  },
  img: {
    height: screenWidth * 0.1,
    width: screenWidth * 0.1,
    borderRadius: 5,
  },
})

export default Feed
