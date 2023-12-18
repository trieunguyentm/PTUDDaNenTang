import React, { useEffect,useState } from "react";
import {View, Text,StyleSheet, SafeAreaView, Image, Dimensions, ScrollView} from 'react-native'
import { userRequest } from "../api/requestMethod";
import { postFetched, postFetching, fetchFailed } from "../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import Post from "../component/homeComponent/Post";

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
const UserView = () => {
    const user = useSelector((state)=> state.user?.currentUser)
    const [data,setData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            dispatch(postFetching())
            try {
                const res = await userRequest.get('helpRequest/getHelpRequestByUser')
                if(res.data.data) {
                    setData(res.data.data)
                }

            } catch (error) {
                console.log(error)
                dispatch(fetchFailed())
            }
        }
        getData()
    },[])

    return (
        <View style={styles.screenContainer}>
            <SafeAreaView style={{flex:1}}>
               
                <ScrollView>
                   {data? 
                   (data.map(item => (<Post key={item.id} Event ={item} id = {item.id}/>))) 
                   : 
                   (<Text>You have not created any request</Text>)
                   }
                </ScrollView>


            </SafeAreaView>

        </View >
    )

}

const styles = StyleSheet.create({
    screenContainer : {
        flex:1,
    },
    userInfomation : {
        flexDirection:'row',
        padding:10
    },
    userImage : {
        width:screenWidth*0.2,
        height:screenWidth*0.2,
        borderRadius:screenWidth*0.1,
    },
    nameContainer : {
        flexDirection:'column',
        alignSelf:'flex-start',
        marginLeft:screenWidth*0.03
    },
    displayName : {
        fontSize:24
    },
    username :{ 
        fontSize:20,
        fontStyle:'italic'
    }
    
})

export default UserView