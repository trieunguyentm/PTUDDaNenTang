import React from "react"
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Dimensions } from "react-native"
import Feed from "./Feed"
import TopBar from "./TopBar"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <TopBar />
          <Feed />
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
    paddingLeft: 0.05 * screenWidth,
    paddingRight: 0.05 * screenWidth,
    flex: 1,
    overflow: "scroll",
  },
})

export default Home
