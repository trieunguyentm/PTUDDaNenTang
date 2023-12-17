import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native"
import { userRequest } from "../api/requestMethod"
import PostGroup from "./PostGroup"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const RecomendGroup = () => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await userRequest.get("organization/getPostByUser")
        setPosts(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllPosts()
  }, [])

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    const getAllPosts = async () => {
      try {
        const res = await userRequest.get("organization/getPostByUser")
        setPosts(res.data.data)
        setRefreshing(false)
      } catch (error) {
        console.log(error)
        setRefreshing(false)
      }
    }
    getAllPosts()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {posts?.map((item, index) => (
            <PostGroup key={index} data={item} route={true} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E9EB",
  },
  contentContainer: {
    width: "100%",
    height: "auto",
  },
})

export default RecomendGroup
