import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  RefreshControl,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { userRequest } from "../api/requestMethod"
import backgroundForNone from "../../assets/groups-default-cover-photo-2x.png"
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupHasJoin, getManage, reset } from "../redux/group"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const GroupHasJoin = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [groupJoin, setGroupJoin] = useState()
  const [groupManage, setGroupManage] = useState()

  const manageGroup = useSelector((state)=> state.group.groupManage)
  const joinGroup = useSelector((state) => state.group.GroupsHasJoin)

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    const getGroup = async () => {
      try {
        const res = await userRequest.get(
          "/organization/getOrganizationByCreator",
        )
        setGroupManage(res.data)
        dispatch(getManage(res.data.data))
        // getGroupJoin
        const response = await userRequest.get("organization/getOrganizationByUser")
        setGroupJoin(response.data)
        dispatch(getGroupHasJoin(response.data.data))
        setRefreshing(false)
      } catch (error) {
        setRefreshing(false)
        console.log(error.response)
      }
    }
    getGroup()

  }, [])


  useEffect(() => {
    const getGroupJoin = async () => {
      try {
        const res = await userRequest.get("organization/getOrganizationByUser")
        setGroupJoin(res.data)
        dispatch(getGroupHasJoin(res.data.data))
      } catch (error) {
        console.log(error.response)
      }
    }
    getGroupJoin()
  }, [])
  useEffect(() => {
    const getGroupManage = async () => {
      try {
        const res = await userRequest.get(
          "/organization/getOrganizationByCreator",
        )
        setGroupManage(res.data)
        dispatch(getManage(res.data.data))
      } catch (error) {
        console.log(error.response)
      }
    }
    getGroupManage()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.contentContainer}>
            <View style={styles.listContainer}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.title}>Nhóm bạn quản lý</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateGroup")}
                >
                  <Text style={styles.text1}>Tạo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color="gray" />
                <TextInput style={styles.input} placeholder="Tìm kiếm" />
              </View>
              {manageGroup ? (
                manageGroup.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("GroupViewPage", {
                        groupId: item.id,
                      })
                    }
                  >
                    <View style={styles.itemContainer}>
                      <Image
                        source={
                          item.urlAvatar
                            ? { uri: `${item.urlAvatar}` }
                            : backgroundForNone
                        }
                        style={styles.itemPic}
                      />
                      <View style={styles.itemText}>
                        <Text style={styles.text2}>{item.name}</Text>
                        <Text style={styles.text3}>
                          {item.contactinfo.length > 30
                            ? `${item.contactinfo.slice(0, 32)}...`
                            : item.contactinfo}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.textInfo}>Hãy tạo nhóm của riêng bạn</Text>
              )}
            </View>

            <View style={styles.listContainer}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.title}>Nhóm bạn đã tham gia</Text>
              </View>
              <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color="gray" />
                <TextInput style={styles.input} placeholder="Tìm kiếm" />
              </View>
              {joinGroup ? (
                joinGroup.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("GroupViewPage", { groupId: item.id })
                    }
                  >
                    <View style={styles.itemContainer}>
                      <Image
                        source={
                          item.urlAvatar
                            ? { uri: `${item.urlAvatar}` }
                            : backgroundForNone
                        }
                        style={styles.itemPic}
                      />
                      <View style={styles.itemText}>
                        <Text style={styles.text2}>{item.name}</Text>
                        <Text style={styles.text3}>
                          {item.contactinfo.length > 30
                            ? `${item.contactinfo.slice(0, 32)}...`
                            : item.contactinfo}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.textInfo}>Bạn chưa tham gia nhóm nào</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 0.025 * screenWidth,
    paddingRight: 0.025 * screenWidth,
    flex: 1,
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    borderBottomColor: "#E8E9EB",
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingBottom: 10,
  },
  headerTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text1: {
    color: "#2a73c2",
    fontSize: 22,
    fontWeight: "500",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E8E9EB",
    alignItems: "center",
    marginTop: 10,
    height: 0.04 * screenHeight,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 5,
    textAlignVertical: "top",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    width: " 100%",
    height: 0.07 * screenHeight,
    marginTop: 10,
  },
  itemPic: {
    width: 0.15 * screenWidth,
    height: 0.15 * screenWidth,
    borderRadius: 10,
    objectFit: "cover",
    marginRight: 10,
  },
  itemText: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 16,
  },
  textInfo:{
    marginTop: 10,
    textAlign : "center",
    fontSize : 24,
    fontWeight : "bold",
  },
})

export default GroupHasJoin
