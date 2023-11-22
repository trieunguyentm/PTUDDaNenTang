import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Dimensions } from "react-native"
import Topbar from '../utils/TopBar';
import Feed from '../utils/Feed';



const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const Home = () => {
  const Events = [{_id:1},{_id:2}]
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <Topbar/>
              <View style={styles.Spacer}/>
              <Feed Events = {Events}/>
            </View>
          </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
  },
  contentContainer: {
    flex: 1,
    overflow: "scroll",
    backgroundColor:'#A8A3A3',
   
  },
  Spacer : {
    backgroundColor:'#A8A3A3',
    width:screenWidth,
    height:screenHeight*0.01
  }
})

export default Home;
