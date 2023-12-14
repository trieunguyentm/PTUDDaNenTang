import React, {useState,useEffect} from "react";
import {Text, View, TouchableOpacity,TextInput, Alert, StyleSheet, Image, SafeAreaView,Button} from 'react-native'
import { Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { useSelector,useDispatch } from "react-redux"
import { uploadRequest } from "../api/apiUploadRequest";
import Toast from "react-native-toast-message";
import FormData from "form-data"
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function CreatePost({navigation,route}){
    const user = useSelector((state)=> state.user?.currentUser)
    const [description, setDescription] = useState("")
    const [title,setTitle] = useState("")
    const [file,setFile] = useState([]) 
    const dispatch = useDispatch()
    const [error,setError] = useState(null)

    const chooseImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(!permission.granted) {
            Alert("No permission")
        }
        else {
            const response = await ImagePicker.launchImageLibraryAsync({allowsMultipleSelection:true})
            if (!response.canceled) {
                setFile(response.assets)
                console.log(file)
                setError(null)
            }
        }
    }
    
    const postRequest = async(e) => {
        e.preventDefault()  
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description",description)
        file.map(item=>{
            const uriParts = item.uri.split(".")
            const fileType = uriParts[uriParts.length - 1]
            formData.append("images",{
                uri:item.uri,
                name:`file.${fileType}`,
                type:`image/${fileType}`
            })
        })
        try {
            const response = await uploadRequest(dispatch,formData,user.token)
            if(response?.data&& response?.data.code===0) {
                Toast.show({
                    type:"success",
                    text1:'Upload thành công'
                })
            }
            setFile(null)
            navigation.navigate('News')
        } catch(error) {
            console.log(error)

        }
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Upload" onPress={postRequest}></Button>
            )
        })
    })


    



    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.contentContainer}>
                <View style={styles.userInfoDisplay}>
                    <Image style={styles.userAvatar} source={{uri:user.urlAvatar}}/>
                    <Text style={styles.displayName}>{user.displayName}</Text>
                </View>
                <View style={styles.Title}>
                    <TextInput
                    placeholder="Enter Title"
                    value={title}
                    onChangeText={setTitle}
                    />

                </View>
                <View style={styles.descriptionContainer}>
                    <TextInput 
                    placeholder="Enter description"
                    value= {description}
                    onChangeText={setDescription}
                    />
                </View>

                <View style={styles.previewContainer}>
                    {file?(file.map(item => (
                        <Image style={styles.previewImage} 
                        source={{uri:item.uri}}
                        key={item.uri}/>

                    ))) : (console.log("No Image"))}
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

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer : {
        flex:1,
        flexDirection:'column',
        gap:1
        
    },
    userInfoDisplay : {
        height:screenHeight*0.1,
        flexDirection:'row',
        paddingLeft:screenWidth*0.025,
        backgroundColor:'#A8A3A3',
    },
    userAvatar : {
        resizeMode:'center',
        width:screenHeight*0.08,
        height:screenHeight*0.08,
        borderRadius:screenHeight*0.04,
        alignSelf:'center'
    },
    displayName : {
        fontSize:20,
        paddingLeft:screenWidth*0.02,
    },
    descriptionContainer : {
        paddingTop:screenHeight*0.01,
        height:screenHeight*0.3,
        maxHeight:screenHeight*0.6,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc',
        backgroundColor:'#FFF111',
        
    },
    fileOptions : {
        flexDirection:'row',
        paddingLeft:screenWidth*0.02,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc',
        borderTopColor:'#cccccc',
        borderTopWidth:1,
        marginTop:'auto'
    },
    photoImage : {
        height:screenHeight*0.06,
        width:screenHeight*0.06,
        marginTop:'auto'
    },
    previewContainer : {
        flex:1,
        flexDirection:'row',
        height:'auto',
        backgroundColor:'#000000'
    },
    previewImage : {
        resizeMode:'cover',
        height:'auto',
        width:screenWidth*0.5  
    },
    Title : {
        height:screenHeight*0.06
    }
    
    
})
