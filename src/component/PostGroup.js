import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import { userRequest } from "../api/requestMethod"
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const PostGroup = (data) => {

  const [item, setItem] = useState()

  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get(`user/${data.data.creator}`)
        setUser(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  const group = useSelector((state) =>
    state.group.groupAll.find((item) => item.id === data.data.organizationId),
  )


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: user?.urlAvatar }} style={styles.imgUser} />
            <View>
              {data.route ? (
                <>
                  <Text style={styles.nameUser}>
                    {group?.name}
                  </Text>
                  <Text style={styles.text1}>
                    {user?.displayName ? user?.displayName : user?.username}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.nameUser}>
                    {user?.displayName ? user?.displayName : user?.username}
                  </Text>
                  <Text style={styles.text1}>Thành viên</Text>
                </>
              )}
            </View>
          </View>
          <Text style={styles.text2}>{data?.data?.description}</Text>
          {data.data.imageUrls
            ? data.data.imageUrls.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: item }}
                    style={styles.imgContainer}
                  />
                )
              })
            : null}
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 6,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 0.025 * screenWidth,
    paddingVertical: 5,
  },
  imgUser: {
    width: 0.15 * screenWidth,
    height: 0.15 * screenWidth,
    borderRadius: 50,
  },
  headerTitleContainer:{
    display : "flex",
    flexDirection : "row"
  },
  nameUser: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5,
  },
  text1: {
    fontSize: 16,
    marginLeft: 5,
    color: "gray",
  },
  text2: {
    fontSize: 16,
    marginHorizontal: 0.026 * screenWidth,
  },
  imgContainer: {
    width: "100%",
    height: 0.5 * screenHeight,
    marginBottom: 10,
    objectFit: "cover",
  },
})

export default PostGroup
