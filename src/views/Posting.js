import React, {useState} from "react";
import {Text, View, TouchableOpacity,TextInput, Alert, StyleSheet, Image} from 'react-native'
import { Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { useSelector } from "react-redux"
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


const Posting = ({route}) => {
    console.log(route)
    const user = useSelector((state)=> state.user?.currentUser)
    const [Description, setDescription] = useState("")
    const [file] = useState([])
    const setFile = (item) => {
        file.push(item)
    }

    const chooseImage = async () => {
        const permision = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(!permision.granted) {
            Alert("No permission")
        }
        else {
            const response = await ImagePicker.launchImageLibraryAsync()
            if(!response.canceled) {
                setFile(response.assets[0].uri)
                console.log('Upload successfully')
            } else {
                console.log("Upload canceled")
            }
        }
    }
    
    return (
        <View styles = {styles.container}>
            <View style={styles.displayInfo}>
                
                <Image style={styles.userAvatar} source={{uri:user.urlAvatar}}></Image>
                <View>
                    <Text style={styles.username}>{user.username}</Text>
                </View>
            </View>
            <View style={styles.description}>
                <TextInput placeholder="Enter description"
                value={Description}
                onChangeText={setDescription} >

                </TextInput>
            </View>
            <View style={styles.fileOptions}>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}
                onPress={chooseImage}
                >
                    <Image style={styles.photoImage} source={require('../../assets/photos.png')}></Image>
                    <Text style={{paddingLeft:screenWidth*.02}}>Photo/Videos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        flexDirection:'row',
        alignContent:"center"
        
    },
    displayInfo : {
        flexDirection:'row',
        resizeMode:'contain',
        height:screenHeight*0.1,
        marginTop:screenHeight*0.02,
        paddingLeft:screenWidth*0.025,
        
    },
    username : {
        fontSize:24,
        marginLeft:screenWidth*0.02,
    },
    userAvatar : {
        resizeMode:'center',
        width:screenHeight*0.1,
        height:screenHeight*0.1,
        borderRadius:screenHeight*0.5
    },
    description : {
        paddingTop:screenHeight*0.02,
        alignSelf:'auto',
        height:screenHeight*0.3,
        maxHeight:screenHeight*0.6,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc',
    },
    fileOptions : {
        flexDirection:'row',
        paddingLeft:screenWidth*0.02,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    },
    photoImage : {
        height:screenHeight*0.06,
        width:screenHeight*0.06,
        marginTop:'auto'
        
    },
    Preview : {
        flex:1,
        flexDirection:'row',
        screenHeight:screenHeight*0.3,
        screenWidth:'auto'
    },
    imagePreview : {
        height:screenHeight*0.3,
        width:screenHeight*0.3,
    }
    
})
export default Posting