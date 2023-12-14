import React from "react"
import { View, StyleSheet, Text,SafeAreaView,StatusBar,Dimensions } from "react-native"


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const RecomendGroup = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}></View>
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
})

export default RecomendGroup
