import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Post from './Post';

const Feed = ({Events}) => {
    
    return (
        <ScrollView>
            {Events?.map(env => (
                <Post key={env._id} Event ={env}></Post>

            ))}
        </ScrollView>
    
    )
}



export default Feed