import {useState,useRef, useEffect} from 'react';
import React from 'react'
import {RefreshControl, StyleSheet,View, Image,TouchableOpacity,Text, Modal, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import Post from './Post';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { postFetching, fetchFailed,getAllRequest,getAllEvents, postFetched } from '../../redux/posts'
import { publicRequest } from '../../api/requestMethod';


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width




const Feed = () => {
    const user = useSelector((state)=> state.user?.currentUser)
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation()
    const [request,setRequest] = useState([])
    const dispatch = useDispatch()
    const createPost = () => {
        navigation.navigate('Posting')
    }
    const userPosts = () => {
        navigation.navigate('Your help request')
    }

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
              const res = await publicRequest.get('helpRequest/getAllHelpRequest')
              if(res) {
                setRequest(res.data.data)
                dispatch(getAllRequest(res.data.data))
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
<View style={styles.Feed}>
    <SafeAreaView style={styles.Feed}>
               
        <ScrollView
         style={styles.Feed}
         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         ref={scrollRef}
         >
                
              
            <View style={styles.Spacer}/>
            
           
            <View style={styles.PostCreator}>  
                <TouchableOpacity onPress={userPosts}>
                    <View>
                        <Image style={styles.userAvatar} source={{uri:`${user.urlAvatar}`}}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={createPost}>
                    <View style={styles.TextContainer}>
                       <Text>
                        Tìm kiếm sự trợ giúp
                       </Text>
                    </View>           
                </TouchableOpacity>
                <MaterialIcons style={styles.addPostIcon} name="post-add" size={50} color="black" />
            </View>
            <View style={styles.Spacer}/>
            {request?.map(data => (
                <Post key={data.id} Event ={data} id={data.id}/>
            ))}
        </ScrollView>
    </SafeAreaView>
</View>
        
    
    )
}

const styles = StyleSheet.create({
    Feed : {
        flex:1,
      
    },
    PostCreator: {
        height:screenHeight*0.08,
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        paddingLeft:screenWidth*0.03,
        borderColor:'#000000',
        alignItems:'center'
    },
    userAvatar : {
        resizeMode:'center',
        width:screenHeight*0.07,
        height:screenHeight*0.07,
        borderRadius:screenHeight*0.035,
        borderColor:'#000000',
        borderWidth:1,
        
    },
    TextContainer: {
        width:screenWidth*0.6,
        height:screenHeight*0.05,
        borderCurve:'circular',
        borderRadius:screenWidth*0.45,
        borderWidth:1,
        borderColor:'#000000', 
        marginLeft:screenWidth*0.05,
        justifyContent:'center',
        alignItems:'center'
        
    },
    addPostIcon : {
        marginLeft:'auto',
        marginRight:screenWidth*0.02,
        alignSelf:'center'
    },

    Spacer : { 
        width:screenWidth,
        backgroundColor:'#A8A3A3',
        height:screenHeight*0.003
    },
    searchBar : {
        width:screenWidth,
        padding:10,
        height:screenHeight*0.05,
        borderRadius:screenWidth*0.45,
        borderWidth:1,
        borderColor:'#000000', 
        justifyContent:'center',
    }
    
})

export default Feed