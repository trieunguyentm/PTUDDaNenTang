import React from 'react';
import {View, StyleSheet, TouchableOpacity,Text }from 'react-native'
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
const Topbar = () => {
    const AllEvents = () => {

    }
    const FollowedEvents= () => {

    }


    return (
        <View style={styles.TopbarContainer}>
            <TouchableOpacity>
                <Text style={styles.TopbarNavigator}>News</Text>
            </TouchableOpacity>
            <View style={styles.VerticalSeperator}/>           
            <TouchableOpacity>
                <Text style = {styles.TopbarNavigator}>Events</Text>
            </TouchableOpacity>
            

        </View>
    )
}


const styles = StyleSheet.create({
    TopbarContainer : {
        flexDirection:'row',
        width:screenWidth,
        height: screenHeight*0.05,
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        gap:screenWidth*0.05
    },
    VerticalSeperator : {
        borderLeftWidth:2,
        height:screenHeight*0.05

    },
    TopbarNavigator : {
        
        fontStyle:'italic',
        fontWeight:'bold'
    }
    
})
export default Topbar