import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Dimensions } from "react-native"
import Feed from './Feed';
import { publicRequest } from '../api/requestMethod';
import { useDispatch } from 'react-redux';
import { postFetching, fetchFailed,getAllRequest,getAllEvents } from '../redux/posts';
import { useSelector } from 'react-redux';



const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


const Home = ({route,navigation}) => {
  const dispatch = useDispatch()
  const check = (route.name==="News")
  const posts = (check) ? (useSelector((state)=> {state.posts.requests})) : (useSelector((state)=>{state.posts.events}))
  const [data,setData] = useState([])
  useEffect(()=> {
    const getData = async () => {
      dispatch(postFetching())
      try{ 
        const res = await publicRequest.get('helpRequest/getAllHelpRequest')
        setData(res.data.data)
        check?(dispatch(getAllRequest(res.data.data))) : (dispatch(getAllEvents(res.data.data)))
      } catch (error) {
        dispatch(fetchFailed())
      }
    }
    getData()
  },[])
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <Feed Events={(posts)? posts: data}/> 
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

