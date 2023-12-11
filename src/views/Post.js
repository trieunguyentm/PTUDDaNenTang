import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground, Image,StyleSheet, Button} from 'react-native';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {  useRoute } from '@react-navigation/native';
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width



const Post = () => {
    const route = useRoute()
    const manageButton = () => {
        console.log(route)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.topNavigation}>
             
             <TouchableOpacity style={styles.displayInfo}>
                <Image style={styles.userAvatar} source={{uri:'https://p7.hiclipart.com/preview/344/344/59/google-logo-g-suite-google.jpg'}} ></Image>
                
                <View style={flexDirection='column'}>
                    <Text style={styles.userName}>Username</Text>
                    <Text style={styles.time}>Time</Text>
                </View>
             
             </TouchableOpacity>
             
             <TouchableOpacity style={styles.manageButton} 
               onPress={manageButton}
             >
                <AntDesign name="ellipsis1" size={30} color="black" />
             </TouchableOpacity>
            
            
            </View>

            <TouchableOpacity>
                <View>
                    <Text style={styles.description}>This is description</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <Image style={styles.PostImage} source={{uri:'https://secureservercdn.net/198.71.233.33/k4y.f04.myftpupload.com/wp-content/uploads/2017/03/shutterstock_199419065.jpeg?time=1649858503'}}></Image>
            </TouchableOpacity>
            
            
            <View style={styles.Navigator}>

            </View>

            
            <View style={styles.Spacer}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        width:screenWidth,
        backgroundColor:'#FFFFFF',
        paddingBottom:5,
        paddingTop:5,
        justifyContent:'center'
        
    
    }, 
    displayInfo : {
        flexDirection:'row',
        resizeMode:'contain',
        height:screenHeight*0.05,
        maxWidth:screenWidth*0.6,
        paddingLeft:screenWidth*0.025,
        
    },
    userAvatar : {
        resizeMode:'center',
        width:screenHeight*0.05,
        height:screenHeight*0.05,
        borderRadius:screenHeight*0.025
    },
    userName : {
        paddingLeft:5,
        fontSize:17,
    },
    time : {
       paddingLeft:5,
       fontSize:12
    },

    PostImage : {
        width:screenWidth,
        height:300,
        marginTop:10
    },

    Navigator : {
        width:screenWidth,
        height:screenHeight*0.05,
        flexDirection:'column'
    },
    Spacer : { 
        width:screenWidth,
        backgroundColor:'#A8A3A3',
        height:screenHeight*0.007
    },
    description: {
        paddingTop:screenHeight*0.01,
        paddingLeft:screenWidth*0.025,
        paddingRight:screenWidth*0.025,
        fontSize:20
    },
    topNavigation : {
        flexDirection:'row',
        width:screenWidth

    },
    manageButton : {
        marginLeft:'auto',
        paddingRight:screenWidth*0.02

    },
    
    
    


}
)
export default Post