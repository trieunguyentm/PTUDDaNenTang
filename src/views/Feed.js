import React from 'react';
import { StyleSheet, ScrollView,View, Image,TouchableOpacity,Text } from 'react-native';
import Post from './Post';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


const Feed = ({Events}) => {
    const navigation = useNavigation()
    const route = useRoute();
    const createPost = () => {
        navigation.navigate('Posting',route.name)
    }
    

    return (
        <ScrollView style={styles.Feed}>
            <View style={styles.Spacer}/>
            <View style={styles.PostCreator}>
                <TouchableOpacity onPress={createPost}>
                    <View>
                        <Image style={styles.userAvatar} source={{uri:'https://p7.hiclipart.com/preview/344/344/59/google-logo-g-suite-google.jpg'}}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={createPost}>
                    <View style={styles.TextContainer}>
                       <Text>
                        Tìm kiếm sự trợ giúp
                       </Text>
                    </View>           
                </TouchableOpacity>

                <TouchableOpacity style={styles.addPostIcon} onPress={createPost}>
                    <MaterialIcons name="post-add" size={30} color="black" />
                </TouchableOpacity>
                
            </View>
            
            <View style={styles.Spacer}/>
            {Events.map(env => (
                <Post key={env._id} Event ={env}></Post>

            ))}
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    Feed : {
        backgroundColor:'#A8A3A3',
    },
    PostCreator: {
        height:screenHeight*0.05,
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        paddingLeft:screenWidth*0.03,
        borderColor:'#000000',
        alignItems:'center'
    },
    userAvatar : {
        resizeMode:'center',
        width:screenHeight*0.05,
        height:screenHeight*0.05,
        borderRadius:screenHeight*0.025,
        borderColor:'#000000',
        borderWidth:1,
        
    },
    TextContainer: {
        width:screenWidth*0.7,
        height:screenHeight*0.04,
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
        height:screenHeight*0.005
    },
    
})



export default Feed