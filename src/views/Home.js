import React from 'react';
import { View, Text, StyleSheet } from "react-native"

const Home = () => {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              {/* Nội dung của screen */}

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

export default Home;
