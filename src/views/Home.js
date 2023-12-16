import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Dimensions } from "react-native"
import Feed from './Feed';
import { publicRequest } from '../api/requestMethod';
import { useDispatch } from 'react-redux';
import { postFetching, fetchFailed,getAllRequest,getAllEvents, postFetched } from '../redux/posts';
import { useSelector } from 'react-redux';



const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


const Home = ({route,navigation}) => {
  const dispatch = useDispatch()
  const check = (route.name==="News")
  const posts = (check) ? (useSelector((state)=> {state.posts.requests})) : (useSelector((state)=>{state.posts.events}))
  const [request,setRequest] = useState([])
  const [events,setEvents] = useState([])
  
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


      /*try{ 
        const res = await publicRequest.get('helpRequest/getAllHelpRequest')
        setRequest(res.data.data)
        check?(dispatch(getAllRequest(res.data.data))) : (dispatch(getAllEvents(res.data.data)))
      } catch (error) {
        dispatch(fetchFailed())
      } */
    }
    getData()
  },[])
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <Feed Events={(check)? ((posts)?posts:request):((posts)?posts:events)}/> 
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

