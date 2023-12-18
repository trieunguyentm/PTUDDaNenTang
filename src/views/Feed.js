import React from 'react';
import {StyleSheet,View, Image,TouchableOpacity,Text, Modal, TextInput, Pressable } from 'react-native';
import Post from './Post';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width




const Feed = ({Events}) => {
    const user = useSelector((state)=> state.user?.currentUser)
    const navigation = useNavigation()
    const route = useRoute();
    const check = (route.name==="News")
    const [modalVisible, setModalVisible] = useState(false)
    const createPost = () => {
        navigation.navigate('Posting',route.name)
    }
    const userPosts = () => {
        navigation.navigate('Your help request')
    }

    const open = () => {
        setModalVisible(true)
    }
    const close = () => {
        setModalVisible(false)
    }

   
            
      
 
    return (
        <View style={styles.Feed}>
            <Modal
            animationType='slide'
            visible={modalVisible}
            onTouchCancel={close}
            >
                <View style={search.container}>
                    <View style={search.searchBar}>
                        <TextInput
                        placeholder='Find request'/>

                    </View>
                    <TouchableOpacity onPress={close}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </Modal>     
            <TouchableOpacity onPress={open}>
                    <View style={styles.searchBar}>
                       <Text style={{flex:1,fontSize:14}}>
                        Tìm kiếm request...
                       </Text>
                    </View>           
            </TouchableOpacity>

            <View style={styles.Spacer}/>
            
            {check? 
            (
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
            ) 
            : 
            (null)
            }
            {Events?.map(data => (
                <Post key={data.id} Event ={data}/>
            ))}
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
    }
    
})

const search = StyleSheet.create( {
    container : {
        flex:1,
        alignItems:'center',
    },
    searchBar : {
        width:screenWidth,
        height:screenHeight*0.05,
        borderRadius:screenWidth*0.45,
        borderWidth:1,
        borderColor:'#000000',
        alignItems:'center',
        margin:10
        
    },
    cancleButton : {
        backgroundColor:'#E94724 '
    }
})



export default Feed