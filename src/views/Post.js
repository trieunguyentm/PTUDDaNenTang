import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground, Image,StyleSheet, Button} from 'react-native';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons"
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width



const Post = ({Event}) => {
    const route = useRoute()
    const check =(route.name === 'News')
    const manageButton = () => {
        console.log(route)
    }
    const message = () => {

    }
    const mark = () => {

    }
    return (
        <View style={styles.container}>
            <View style={styles.topNavigation}>
             
             <TouchableOpacity style={styles.displayInfo}>
                <Image style={styles.userAvatar} source={{uri:'https://p7.hiclipart.com/preview/344/344/59/google-logo-g-suite-google.jpg'}} ></Image>
                
                <View style={flexDirection='column'}>
                    <Text style={styles.userName}>{Event.createdBy}</Text>
                    <Text style={styles.time}>{Event.createdAt}</Text>
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
                    <Text style={styles.description}>{Event.description}</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.PostImgContainer}>
                {Event?.images?.map((img,index) => (      
                       <TouchableOpacity style={{flex:1}} key={index}>
                           <Image style={styles.PostImage} source={{uri:img}} key={index}></Image>
                       </TouchableOpacity>         
                ))}
            </View>
            
            <View style={styles.Navigator}>
                <FontAwesome.Button name="bookmark-o" style={styles.iconStyles} size={24} color="black" onPress={mark}>Bookmark</FontAwesome.Button>
                <FontAwesome.Button name="comments-o" style ={styles.iconStyles} size={24}  color="black" onPress={message}>Message</FontAwesome.Button>
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
    PostImgContainer : {
        flex:1,
        flexDirection:'row',
        height:'auto',
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderTopColor:'#cccccc',
        borderBottomColor:'#cccccc',
        marginTop:5,
        marginBottom:3
    },

    PostImage : {
        height:300,
        width:screenWidth*0.5,
        resizeMode:'cover'
    },

    Navigator : {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'space-between',
        alignItems:'center',
        marginTop:3,
        marginBottom:3
    },
    Spacer : { 
        width:screenWidth,
        backgroundColor:'#A8A3A3',
        height:screenHeight*0.003
    },
    description: {
        flex:1,
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
    iconStyles : {
        backgroundColor:"#ffffff",
        resizeMode:'contain',
        backfaceVisibility:'visible'
    }
    
    
    


}
)
export default Post