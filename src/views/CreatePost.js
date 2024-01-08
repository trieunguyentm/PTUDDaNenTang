import React, {useState,useEffect} from "react";
import {View, StyleSheet, StatusBar, SafeAreaView, Text, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback,ScrollView, Keyboard, ActivityIndicator} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSelector,useDispatch } from "react-redux"
import { uploadRequest } from "../api/apiUploadRequest";
import Toast from "react-native-toast-message";
import FormData from "form-data"
import { AntDesign } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function CreatePost({navigation,route}){
    const user = useSelector((state)=> state.user?.currentUser)
    const [description, setDescription] = useState("")
    const [title,setTitle] = useState("")
    const [file,setFile] = useState(null) 
    const dispatch = useDispatch()
    const [loadingSignIn, setLoadingSignIn] = useState(false)
    const [error,setError] = useState(null)

    const chooseImage = async () => {
        setFile(null)
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(!permission.granted) {
            Alert("No permission")
        }
        else {
            const response = await ImagePicker.launchImageLibraryAsync()
            if (!response.canceled) {
                setFile(response.assets[0].uri)
                console.log(file)
                setError(null)
            }
        }
    }
    const handlePressOutside = () => {
        Keyboard.dismiss() // Ẩn bàn phím khi chạm ra ngoài TextInput
      }
      const handleDeleteImg = () => {
        setFile()
      }
    
    const postRequest = async(e) => {
        e.preventDefault()  

        if(!title || !description) {
            Toast.show({
                type:'error',
                text1:'Title and Description are required'
            })
            return 

        }
        if(file) {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description",description)
            const uriParts = file.split(".")
            const fileType = uriParts[uriParts.length - 1]
            const uriName = file.split("/")
            const fileName = uriName[uriName.length - 1]
            setLoadingSignIn(true)
            formData.append("images", {
                uri: file,
                name: `file.${fileName}`,
                type: `image/${fileType}`,
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
                navigation.navigate("Home")
                setLoadingSignIn(false)
            } catch(error) {
                console.log(error)
                setLoadingSignIn(false)
            }
 
        } else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description",description)
            setLoadingSignIn(true)
            try {
                const response = await uploadRequest(dispatch,formData,user.token)
                if(response?.data&& response?.data.code===0) {
                    Toast.show({
                        type:"success",
                        text1:'Upload thành công'
                    })
                }
                 navigation.navigate("Home")
                setLoadingSignIn(false)
            } catch (error) {
                console.log(error)
                setLoadingSignIn(false)
            }
        }
    }
    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: `${user.urlAvatar}` }}
                style={styles.imgContainer}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{user.displayName}</Text>
                <Text style={styles.username}>@{user.username}</Text>
              </View>
              <TouchableOpacity style={styles.addImg} onPress={chooseImage}>
                <Feather name="image" size={32} color="green" />
                <Text style={styles.text3}>Ảnh</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
              <TouchableWithoutFeedback onPress={handlePressOutside}>
                <TextInput
                  accessibilityLabel="input"
                  multiline={true}
                  numberOfLines={2}
                  accessibilityLabelledBy="title"
                  style={styles.inputTitle}
                  placeholder="Mô tả tiêu đề"
                  onChangeText={setTitle}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handlePressOutside}>
                <TextInput
                  accessibilityLabel="input"
                  multiline={true}
                  numberOfLines={3}
                  accessibilityLabelledBy="description"
                  style={styles.input}
                  placeholder="Mô tả yêu cầu hỗ trợ của bạn"
                  onChangeText={setDescription}
                />
              </TouchableWithoutFeedback>
              {file ? (
                <View>
                  <Image style={styles.imgPick} source={{ uri: file }} />
                  <TouchableOpacity
                    style={styles.btnDeleteImg}
                    onPress={handleDeleteImg}
                  >
                    <AntDesign
                      name="closecircleo"
                      size={32}
                      color="white"
                      style={styles.iconDelete}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={postRequest}
              >
                {!loadingSignIn ? (
                  <Text style={styles.text2}>Đăng Bài</Text>
                ) : (
                  <ActivityIndicator size={"large"} color={"black"} />
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    contentContainer: {
      flex: 1,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent:'space-between',
      alignContent:'center',
      marginHorizontal: 0.025 * screenWidth,
      height: 0.1 * screenHeight,
      padding: 10,
      width: "90%",
    },
    imgContainer: {
      width: 0.17 * screenWidth,
      height: 0.17 * screenWidth,
      borderRadius: 0.085 * screenWidth,
    },
    addImg: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    nameContainer: {
      marginLeft:screenWidth*0.02,
      marginRight:'auto',
      alignSelf: "flex-start",
      flexDirection:'column'
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
    },
    username: {
      fontSize:18,
      fontStyle:'italic'
    },
    description: {
      fontSize: 16,
    },
    text3: {
      fontSize: 18,
      marginLeft: 10,
    },
    bodyContainer: {},
    input: {
      fontSize: 18,
      textAlignVertical: "top",
      marginTop: 10,
      marginHorizontal: 0.025 * screenWidth,
      height : "auto",
      // fontWeight: "bold"
    },
    inputTitle: {
        fontSize: 24,
        fontWeight:'bold',
        textAlignVertical: "top",
        marginTop: 10,
        marginHorizontal: 0.025 * screenWidth,
        height : "auto"
    },
    imgPick: {
      width: "100%",
      height: 0.5 * screenHeight,
      marginBottom: 10,
      objectFit : "cover"
    },
    btnContainer: {
      backgroundColor: "teal",
      height: 0.05 * screenHeight,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 0.025 * screenWidth,
      marginBottom : 10,
      marginTop: 30,
    },
    text2: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
    iconDelete: {
      top: 0.07 * screenHeight,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: 50,
    },
    btnDeleteImg: {
      position: "absolute",
      top: -0.085 * screenHeight,
      right: 0,
    },
  })