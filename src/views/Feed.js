import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import CardNav from './CardNav';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height


const Feed = ({Events}) => {
    
    return (
        <ScrollView style={styles.Feed}>
            {Events.map(env => (
                <Post key={env._id} Event ={env}></Post>

            ))}
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    Feed : {
        backgroundColor:'#A8A3A3',
        gap:0.01*screenHeight
    }
})



export default Feed