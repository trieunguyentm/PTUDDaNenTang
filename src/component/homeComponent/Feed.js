import {useState,useRef, useEffect} from 'react';
import React from 'react'
import {RefreshControl, StyleSheet,View, Image,TouchableOpacity,Text, Modal, ScrollView, SafeAreaView, Pressable } from 'react-native';
import Post from './Post';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { postFetching, fetchFailed,getAllRequest,getAllEvents, postFetched } from '../../redux/posts'
import { publicRequest } from '../../api/requestMethod';
import { FontAwesome } from "@expo/vector-icons"
import { userRequest } from '../../api/requestMethod';



const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width




const Feed = () => {
    const user = useSelector((state)=> state.user?.currentUser)
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation()
    const [request,setRequest] = useState([])
    const [groupManage,setGroupManage] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    
    const dispatch = useDispatch()
    const createPost = () => {
        navigation.navigate('Posting')
    }
    const userPosts = () => {
        navigation.navigate('Your help request')
    }
    const mark = () => {
        setModalVisible(true)
    }
    const addBookmark = (groupID) => {
        console.log(groupID)
    }
    const closeModal = () => {
        setModalVisible(false)
    }

    const scrollRef = useRef()
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    useScrollToTop(scrollRef)

    useEffect(() => {
        const getGroup = async () => {
            try {
              const res = await userRequest.get(
                "/organization/getOrganizationByCreator",
              )
              setGroupManage(res.data.data)
              console.log(res.data.data)
              dispatch(getManage(res.data.data))
            } catch (error) {
              console.log(error.response)
            }
          }
          getGroup()
    },[])

    useEffect(()=> {
        const getData = async () => {
          dispatch(postFetching())
    
          try {
              const res = await publicRequest.get('helpRequest/getAllHelpRequest')
              if(res) {
                setRequest(res.data.data)
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
        
        {/*<Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
            >
                    <View style={modalStyle.modalView}>
                        <Text style={modalStyle.modalTitle}>Nhóm của bạn</Text>
                        {groupManage?.map((item,index) => (
                            <TouchableOpacity 
                            key={index}
                            style={modalStyle.optionsContainer}
                            onPress={() => addBookmark(item.id)}>
                                <Text style={modalStyle.groupname}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <Pressable style={modalStyle.cancel} onPress={closeModal}>
                            <Text>
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
            </Modal>
                        */}
               
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
                <View>
                    <Post key={data.id} Event ={data} id={data.id}/>
                        <View style={styles.Navigator}>
                            <FontAwesome.Button name="bookmark-o" style={styles.iconStyles} size={24} color="black" onPress={mark}>Bookmark</FontAwesome.Button>
                        </View>
                        <View style={styles.Spacer}/>
                </View>
                
            ))}
        </ScrollView>
    </SafeAreaView>
</View>
        
    
    )
}

const styles = StyleSheet.create({
    Feed : {
        flex:1,
        backgroundColor:'#FFFFFF'
      
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
    },
    iconStyles : {
        backgroundColor:"#ffffff",
        resizeMode:'contain',
        backfaceVisibility:'visible'
    },
    Navigator : {
        justifyContent:'space-around',
        alignContent:'space-between',
        alignItems:'center',
        marginTop:3,
        marginBottom:3,
    },
    
})

const modalStyle = StyleSheet.create({
    modalContainer : {
        justifyContent:'center',
        alignItems:'flex-start',
        flex:1
    },
    modalTitle : {
        alignSelf:'center',
        paddingBottom:screenHeight*0.01
    },
    modalView :{ 
        top:screenHeight*.3,
        margin: 20,
        backgroundColor: "#E8E9EB",
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignContent:'center'
    },
    optionsContainer : {
        flexDirection:'row',
        alignItems:'center'
    },
    groupname :{
        marginLeft:screenWidth*0.03,
        fontSize:22,
        alignSelf:'center'
    },
    cancel : {
        paddingTop:screenHeight*0.01,
        alignSelf:'center',
        alignContent:'center',
    }

})

export default Feed