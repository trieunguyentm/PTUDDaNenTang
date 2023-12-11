import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Dimensions } from "react-native"
import Feed from './Feed';
import { useRoute } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const Home = () => {
  console.log(useRoute())
  const Events = [{_id:1},{_id:2}, {_id:3}]
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
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
    height:screenHeight*0.007
  }
})

export default Home;