import React from 'react';
import {  View, StyleSheet, StatusBar, SafeAreaView, Text } from "react-native"
import { Dimensions } from "react-native"
import HomeTopTab from '../component/homeComponent/HomeTopTab';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const Home = () => { 
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.titleHeader}>Tên app</Text>
              </View>
              <View style={{flex:1}}>
                <HomeTopTab/>
              </View>
              
            </View>
          </SafeAreaView>
          
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
    maxHeight:screenHeight,
    maxWidth:screenWidth
  },
  contentContainer: {
    flex: 1,
    overflow: "scroll",
   
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

})

export default Home

