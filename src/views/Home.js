import React, { useState, useEffect,useRef } from 'react';
import { RefreshControl, View, StyleSheet, StatusBar, SafeAreaView, Alert, ScrollView } from "react-native"
import { Dimensions } from "react-native"
import Feed from './Feed';
import { publicRequest } from '../api/requestMethod';
import { useDispatch } from 'react-redux';
import { postFetching, fetchFailed,getAllRequest,getAllEvents, postFetched } from '../redux/posts';
import { useScrollToTop } from '@react-navigation/native'




const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


const Home = ({route,navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch()
  const check = (route.name==="News")
  const [request,setRequest] = useState([])
  const [events,setEvents] = useState([]) 
  const scrollRef = useRef()
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useScrollToTop(scrollRef)
  useEffect(()=> {
    const getData = async () => {
      dispatch(postFetching())

      try {
        if(check) {
          const res = await publicRequest.get('helpRequest/getAllHelpRequest')
          setRequest(res.data.data)
          dispatch(getAllRequest(res.data.data))
        } else {
          //const res = await publicRequest.get('helpRequest/getAllEvents')
          //setEvents(res.data.data)
          //dispatch(getAllEvents(res.data.data))
        }
        dispatch(postFetched())
      } catch (error) {
        console.log(error)
        dispatch(fetchFailed())
      }
    }
    getData()
  },[refreshing])
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            
            <View style={styles.contentContainer}>
              <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ref={scrollRef}
                >
                <Feed Events={(check)? request:events}/> 
              </ScrollView>
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
  Spacer : {
    backgroundColor:'#A8A3A3',
    width:screenWidth,
    height:screenHeight*0.007
  },
  goesToTopButton : {
  }
})

module.exports =Home

