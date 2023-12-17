import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native"
import backgroundForNone from "../../assets/groups-default-cover-photo-2x.png"
import BtnJoinGroup from "./BtnJoinGroup"
import { publicRequest, userRequest } from "../api/requestMethod"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { getAllGroups, getRequestJoinGroupByUser } from "../redux/group"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const Item = ({ data, request ,req}) => {
  const navigation = useNavigation()
  const user = useSelector((state) => state.user?.currentUser)
  const dataSend = {
    username: user.username,
    organizationId: data.id,
    request : request,
    requestId : req?.id,
  }
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("GroupViewPage", {
          groupId: data.id,
        })
      }
    >
      <Image
        source={
          data?.urlAvatar ? { uri: `${data?.urlAvatar}` } : backgroundForNone
        }
        style={styles.itemImg}
      />
      <Text style={styles.text1}>{data?.name}</Text>
      <Text style={styles.text2}>
        {data?.contactinfo.length > 30
          ? `${data?.contactinfo.slice(0, 24)}...`
          : data?.contactinfo}
      </Text>
      <BtnJoinGroup dataSend={dataSend} />
    </TouchableOpacity>
  )
}

const ListGroup = () => {
  const [data, setData] = useState()
  let group = useSelector((state) => state?.group?.groupAll)

  const [request, setResquest] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    const getAllGroup = async () => {
      try {
        const res = await publicRequest("organization/getAllOrganization")
        setData(res.data.data)
        dispatch(getAllGroups(res.data.data))
      } catch (error) {
        console.log(error)
      }
    }
    getAllGroup()
  }, [])

  useEffect(() => {
    const getAllReq = async () => {
      try {
        const requests = await userRequest.get(
          "organization/getRequestJoinOrganizationByUser",
        )
        setResquest(requests.data.data)
        dispatch(getRequestJoinGroupByUser(requests.data.data))
      } catch (error) {
        console.log("error", error)
      }
    }
    getAllReq()
  }, [])

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    const getAllReq = async () => {
      try {
        const requests = await userRequest.get(
          "organization/getRequestJoinOrganizationByUser",
        )
        setResquest(requests.data.data)
        dispatch(getRequestJoinGroupByUser(requests.data.data))
        setRefreshing(false)
      } catch (error) {
        console.log("error", error)
        setRefreshing(false)
      }
    }
    getAllReq()
  }, [])

  const requestByUser = useSelector(
    (state) => state?.group?.requestJoinGroupByUser
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <FlatList
            data={group}
            renderItem={({ item }) => (
              <Item
                data={item}
                request={
                  requestByUser?.find((req) => req.organizationId === item.id)
                    ? true
                    : false
                }
                req={requestByUser?.find(
                  (req) => req.organizationId === item.id,
                )}
              />
            )}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContentContainer}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
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
    paddingLeft: 0.025 * screenWidth,
    paddingRight: 0.025 * screenWidth,
    flex: 1,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  flatListContentContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  itemContainer: {
    marginTop: 10,
    width: 0.43 * screenWidth,
    height: 0.365 * screenHeight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E9EB",
    marginLeft: "2%",
  },
  itemImg: {
    width: 0.425 * screenWidth,
    objectFit: "cover",
    height: 0.18 * screenHeight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text1: {
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    marginLeft: 0.025 * screenWidth,
    marginRight: 0.025 * screenWidth,
    fontSize: 16,
  },
})

export default ListGroup
