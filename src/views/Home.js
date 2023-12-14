import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Dimensions } from "react-native"
import Feed from './Feed';
import { publicRequest } from '../api/requestMethod';


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


const Home = ({route,navigation}) => {
  const [helpRQ,setHelpRQ] = useState([])
  const [events,setEvents] =useState([])

  useEffect(()=> {
    const getData = async () => {
      const res = await publicRequest.get('helpRequest/getAllHelpRequest')
      setHelpRQ(res.data.data)
    }
    getData()
  },[])
  const check = (route.name==="News")

  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <Feed Events={check?(helpRQ):(events)}/> 
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

module.exports =Home

